import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import NotificationContent from './NotificationContent';
import styles from './styles';
const Notification = ({navigation}) => {
  const {
    notification,
    axiosConfig,
    totalNotification,
    setTotalNotification,
    updateNotification,
    socketData,
    greetingInfo,
  } = useContext(AuthContext);
  // const { socketData, axiosConfig } = useContext(AuthContext);

  console.log('notification is ===> ', notification);
  const Navigation = useNavigation();

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
        <ScrollView>
          {/*.............. custom header start .............. */}
          <HeaderComp
            text="Notification"
            backFunc={() => navigation.goBack()}
          />

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
            <NotificationContent data={data} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Notification;
