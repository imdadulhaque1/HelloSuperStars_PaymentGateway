import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import MarketPlaceShipingComp from '../MarketPlaceShipingComp/MarketPlaceShipingComp';
import styles from './MarketPlaceBuyNowStyle';

const MarketPlaceBuyNow = ({route}) => {
  const {width} = useWindowDimensions();
  const {product} = route.params;
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState(0);
  const [step, setStep] = useState(1);
  const [marketplaceOrder, setMarketplaceOrder] = useState({});
  const [modal, setModal] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const {axiosConfig} = useContext(AuthContext);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});

  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  const contentSource = {
    html: `<div style='color:#e6e6e6;'>${
      product?.description ? product?.description : ''
    }</div>`,
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalPrice(count - 1);
    }
  };
  const increment = () => {
    setCount(count + 1);
    setTotalPrice(count + 1);
  };
  const setTotalPrice = async count_amount => {
    if (count_amount !== 0) {
      setAmount(
        count_amount * Number(product?.unit_price) +
          count_amount * Number(product?.tax) +
          Number(product?.delivery_charge),
      );
    } else {
      setAmount(0);
    }
  };
  const checkPaymentUncompletedOrder = async () => {
    setBuffer(true);
    axios
      .get(AppUrl.CheckPaymentUncompletedOrder + product.id, axiosConfig)
      .then(res => {
        // console.log('res---------', res);
        if (res.data.status === 200) {
          if (res.data.isHavePaymentUncompletedOrder == true) {
            setMarketplaceOrder(res.data.marketplaceOrder);
            setStep(2);

            // if (res.data?.marketplaceOrder?.phone == null) {
            //      setStep(2);
            // } else {
            //      setStep(3);
            // }
          } else if (res.data.isHavePaymentUncompletedOrder == false) {
            setStep(1);
          }
          setBuffer(false);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };
  const handleBuyNow = async () => {
    if (count !== 0) {
      inputData = {
        items: count,
        marketplace_id: product?.id,
        total_price: amount,
      };
      setBuffer(true);
      axios
        .post(AppUrl.MarketplaceOrderStore, inputData, axiosConfig)
        .then(res => {
          // console.log('res---------', res);
          if (res.data.status === 200) {
            if (res.data.message == 'Order Stored Successfully') {
              setModalObj({
                modalType: 'success',
                buttonTitle: 'Ok',
                message: 'Please provide your shipping address.',
                available: '',
              });
              setModal(true);
              setStep(2);
            } else if (res.data.message == 'Not Enough Product') {
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'Ok',
                message: "Sorry ! Does'nt have enough product ",
                available: '',
              });
              setModal(true);
            }
            setBuffer(false);
          }
        })
        .catch(err => {
          setBuffer(false);
          console.log(err);
        });
    } else {
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'Ok',
        message: 'Please add quantity',
        available: '',
      });
      setModal(true);
    }
  };
  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);
  };
  const randerFlatListItem = ({index}) => {
    return (
      <Image
        style={{height: 200, width: width - 20}}
        source={
          product?.image == null
            ? imagePath.Foot
            : {
                uri: `${AppUrl.MediaBaseUrl + product?.image}`,
              }
        }
        key={index}
      />
    );
  };
  useEffect(() => {
    setTotalPrice(1);
    checkPaymentUncompletedOrder();
  }, []);

  // console.log('product-----------', product);
  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />
      <HeaderComp />
      <ScrollView style={styles.container}>
        <SafeAreaView>
          {buffer ? <LoaderComp /> : <></>}
          <View style={styles.row1}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                '#FFAD00',
                '#FFD273',
                '#E19A04',
                '#FACF75',
                '#E7A725',
                '#FFAD00',
              ]}
              style={{borderRadius: 15, marginTop: 15}}>
              <Text style={styles.AuctionT}>MarketPlace</Text>
            </LinearGradient>
          </View>

          <View style={styles.MaiN}>
            <SwiperFlatList
              autoplay
              autoplayDelay={5}
              autoplayLoop
              data={[1, 2, 3, 4]}
              renderItem={randerFlatListItem}
            />
            <Text style={styles.FootH}>{product?.title}</Text>
            {/* if product type === auction the it show  */}
            {/* <Text style={styles.FootSt}>Auction at 21-11-2022</Text> */}
            <View style={{width: '100%'}}>
              <RenderHtml contentWidth={width} source={contentSource} />
            </View>
          </View>
          {step === 1 ? (
            <>
              <View style={styles.MaiN}>
                <View style={styles.BtnBox}>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.PriceTag}
                        style={styles.PriceTagImg}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={styles.PriceDollarText}> Price</Text>
                      <Text style={styles.PriceDollarTextB}>
                        {' '}
                        Tk {Number(product?.unit_price)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.Delivery}
                        style={styles.PriceTagImgDeli}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={styles.PriceDollarText}>
                        {' '}
                        Delivery Charge
                      </Text>
                      <Text style={styles.PriceDollarTextB}>
                        {' '}
                        Tk {Number(product?.delivery_charge)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.BtnBox}>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.PriceTag}
                        style={styles.PriceTagImg}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={styles.PriceDollarText}> Tax</Text>
                      <Text style={styles.PriceDollarTextB}>
                        {' '}
                        Tk {Number(product?.tax)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.MaiN}>
                <View style={styles.Increment}>
                  <View style={{flex: 2}}>
                    <Image source={imagePath.BoxA} />
                  </View>
                  <View style={{flex: 4}}>
                    <Text style={styles.TextEr}>Your quantity</Text>
                  </View>
                  <View style={styles.Increment1}>
                    <View style={styles.Flex1}>
                      <TouchableOpacity onPress={decrement}>
                        <View style={styles.Minus}>
                          <Text style={styles.MinusText}>-</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.Flex1}>
                      <Text style={styles.TextColorS}> {count} </Text>
                    </View>

                    <View style={styles.Flex1}>
                      <TouchableOpacity onPress={increment}>
                        <View style={styles.Plus}>
                          <Text style={styles.PulsText}>+</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.Increment}>
                  <View style={{flex: 2}}>
                    <Image source={imagePath.PriceTag} />
                  </View>
                  <View style={{flex: 4}}>
                    <Text style={styles.TextEr}>Total Price</Text>
                  </View>
                  <View style={styles.Increment2}>
                    <View style={styles.Flex1}>
                      <Text style={styles.TextColorS}> Tk {amount} </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleBuyNow}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.Buy}>
                  <Text style={styles.BuyText}>Buy Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <MarketPlaceShipingComp
                marketplaceOrder={marketplaceOrder}
                passChildData={setIsShowPaymentComp}
                setParentData={setParentData}
                setParentStep={setStep}
              />
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default MarketPlaceBuyNow;
