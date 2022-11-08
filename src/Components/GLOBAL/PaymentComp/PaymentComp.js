import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import styles from './Styles';
// import imagePath from '../../../Constants/imagePath';

// import UnderlineImage from '../../../GLOBAL/Reuseable/UnderlineImage';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../Constants/navigationStrings';
import { AuthContext } from '../../../Constants/context';
import { useForm, Controller } from "react-hook-form";
import AppUrl from '../../../RestApi/AppUrl';
import axios from 'axios';
import LoaderComp from '../../LoaderComp';
import AlertModal from '../../MODAL/AlertModal';
import imagePath from '../../../Constants/imagePath';
import UnderlineImage from '../Reuseable/UnderlineImage';
import Toast from 'react-native-root-toast';
import { useAxiosGet } from '../../../CustomHooks/useAxiosGet';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { useStripePayment } from '../../../CustomHooks/useStripePayment';

const PaymentComp = ({ eventType, eventId, modelName, type = null, setPaymentView, PackegeId = null, buyFor, singlePackage = null }) => {
  const { axiosConfig, setWaletInfo, paytmSuccess } = useContext(AuthContext);
  const Navigation = useNavigation()
  const [packageBuffer, setPackageBuffer] = useState(false)
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(false);
  const { resData, setResData, buffer, error, HandelGetData } = useAxiosGet(AppUrl.getTokenPaytm + singlePackage?.price)

  const { stripeBuffer, stripeError, HandelStripePayment, openPaymentSheet, stripePaymentStatus } = useStripePayment({
    amount: singlePackage?.price,
    event_type: buyFor,
    event_id: PackegeId,
    redirect: false
  })
  // this modal object is for modal content 
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: ''
  });
  const [paytmDat, setPaytmDat] = useState({
    'token': "",
    'order_id': "",
    'mid': "",
    'amount': ""
  })

  useEffect(() => {
    HandelGetData()
  }, [PackegeId])

  useEffect(() => {
    setPaytmDat({
      'token': resData?.Token_data?.body?.txnToken,
      'order_id': resData?.orderId,
      'mid': resData?.mid,
      'amount': resData?.amount,
      'callBackUrl': resData?.callBackUrl
    })
    console.log('paytm token', resData?.Token_data?.body?.txnToken + " fee  :" + singlePackage?.price)

  }, [resData])

  /**
   * payment by paytm
   */
  const payTmPayment = () => {

    if (!buffer) {
      AllInOneSDKManager.startTransaction(
        paytmDat.order_id,
        paytmDat.mid,
        paytmDat.token,
        paytmDat.amount,
        paytmDat.callBackUrl + paytmDat.order_id,
        true,
        false,
        ""
      ).then((result) => {
        if (result.STATUS == "TXN_SUCCESS") {
          Toast.show(
            'Payment success',
            Toast.durations.SHORT,
          );
          handelBuyPackage()
          paytmSuccess({
            ...result,
            modelName: buyFor,
            eventId: PackegeId,
          })
        }

      }).catch((err) => {
        console.log('payment error', err.message)
        Toast.show(
          'Payment failed',
          Toast.durations.SHORT,
        );
      });

    } else {
      Toast.show(
        'please wait...',
        Toast.durations.SHORT,
      );
    }



  }



  useEffect(() => {
    // alert(buyFor + " " + PackegeId)
    console.log(singlePackage.price)
  }, [PackegeId])
  // buy package
  const handelBuyPackage = () => {

    let PackageData = {
      'card_holder_name': "",
      'packages_id': PackegeId,
      'card_no': "",
      'card_expire_date': '648726842',
      'card_cvv': '84923804',
      'type': buyFor

    }
    setPackageBuffer(true)
    axios.post(AppUrl.BuyPackages, PackageData, axiosConfig).then(res => {
      console.log('payment responce ', res)
      setPackageBuffer(false)
      if (res.data.status === 200) {
        setWaletInfo(res.data.waletInfo)
        setModal(true)
        Toast.show('Package purchase done !', Toast.durations.SHORT);
        // setModalObj({
        //   modalType: 'success',
        //   buttonTitle: 'Download Ticket',
        //   message: 'Registration completed successfully !'
        // })

        setPaymentView(false)
      }
    }).catch((err) => {
      setPackageBuffer(false)
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'OK',
        message: 'Something Went Wrong'
      })
      setModal(true)
    });
  }


  const onSubmit = (data) => {

    let aditionalData = {
      ...data,
      'event_id': eventId,
      'model_name': modelName
    }
    setPackageBuffer(true)

    axios.post(AppUrl.EventRegister, aditionalData, axiosConfig).then(res => {
      // console.log(res.data)
      setPackageBuffer(false)

      if (res.data.status === 200) {

        reset(data)
        if (eventType == "OfflineMeetup") {
          setModalObj({
            modalType: 'success',
            buttonTitle: 'Download Ticket',
            message: 'Registration completed successfully !'
          })
        } else {
          setModalObj({
            modalType: 'success',
            buttonTitle: 'OK',
            message: 'Registration completed successfully !'
          })
        }
        setModal(true)
      }
      else {
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong'
        })
        setModal(true)
      }
    }).catch((err) => {
      setPackageBuffer(false)
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'OK',
        message: 'Something Went Wrong'
      })
      setModal(true)
    });
  }

  const modalButtonPress = () => {



    setModal(false)
    if (type !== null && type == 'packageBuy') {
      return setPaymentView(false);
    }


    if (eventType == "OfflineMeetup") {
      Linking.openURL(
        'http://www.africau.edu/images/default/sample.pdf',
      )
    } else if (eventType == "OnlineMeetup") {
      return Navigation.navigate(navigationStrings.HOME);
    } else {
      return Navigation.navigate(navigationStrings.HOME);
    }
  }

  //stripe payment 
  const stripePaymentClick = () => {
    if (stripeBuffer) {
      openPaymentSheet()
    } else {
      Toast.show('Try agin', Toast.durations.SHORT);
    }
  }

  useEffect(() => {
    if (stripePaymentStatus) {
      handelBuyPackage()
    }
  }, [stripePaymentStatus])


  return (
    <>
      <AlertModal modalObj={modalObj} modal={modal} setModal={setModal} buttoPress={modalButtonPress} />
      {packageBuffer ?
        <LoaderComp />
        :
        <></>
      }
      <View style={styles.topCard}>
        <Text style={styles.fonts}>Payment Information</Text>
        <UnderlineImage />
        <ScrollView horizontal>
          <TouchableOpacity onPress={() => payTmPayment()} >
            <Image source={imagePath.paytm} style={{ margin: 10, width: 100, height: 80 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stripePaymentClick()}>
            <Image source={imagePath.Stripe} style={{ margin: 10, width: 100, height: 80 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.payneeor} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.bank} style={{ margin: 10 }} />
          </TouchableOpacity>
        </ScrollView>
        {/* <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.formText}>Card Holder Name</Text>
              <View style={styles.formText2}>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  placeholder="Enter Name"
                  value={value}
                />
                {errors.card_holder_name && <Text style={{ color: 'red', marginLeft: 8 }}>This field is required !</Text>}
              </View>
            </View>

          )}
          name="card_holder_name"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.formText}>Card Number</Text>
              <View style={styles.formText2}>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  placeholder="Enter Card Number"
                />
                {errors.card_number && <Text style={{ color: 'red', marginLeft: 8 }}>This field is required !</Text>}
              </View>
            </View>
          )}
          name="card_number"
        />

        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.formText, { width: '45%' }]}>Date</Text>
            <Text style={styles.formText}>CCTV</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.formText2, { width: '45%' }]}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#fff"
                placeholder="23-04-22"
              />
            </View>
            <View style={[styles.formText2, { width: '45%' }]}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#fff"
                placeholder="125"
              />
            </View>
          </View>
        </View> */}

        <View style={styles.textInputView}>

          {type !== null && type == 'packageBuy' &&
            <TouchableOpacity
              style={{

                width: '25%',
                borderRadius: 4,
                borderColor: '#FFAD00',
                borderWidth: 1,
                marginRight: 5,

              }}

            >
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 8,
                  color: '#FFAD00'
                }} onPress={() => setPaymentView(false)}>

                Cancel
              </Text>
            </TouchableOpacity>
          }

          <TouchableOpacity
            style={{
              backgroundColor: '#FFAD00',
              width: '40%',
              borderRadius: 4,
              borderColor: '#FFAD00',
              borderWidth: 1
            }}
            onPress={type !== null && type == 'packageBuy' ?
              handleSubmit(handelBuyPackage)
              : handleSubmit(onSubmit)
            }
          >
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 8,
                color: '#292929'
              }}>

              Confirm Payment
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    </>
  );
};

export default PaymentComp;
