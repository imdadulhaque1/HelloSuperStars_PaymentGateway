import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AlertModal from '../../../Components/MODAL/AlertModal';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp/LoaderComp';
import AuctionTab from './AuctionTab';
import BuyNowShowcase from './BuyNowShowcase';
import MarketPlaceShowcase from './MarketPlaceShowcase';
import Participate from './Participate';
import showcaseNavigator from './showcaseNavigator';
import Souvenir from './Souvenir';
import styles from './styles';

const ShowCase = data => {
  const [view, setView] = useState(showcaseNavigator.HOME);
  const [product, setProduct] = useState([]);
  const [star, setStar] = useState(data.data);
  const [modalStartFrom, setModalStartFrom] = useState('Default');
  const [buffer, setBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const {axiosConfig} = useContext(AuthContext);
  const [marketPlaceToggle, setMarketPlaceToggle] = useState([]);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  const handleMarketPlace = () => {
    setBuffer(true);
    axios
      .get(AppUrl.MarketplaceAllPost + `/${star?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setView(showcaseNavigator.MARKETPLACE);
          setMarketPlaceToggle([res.data.starMarketplace]);
          console.log(' hitted bro');
        } else {
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'Ok',
            message: 'Opps... Marketplace not possible now !',
          });
          setModal(true);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const handleSouvenir = () => {
    setBuffer(true);
    axios
      .get(AppUrl.GetStarSouvenir + `${star?.id}`, axiosConfig)
      .then(res => {
        //console.log('res.data--------------', res.data);

        if (res.data.status === 200) {
          setView(showcaseNavigator.SOUVENIR);
        } else {
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'Ok',
            message: 'Opps... Souvenir not possible now !',
          });
          setModal(true);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);

    if (modalStartFrom === 'Default') {
    }
    //  else if (modalStartFrom === 'N') {
    //     if (Number(auctionApply?.notify_status) === 1) {
    //         setProcessModal(true)
    //     } else {
    //         navigation.navigate('Home');
    //     }
    // }
  };
  useEffect(() => {
    // console.log('star-----ShowCase----', star);
  }, [data]);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 10,
        paddingBottom: 5,
      }}>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />
      {buffer ? (
        <LoaderComp />
      ) : (
        <>
          {view == showcaseNavigator.HOME ? (
            <>
              <View style={styles.superStarHome}>
                <TouchableOpacity
                  style={styles.singleContent}
                  onPress={() => setView(showcaseNavigator.AUCTION)}>
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
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>Auction</Text>
                  </LinearGradient>
                  <Image source={imagePath.Auction} style={styles.postImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleMarketPlace}
                  style={styles.singleContent}>
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
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>MarketPlace</Text>
                  </LinearGradient>
                  <Image
                    source={imagePath.MarketPlace}
                    style={styles.postImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.superStarHome}>
                <TouchableOpacity
                  style={styles.singleContent}
                  onPress={handleSouvenir}>
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
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>Souvenir</Text>
                  </LinearGradient>
                  <Image
                    source={imagePath.Souvenir}
                    style={styles.postImageS}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
          {view == showcaseNavigator.AUCTION ? (
            <AuctionTab
              setView={setView}
              starId={star?.id}
              setProduct={setProduct}
            />
          ) : (
            <></>
          )}
          {view == showcaseNavigator.PARTICIPATE ? (
            <Participate starId={star?.id} product={product} />
          ) : (
            <></>
          )}
          {/* {view == showcaseNavigator.BUYNOW ? <BuyNowShowcase /> : <></>} */}
          {view == showcaseNavigator.BUYNOW ? <BuyNowShowcase /> : <></>}
          {view == showcaseNavigator.MARKETPLACE ? (
            <MarketPlaceShowcase />
          ) : (
            <></>
          )}
          {view == showcaseNavigator.SOUVENIR ? (
            <Souvenir star={star} />
          ) : view == showcaseNavigator.MARKETPLACE &&
            marketPlaceToggle.length > 0 ? (
            <MarketPlaceShowcase star={star} />
          ) : (
            <></>
          )}

          {/* 
<AuctionTab/>

<Participate/> */}
        </>
      )}
    </ScrollView>
  );
};

export default ShowCase;
