import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React, {useContext, useEffect, useState} from 'react';
import AppUrl from '../../RestApi/AppUrl';

import * as Animatable from 'react-native-animatable';
import ApprovedImg from '../../Assets/Images/approved.png';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../Constants/navigationStrings';

export default function NotificationContent({data, index}) {
  console.log('data----', data);
  const [product, setProduct] = useState(null);
  const {axiosConfig, totalNotification, setTotalNotification, greetingInfo} =
    useContext(AuthContext);
  const greetingsDetailsForm = (
    notification_id,
    view_status,
    event_type = null,
    event_id = null,
  ) => {
    if (event_type === 'Greetings' && event_id != null) {
      Navigation.navigate(navigationStrings.GREETINGREGISTRATION, {
        notification_id: notification_id,
        greeting_id: event_id,
      });
    }
    if (Number(view_status) === 0) {
      axios
        .get(AppUrl.updateNotification + notification_id, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            setTotalNotification(totalNotification - 1);
          }
        });
    }
  };
  useEffect(() => {
    if (data.notification_text.type === 'auction') {
      console.log('auction event id---', data.event_id);
      axios.get(AppUrl.singleAuction + data.event_id, axiosConfig).then(res => {
        console.log('auction---', res.data);
        setProduct(res.data.product);
      });
    }
  }, []);
  const Navigation = useNavigation();

  const handleAuction = (notificationId, eventId, viewStatus) => {
    console.log('notificaiton id', notificationId);
    product != null &&
      Navigation.navigate(navigationStrings.AUCTIONPARTICIPATENOW, {
        product: product,
        id: data.event_id,
      });
    if (Number(viewStatus) === 0) {
      axios
        .get(AppUrl.updateNotification + notificationId, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            setTotalNotification(totalNotification - 1);
          }
        });
    }
  };

  const handlePress = data => {
    data?.notification_text?.type === 'auction'
      ? handleAuction(data.id, data.event_id, Number(data.view_status))
      : greetingsDetailsForm(
          data.id,
          Number(data.view_status),
          data.notification_text.type,
          data.event_id,
        );
  };
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        handlePress(data);
      }}>
      <View style={styles.row}>
        <View style={styles.content}>
          <View style={styles.ContentItems}>
            {data.view_status === 0 ? (
              <View style={styles.ContentItemBar}></View>
            ) : null}

            <View style={{}}>
              {/* <Image style={{ height: 50, width: 50 }} source={ApprovedImg} /> */}
              {data.view_status === 0 ? (
                <View style={styles.imgBorder}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 100}}
                    source={
                      product && data.notification_text.type === 'auction'
                        ? {uri: AppUrl.MediaBaseUrl + product?.banner}
                        : greetingInfo?.banner &&
                          data.notification_text.type === 'Greetings'
                        ? {
                            uri: AppUrl.MediaBaseUrl + greetingInfo?.banner,
                          }
                        : ApprovedImg
                    }
                  />
                </View>
              ) : (
                <View style={styles.imgBorderInactive}>
                  <Image
                    style={{height: 47, width: 47, borderRadius: 100}}
                    source={
                      product && data.notification_text.type === 'auction'
                        ? {uri: AppUrl.MediaBaseUrl + product?.banner}
                        : greetingInfo?.banner &&
                          data.notification_text.type === 'Greetings'
                        ? {
                            uri: AppUrl.MediaBaseUrl + greetingInfo?.banner,
                          }
                        : ApprovedImg
                    }
                  />
                </View>
              )}
            </View>
            <View style={styles.ContentItems2}>
              <Text style={styles.contentText}>
                {data?.notification_text?.type}
              </Text>

              <Text style={styles.contentText2}>
                {data?.notification_text?.text}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.contentText2}>
              {moment(data.created_at).format('hh:mm A')}
            </Text>
            <Text style={styles.contentText3}>
              {moment(data.created_at).format('LL')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
