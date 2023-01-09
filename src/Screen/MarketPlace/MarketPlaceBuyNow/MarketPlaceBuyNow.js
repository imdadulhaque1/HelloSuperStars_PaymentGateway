import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
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
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import MarketPlaceShipingComp from '../MarketPlaceShipingComp/MarketPlaceShipingComp';
import styles from './MarketPlaceBuyNowStyle';

const MarketPlaceBuyNow = ({ route }) => {
  const { axiosConfig, currencyMulti, currencyCount, currency } =
    useContext(AuthContext);

  const { width } = useWindowDimensions();
  const { product } = route.params;

  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [step, setStep] = useState(1);
  const [marketplaceOrder, setMarketplaceOrder] = useState({});
  const [modal, setModal] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});

  const navigation = useNavigation();

  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  const contentSource = {
    html: `<div style='color:#e6e6e6;'>${product?.description ? product?.description : ''
      }</div>`,
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalPrice(count - 1);
      setFeeValue(count - 1);
    }
  };
  const increment = () => {
    setCount(count + 1);
    setTotalPrice(count + 1);
    setFeeValue(count + 1);
  };

  const handelDollarTaxPrice = taxdoller => {
    return (Number(product?.unit_price * count) * Number(taxdoller)) / 100;
  };

  useEffect(() => {
    setFee(
      Number(product?.unit_price) +
      Number(handelDollarTaxPrice(product?.tax)) +
      Number(product?.delivery_charge),
    );
  }, []);
  const setFeeValue = async count_amount => {
    if (count_amount !== 0) {
      setFee(
        Number(count_amount * product?.unit_price) +
        Number(count_amount * product?.tax) +
        Number(product?.delivery_charge),
      );
    } else {
      setFee(0);
    }
  };
  const setTotalPrice = async count_amount => {
    if (count_amount !== 0) {
      setAmount(
        Number(count_amount * currencyCount(product?.unit_price)) +
        Number(
          count_amount * currencyCount(handelDollarTaxPrice(product?.tax)),
        ) +
        Number(currencyCount(product?.delivery_charge)),
      );
    } else {
      setAmount(0);
    }
  };
  const checkPaymentUncompletedOrder = async () => {
    // return alert('dadad')
    setBuffer(true);
    axios
      .get(AppUrl.CheckPaymentUncompletedOrder + product.id, axiosConfig)
      .then(res => {
        // console.log('res---------', res);
        if (res.data.status === 200) {
          if (res.data.isHavePaymentUncompletedOrder == true) {
            setMarketplaceOrder(res.data.marketplaceOrder);
            //console.log(res.data.marketplaceOrder);
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
      const inputData = {
        items: count,
        marketplace_id: product?.id,
        total_price: fee,
      };
      setBuffer(true);
      axios
        .post(AppUrl.MarketplaceOrderStore, inputData, axiosConfig)
        .then(res => {
          console.log('res---------', res);
          if (res.data.status === 200) {
            if (res.data.message == 'Order Stored Successfully') {
              setMarketplaceOrder(res.data.marketplaceOrder);
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
          console.log('buy product problem', err.message);
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
  const randerFlatListItem = ({ index }) => {
    return (
      <Image
        style={{ height: 200, width: width - 20 }}
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
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <SafeAreaView>
          {buffer ? <LoaderComp /> : <></>}
          <View style={styles.row1}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                '#FFAD00',
                '#FFD273',
                '#E19A04',
                '#FACF75',
                '#E7A725',
                '#FFAD00',
              ]}
              style={{ borderRadius: 15, marginTop: 15 }}>
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
            <View style={{ width: '100%' }}>
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
                        {currencyCount(product?.unit_price) +
                          ' ' +
                          currency.symbol}
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
                        {currencyCount(product?.delivery_charge) +
                          ' ' +
                          currency.symbol}
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
                        {currencyCount(handelDollarTaxPrice(product?.tax)) +
                          ' ' +
                          currency.symbol}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.MaiN}>
                <View style={styles.Increment}>
                  <View style={{ flex: 2 }}></View>
                  <View style={{ flex: 7 }}>
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
                  <View style={{ flex: 2 }}>
                    <Image source={imagePath.PriceTag} />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text style={styles.TextEr}>Total Price</Text>
                  </View>
                  <View style={styles.Increment2}>
                    <View style={styles.Flex1}>
                      <Text style={styles.TextColorS}>
                        {' '}
                        {amount + ' ' + currency.symbol}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleBuyNow}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
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
                marketplaceOrder={
                  marketplaceOrder === null ? product : marketplaceOrder
                }
                passChildData={setIsShowPaymentComp}
                setParentData={setParentData}
                setParentStep={setStep}
                amount={amount}
                slug={product.slug}
                tax={product?.tax}
                fee={fee}
              />
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default MarketPlaceBuyNow;
