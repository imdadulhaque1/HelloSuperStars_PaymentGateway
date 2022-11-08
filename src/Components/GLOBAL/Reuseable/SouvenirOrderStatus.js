//import liraries
import React, {useContext, useState} from 'react';
import {
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import imagePath from '../../../Constants/imagePath';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../../RestApi/AppUrl';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {AuthContext} from '../../../Constants/context';
import HeaderComp from '../../HeaderComp';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';

const labels = [
  'Applied',
  'Approved',
  'Process',
  'Received',
  'Process',
  'Out ',
  'Delivered',
];
// const labels = ['Applied', 'Received', 'Out for Delivery', 'Delivered'];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 8,
  currentStepIndicatorLabelFontSize: 11,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#fe7013',
};

// create a component
const SouvenirOrderStatus = ({route, navigation}) => {
  const {width} = useWindowDimensions();
  const {event} = route.params;
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  console.log(event);
  const ownerName = event?.name;
  const ownerPhone = event?.mobile_no;
  const ownerAddress = event?.city?.name + ', ' + event?.country?.name;
  const totalPrice = event?.total_amount;
  const description = event?.souvenir?.description;
  const descriptionHTML = {
    html: `<div style='color:#e6e6e6; '>${description}</div>`,
  };
  const progress = event?.status;
  const imageURl = event?.image;
  const {axiosConfig} = useContext(AuthContext);

  const downloadInvoice = e => {
    const data = {
      productName: event?.souvenir?.title,
      SuperStar: event?.star?.first_name + ' ' + event?.star?.last_name,
      qty: 1,
      unitPrice: event?.souvenir?.price,
      total: event?.souvenir?.price,
      subTotal: event?.souvenir?.price,
      deliveryCharge: event?.souvenir?.delivery_charge,
      tax: event?.souvenir?.tax,
      grandTotal:
        parseInt(event?.souvenir?.price) +
        parseInt(event?.souvenir?.delivery_charge) +
        parseInt(event?.souvenir?.tax),
      orderID: event?.invoice_no,
      orderDate: event?.created_at,
      name: event?.name,
      termCondition: event?.description,
    };
    axios
      .post(AppUrl.getPDF, data, axiosConfig)
      .then(res => {
        console.log(res.data);
        Linking.openURL(`${AppUrl.MediaBaseUrl}/${res.data}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlePayment = () => {
    setIsShowPaymentComp(true);
  };

  return (
    <ScrollView style={{backgroundColor: '#000', flex: 1, paddingBottom: 20}}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={{margin: 8}}>
            <View style={styles.showcaseStatus}>
              <Text style={{color: '#ff0'}}>Delivery Status</Text>
            </View>

            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={progress}
                labels={labels}
                stepCount={7}
              />
            </View>

            <View style={styles.showcaseForm}>
              <Image
                source={{
                  uri: `${AppUrl.MediaBaseUrl + '/' + imageURl}`,
                }}
                style={{width: '100%', height: 200, borderRadius: 10}}
                resizeMode="stretch"
              />

              <View style={{width: '100%', marginVertical: 25}}>
                <Text style={styles.inputText}>Name {ownerName}</Text>
                <Text style={styles.inputText}>Mobile No {ownerPhone}</Text>
                <Text style={styles.inputText}>Address {ownerAddress}</Text>
                <Text style={styles.inputText}>Total Price {totalPrice}</Text>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <Text style={styles.desc}>Description </Text>
                  </View>
                  <View style={{width: '80%'}}>
                    <RenderHtml contentWidth={width} source={descriptionHTML} />
                  </View>
                </View>

                <Text style={styles.inputText}>
                  {event?.status == 6 ? <>Delivered </> : <>Ordered </>}
                  {moment(event?.created_at).format('LL')}
                </Text>

                <Text style={styles.inputText}>
                  Status
                  {event?.status == 0 ? (
                    <> Pending for Approval</>
                  ) : event?.status == 1 ? (
                    <> Approved for Payment</>
                  ) : event?.status == 2 ? (
                    <> Payment Complete</>
                  ) : event?.status == 3 ? (
                    <> Processing</>
                  ) : event?.status == 4 ? (
                    <> Product Received</>
                  ) : event?.status == 5 ? (
                    <> Processing</>
                  ) : event?.status == 6 ? (
                    <> Out for Delivery</>
                  ) : (
                    <> Delivered</>
                  )}
                </Text>

                {event?.status == 1 ? (
                  <TouchableOpacity
                    style={styles.downloadContainer}
                    onPress={handlePayment}>
                    <Text style={{color: '#fe7013'}}>
                      <FontAwesome5
                        name={'credit-card'}
                        style={styles.customIcon}
                      />
                      {'  '}
                      Pay now
                    </Text>
                  </TouchableOpacity>
                ) : event?.status == 2 ? (
                  <TouchableOpacity
                    style={styles.downloadContainer}
                    onPress={downloadInvoice}>
                    <Text style={{color: '#fe7013'}}>
                      <FontAwesome5
                        name={'download'}
                        style={styles.customIcon}
                      />{' '}
                      Download Invoice
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      {isShowPaymentComp ? (
        <RegisPaymentModal
          eventType="souvenir"
          modelName="souvenir"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          souvenirId={event.souvenir_id}
          id={event.id}
          fee={event.total_amount}
        />
      ) : (
        <></>
      )}
    </ScrollView>
    // </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
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
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    width: '98%',
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
  showcaseStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  stepIndicator: {
    marginVertical: 8,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  showcaseForm: {
    backgroundColor: '#343333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputBorder: {
    backgroundColor: '#343333',
    color: '#ffffff',
    height: 18,
    // margin: 12,
    borderWidth: 0,
    fontSize: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputText: {
    marginTop: 8,
    marginLeft: 5,
    color: '#ddd',
  },
  price: {
    marginTop: 1,
    marginLeft: 5,
    color: '#ddd',
  },
  desc: {
    marginLeft: 5,
    color: '#ddd',
  },
  downloadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  customIcon: {
    fontSize: 18,
    color: '#fe7013',
  },
});

export default SouvenirOrderStatus;
