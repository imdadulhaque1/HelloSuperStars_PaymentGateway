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
import React, { useState, useContext } from 'react';
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
const PaymentComp = ({ eventType, eventId, modelName, type = null, setPaymentView, PackegeId = null, buyFor }) => {
  const { axiosConfig, setWaletInfo } = useContext(AuthContext);
  const Navigation = useNavigation()
  const [buffer, setBuffer] = useState(false)
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(false);

  // this modal object is for modal content 
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: ''
  });

  // buy package
  const handelBuyPackage = (data) => {

    let PackageData = {
      'card_holder_name': data.card_holder_name,
      'packages_id': PackegeId,
      'card_no': data.card_number,
      'card_expire_date': '648726842',
      'card_cvv': '84923804',
      'type': buyFor

    }
    setBuffer(true)
    axios.post(AppUrl.BuyPackages, PackageData, axiosConfig).then(res => {
      console.log('payment responce ', res)
      setBuffer(false)
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
      setBuffer(false)
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
    setBuffer(true)

    axios.post(AppUrl.EventRegister, aditionalData, axiosConfig).then(res => {
      // console.log(res.data)
      setBuffer(false)

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
      setBuffer(false)
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



  return (
    <>
      <AlertModal modalObj={modalObj} modal={modal} setModal={setModal} buttoPress={modalButtonPress} />
      {buffer ?
        <LoaderComp />
        :
        <></>
      }
      <View style={styles.topCard}>
        <Text style={styles.fonts}>Payment Information</Text>
        <UnderlineImage />
        <ScrollView horizontal>
          <TouchableOpacity>
            <Image source={imagePath.paypal} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.bkash} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.payneeor} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.bank} style={{ margin: 10 }} />
          </TouchableOpacity>
        </ScrollView>
        <Controller
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
        </View>

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
