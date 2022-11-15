//import liraries
import React, { useContext, useState } from 'react';
import {
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import imagePath from '../../../Constants/imagePath';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../../RestApi/AppUrl';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderComp from '../../HeaderComp';
import axios from 'axios';
import { AuthContext } from '../../../Constants/context';

// const labels = ['Applied', 'Approved', 'Processing', 'Delivered', 'Son'];
const labels = ['Ordered', 'Received', 'Out for Delivery', 'Delivered'];

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
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 11,
  currentStepLabelColor: '#fe7013',
};

// create a component
const OrderStatus = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { event } = route.params;

  const { axiosConfig } = useContext(AuthContext);
  console.log(event);
  const ownerName =
    event?.marketplace?.superstar?.first_name +
    ' ' +
    event?.marketplace?.superstar?.last_name;
  const totalPrice = event?.total_price;
  const description = event?.marketplace?.description;
  const descriptionHTML = {
    html: `<div style='color:#e6e6e6;'>${description}</div>`,
  };
  const progress = event?.status;
  const imageURl = event?.marketplace?.image;

  const downloadInvoice = () => {
    const data = {
      productName: event?.marketplace?.title,
      SuperStar: event?.star?.first_name + ' ' + event?.star?.last_name,
      qty: 1,
      unitPrice: event?.marketplace?.unit_price,
      total: event?.marketplace?.unit_price,
      subTotal: event?.marketplace?.unit_price,
      deliveryCharge: event?.marketplace?.delivery_charge,
      tax: event?.marketplace?.tax,
      grandTotal:
        parseInt(event?.marketplace?.unit_price) +
        parseInt(event?.marketplace?.delivery_charge) +
        parseInt(event?.marketplace?.tax),
      orderID: event?.order_no,
      orderDate: event?.payment_date,
      name: event?.card_holder_name,
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

  return (
    <ScrollView style={{ backgroundColor: '#000', flex: 1, paddingBottom: 40 }}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={{ marginTop: 5 }}>
            <View style={styles.showcaseStatus}>
              <Text style={{ color: '#ff0' }}>Delivery Status</Text>
            </View>

            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={progress}
                labels={labels}
                stepCount={4}
              />
            </View>

            <View style={styles.showcaseForm}>
              <Image
                source={{
                  uri: `${AppUrl.MediaBaseUrl + '/' + imageURl}`,
                }}
                style={{ width: '100%', height: 200, borderRadius: 5 }}
                resizeMode="stretch"
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <View style={{ width: '20%' }}>
                  <Text style={{ color: '#fff' }}>Owner:</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',

                    width: '78%',
                  }}>
                  <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                    {ownerName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff' }}>Description:</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',

                    width: '78%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      flexWrap: 'wrap',
                    }}>
                    <RenderHtml contentWidth={width} source={descriptionHTML} />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <View style={{ width: '20%' }}>
                  <Text style={{ color: '#fff' }}>Price:</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',

                    width: '78%',
                  }}>
                  <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                    {totalPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <View style={{ width: '20%' }}>
                  <Text style={{ color: '#fff' }}>
                    {event?.status == 3 ? <>Delivered: </> : <>Ordered: </>}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',

                    width: '78%',
                  }}>
                  <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                    {moment(event?.created_at).format('LL')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <View style={{ width: '20%' }}>
                  <Text style={{ color: '#fff' }}>Status:</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',

                    width: '78%',
                  }}>
                  <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                    {event?.status == 1 ? (
                      <> Ordered</>
                    ) : event?.status == 2 ? (
                      <> Received</>
                    ) : event?.status == 3 ? (
                      <> Out for Delivery</>
                    ) : (
                      <> Delivered</>
                    )}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 5,
                  // position: 'absolute',
                  // display: 'flex',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.downloadContainer}
                  onPress={downloadInvoice}>
                  <Text style={{ color: '#fe7013' }}>
                    <FontAwesome5 name={'download'} style={styles.customIcon} />{' '}
                    Download Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    width: '98%',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
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

export default OrderStatus;
