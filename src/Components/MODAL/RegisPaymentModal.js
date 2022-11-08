//import liraries
import React, {useState, useContext, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import UnderlineImage from '../GLOBAL/Reuseable/UnderlineImage';
import {useNavigation} from '@react-navigation/native';
import AlertModal from './AlertModal';
import LoaderComp from '../LoaderComp';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import navigationStrings from '../../Constants/navigationStrings';
// import Heading from '../Reuseable/Heading';

import PaymentModal from './PaymentModal';
import Heading from '../GLOBAL/Reuseable/Heading';

// create a component

const RegisPaymentModal = ({
  appeal,
  setAppeal,
  RoundName,
  eventType,
  eventId = null,
  modelName,
  isShowPaymentComp,
  setIsShowPaymentComp,
  parentData,
  event_registration_id = null,
  notification_id = null,
  fee = null,
  end_time = null,
  event_type = null,
  start_time = null,
  fetchAllDataAfterPayment = null,
  modalPara = null,
  setLiked = null,
  souvenirId = null,
  id = null,
  setPaymentComplete = null,
  greetingId = null,
}) => {
  const {setNotification} = useContext(AuthContext);
  const {axiosConfig, setWaletInfo} = useContext(AuthContext);
  const Navigation = useNavigation();
  const [buffer, setBuffer] = useState(false);
  const [walletInfo, setWalletInfo] = useState([]);
  const getWalletInfo = () => {
    axios
      .get(AppUrl.auditionRegistrationWallet, axiosConfig)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          setWalletInfo(res.data.userWallet);
        }
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  };
  useEffect(() => {
    getWalletInfo();
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState(false);

  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });

  const cardInfoSubmit = (data, type = null) => {
    console.log(type);
    const aditionalData = {
      ...parentData,
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: fee,
      start_time: start_time,
      end_time: end_time,

      payment_method: type,
    };
    let finalData = {
      ...aditionalData,
      ...data,
    };
    console.log(finalData);

    axios
      .post(AppUrl.EventRegister, finalData, axiosConfig)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          reset(data);
          setWaletInfo(res.data.waletInfo);
          setModalObj({
            modalType: 'success',
            buttonTitle: 'OK',
            message: 'Registration completed successfully !',
          });

          setModal(true);
        }
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };
  const onSubmitLearning = (type, data = null) => {
    console.log('payy');
    let additionalData = {
      ...parentData,
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: fee,
      start_time: start_time,
      end_time: end_time,
      room_id: '',
    };

    let finalData = {
      ...additionalData,
      ...data,
    };

    if (type === 'card') {
      axios
        .post(AppUrl.EventRegister, finalData, axiosConfig)
        .then(res => {
          setBuffer(false);
          console.log(res.data);
          if (res.data.status === 200) {
            reset(data);
            setModalObj({
              modalType: 'success',
              buttonTitle: 'Ok',
              message: 'Registration completed successfully !',
            });

            setModal(true);
            return;
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
          }
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        });
    }

    if (type === 'wallet') {
      let data = {
        event_type: eventType,
        notification_id: notification_id ? notification_id : null,
        eventId: Number(eventId),
        model_name: modelName,
        fee: fee,
        start_time: start_time,
        end_time: end_time,
        greetingId: greetingId,
      };
      console.log(data);
      axios
        .post(AppUrl.walletQnaLearningRegister, data, axiosConfig)
        .then(res => {
          setBuffer(false);
          console.log(res.data);
          if (res.data.status === 200) {
            reset(data);
            setModalObj({
              modalType: 'success',
              buttonTitle: 'Ok',
              message: 'Registration completed successfully !',
            });
            // setWaletInfo()
            setWaletInfo(res.data.waletInfo);
            setModal(true);
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
          }
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        });
    }
  };
  const LearningCertificatePay = () => {
    setPaymentComplete(true);
    setModalObj({
      modalType: 'success',
      buttonTitle: 'OK',
      message: 'Registration completed successfully !',
    });
    setModal(true);
  };
  const onSubmit = (data, type = null) => {
    if (eventType === 'souvenir') {
      let data = {
        souvenir_create_id: souvenirId,
        souvenir_apply_id: id,
        total_amount: fee,
        card_no: '123',
        card_holder_name: 'abc',
        card_expire_date: '23-04-22',
        card_cvv: '123',
      };
      console.log(data);
      axios
        .post(AppUrl.SouvenirPayment, data, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            setModal(true);
            setModalObj({
              modalType: 'Success',
              buttonTitle: 'OK',
              message: 'Payment Complete',
            });
          }
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
        });

      return;
    } else if (eventType === 'videoFeed') {
      let Data = {
        videoId: modalPara[0],
        reactNum: modalPara[1],
        cardHolderName: 'abc',
        cardNumber: '123',
        expireDate: '23-04-22',
        ccv: 125,
        type: type,
      };
      console.log(Data);
      axios
        .post(AppUrl.paymentLoveReact, Data, axiosConfig)
        .then(res => {
          //console.log('res------',res)
          setBuffer(false);
          console.log(res.data);
          if (res.data.status === 200) {
            setWaletInfo(res.data.waletInfo);
            reset(data);
            setLiked(1);
            setModal(true);
            setModalObj({
              modalType: 'success',
              buttonTitle: 'OK',
              message: 'Payment was successful',
            });
            setLiked(1);
            setPaymentComplete(true);
            return;
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            return;
          }
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
        });
    } else {
      let aditionalData = {
        ...parentData,
        event_registration_id: event_registration_id
          ? event_registration_id
          : null,
        notification_id: notification_id ? notification_id : null,
        event_id: Number(eventId),
        model_name: modelName,
        fee: fee,
        start_time: start_time,
        end_time: end_time,
        // room_id: event_type === 'livechat' ? firepadRef.key : '',
        room_id: '',
      };

      let finalData = {
        ...aditionalData,
        ...data,
      };
      // setBuffer(true)

      console.log('finalData------------', finalData);
      console.log('AppUrl.EventRegister------------', AppUrl.EventRegister);

      axios
        .post(AppUrl.EventRegister, finalData, axiosConfig)
        .then(res => {
          setBuffer(false);
          if (res.data.status === 200) {
            reset(data);
            if (eventType == 'OfflineMeetup') {
              setModalObj({
                modalType: 'success',
                buttonTitle: 'Download Ticket',
                message: 'Registration completed successfully !',
              });
            } else {
              setModalObj({
                modalType: 'success',
                buttonTitle: 'OK',
                message: 'Registration completed successfully !',
              });
            }
            setModal(true);
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
          }
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        });
    }
  };

  const modalButtonPress = () => {
    setModal(false);
    if (eventType == 'OfflineMeetup') {
      Linking.openURL('http://www.africau.edu/images/default/sample.pdf');
    } else if (event_registration_id !== null && notification_id !== null) {
      //console.log('here---------')
      axios
        .get(AppUrl.CheckNotification, axiosConfig)
        .then(res => {
          setNotification(res?.data?.notifiction);
        })
        .catch(err => {
          console.log(err);
        });
      return Navigation.navigate(navigationStrings.NOTIFICATION);
    } else if (eventType == 'auction') {
      setIsShowPaymentComp(false);
      fetchAllDataAfterPayment();
    } else if (eventType === 'videoFeed') {
      setIsShowPaymentComp(false);
    } else if (eventType === 'souvenir') {
      setIsShowPaymentComp(false);
    } else if (eventType === 'learningSessionCertificate') {
      setIsShowPaymentComp(false);
      return;
    } else {
      return Navigation.navigate(navigationStrings.HOME);
    }
  };
  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {buffer ? <LoaderComp /> : <></>}
      <Modal
        visible={isShowPaymentComp}
        transparent
        onRequestClose={() => setIsShowPaymentComp(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.topCard}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Pressable onPress={() => setIsShowPaymentComp(false)}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      backgroundColor: '#ff0',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 50,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    X
                  </Text>
                </Pressable>
              </View>
              <Heading heading="Payment Information" />
              <UnderlineImage />

              <ScrollView horizontal>
                <TouchableOpacity>
                  <Image source={imagePath.paypal} style={{margin: 10}} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.bkash} style={{margin: 10}} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.payneeor} style={{margin: 10}} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.bank} style={{margin: 10}} />
                </TouchableOpacity>
              </ScrollView>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
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
                      {errors.card_holder_name && (
                        <Text style={{color: 'red', marginLeft: 8}}>
                          This field is required !
                        </Text>
                      )}
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
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.formText}>Card Number {RoundName}</Text>
                    <View style={styles.formText2}>
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.textInputStyle}
                        placeholderTextColor="#fff"
                        placeholder="Enter Card Number"
                      />
                      {errors.card_number && (
                        <Text style={{color: 'red', marginLeft: 8}}>
                          This field is required !
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                name="card_number"
              />

              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.formText, {width: '45%'}]}>Date</Text>
                  <Text style={styles.formText}>CCTV</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.formText2, {width: '45%'}]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder=""
                    />
                  </View>
                  <View style={[styles.formText2, {width: '45%'}]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder=""
                    />
                  </View>
                </View>
              </View>

              <View style={styles.textInputView}>
                {/* this cheaking comes from Round  */}
                {RoundName === 5 || RoundName === 6 || RoundName === 7 ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFAD00',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}
                    onPress={() => {
                      setIsShowPaymentComp(false);
                      setModal(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Confirm Payment
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFAD00',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}
                    onPress={() =>
                      eventType === 'auditionRegistration'
                        ? cardInfoSubmit(onSubmit, 'card')
                        : eventType === 'learningSession'
                        ? onSubmitLearning('card', onSubmit)
                        : eventType === 'learningSessionCertificate'
                        ? LearningCertificatePay()
                        : onSubmit(onSubmit, 'card')
                    }>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Confirm Payment
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {eventType === 'auditionRegistration' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.auditions ? walletInfo?.auditions : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.auditions ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFAD00',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => cardInfoSubmit(onSubmit, 'wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#AD850C',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'videoFeed' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.love_points ? walletInfo?.love_points : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.love_points ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFAD00',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmit(onSubmit, 'wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#AD850C',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'learningSession' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.learning_session
                        ? walletInfo?.learning_session
                        : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.learning_session ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFAD00',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#AD850C',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'greeting' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.greetings ? walletInfo?.greetings : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.greetings ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFAD00',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#AD850C',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* <PaymentModal
      appeal={appeal}
      setAppeal={setAppeal}
modal={modal}
setModal={setModal}
      /> */}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCard: {
    backgroundColor: '#000',
    margin: 8,
    borderRadius: 5,
  },
  fonts: {
    color: '#FFAD00',

    textAlign: 'center',
    marginTop: 10,
  },
  lineImgView: {
    alignItems: 'center',
  },
  lineImg: {
    marginVertical: 3,
  },
  bannerRow: {alignItems: 'center', position: 'relative', paddingBottom: 15},
  imgRow: {marginVertical: 2, width: '90%'},
  imgRow2: {marginVertical: 2, position: 'absolute', top: '45%', left: '50%'},
  infoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  infoViewSize: {
    color: 'white',
    width: '30%',
  },
  infoViewSize2: {
    color: 'white',
    width: '60%',
  },
  fontInstruction: {
    color: 'white',
    marginLeft: 13,
    marginBottom: 15,
  },
  formText: {
    color: 'white',
    marginLeft: 13,
    marginBottom: 5,
    marginTop: 5,
  },
  formText2: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: '#e6e7e8',
    paddingLeft: 10,
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: 'white',
  },
  textInputView: {
    alignItems: 'center',
    marginVertical: 5,
  },
  textInputView3: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#FFAD00',
    width: '35%',
    borderRadius: 5,
  },

  textInputPass: {
    textAlign: 'center',
    paddingVertical: 4,
    fontWeight: 'bold',
  },

  //modal work start here
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 350,
    // height: 500,
    backgroundColor: '#000',

    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

//make this component available to the app
export default RegisPaymentModal;
