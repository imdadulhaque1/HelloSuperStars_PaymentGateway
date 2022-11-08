import axios from 'axios';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ApprovedImg from '../../Assets/Images/approved.png';
import HeaderComp from '../../Components/HeaderComp';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import styles from './styles';
const Notification = ({navigation}) => {
  const {
    notification,
    axiosConfig,
    totalNotification,
    setTotalNotification,
    updateNotification,
    socketData,
  } = useContext(AuthContext);
  // const { socketData, axiosConfig } = useContext(AuthContext);

  console.log('notification is ===> ', notification);

  const greetingsDetailsForm = (
    notification_id,
    view_status,
    event_type = null,
    event_id = null,
  ) => {
    if (event_type === 'Greetings' && event_id != null) {
      navigation.navigate(navigationStrings.GREETINGREGISTRATION, {
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
    updateNotification();
  }, [totalNotification]);

  useEffect(() => {
    let data = 'got new notification';
    socketData.emit('notification', data);
  }, []);

  console.log('notification------------', notification);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/*.............. custom header start .............. */}
        <HeaderComp text="Notification" backFunc={() => navigation.goBack()} />

        {notification?.length === 0 && (
          <View style={{height: 600, justifyContent: 'center'}}>
            <View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={imagePath.lazyDog}
                  style={{height: 100, width: 100}}
                />
              </View>

              <Text style={{color: 'white', textAlign: 'center'}}>
                Sorry No Data Available !
              </Text>
            </View>
          </View>
        )}

        {notification?.map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              greetingsDetailsForm(
                data.id,
                Number(data.view_status),
                data.notification_text.type,
                data.event_id,
              );
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
                          source={ApprovedImg}
                        />
                      </View>
                    ) : (
                      <View style={styles.imgBorderInactive}>
                        <Image
                          style={{height: 47, width: 47, borderRadius: 100}}
                          source={ApprovedImg}
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
        ))}
      </SafeAreaView>
    </View>
  );
};

export default Notification;
