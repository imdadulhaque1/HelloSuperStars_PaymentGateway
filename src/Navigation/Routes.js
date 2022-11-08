import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import MainStack from './MainStack';

import AuthStack from './AuthStack';

import io from 'socket.io-client';
import {AuthContext} from '../Constants/context';
import AppUrl from '../RestApi/AppUrl';
import Loader from '../Screen/Auth/Loader';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState('');

  const [useInfo, setUserInfo] = useState({});
  const [notification, setNotification] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loginStatus, setLoginStatus] = useState(null);
  const [socketData, setSocketData] = useState();
  const socket = useRef();

  const [activities, setActivities] = useState([]);

  const [totalNotification, setTotalNotification] = useState();
  //socket connection
  useEffect(() => {
    //socket connection
    socket.current = io(AppUrl.SoketUrl);
    setSocketData(socket.current);

    //console.log('user inforamtion...', useInfo)

    retrieveData();
    LoginStatusGet();
  }, []);

  //token set
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('auth_token', value);
    } catch (e) {
      // saving error
    }
  };

  //login information save
  const LoginStatusSet = async value => {
    try {
      // JSON.stringify(userInfo)
      await AsyncStorage.setItem('loginStaus', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  //login information get
  const LoginStatusGet = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('loginStaus');
      if (loginStatus !== null) {
        let data = JSON.parse(loginStatus);
        console.log('user info', data.userInfo);
        setUserInfo(data);
        setLoginStatus(data);
      }
    } catch (error) {}
  };

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
      enctype: 'multipart/form-data',
    },
  };

  const [waletInfo, setWaletInfo] = useState();
  // walet information with token
  useEffect(() => {
    getWaletInformation();
    getActivity();
    updateNotification();
  }, [userToken]);

  //wallet information
  const getWaletInformation = () => {
    axios
      .get(AppUrl.WaletInfo, axiosConfig)
      .then(res => {
        setWaletInfo(res.data.userWallet);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //activity information
  const getActivity = () => {
    axios
      .get(AppUrl.Menu, axiosConfig)
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   *paytm payment success to backend
   */
  const paytmSuccess = data => {
    console.log('payment data', data);
    axios
      .post(AppUrl.paytmPaymentSuccess, data, axiosConfig)
      .then(res => {
        console.log('my data succes', res.data);
      })
      .catch(err => {});
  };

  //notification

  const updateNotification = () => {
    axios
      .get(AppUrl.totalNotificationCount, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setTotalNotification(res.data.totalNotification);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const authContext = useMemo(() => ({
    signIn: (token, userInfo) => {
      const UserInFormation = {
        id: userInfo.id,
        name: userInfo.username,
        image: userInfo.image,
      };

      socketData.emit('addUser', UserInFormation);

      setUserInfo(userInfo);
      storeData(token);
      setUserToken(token);
      setLoading(false);

      //user information update with Sign In
      setLoginStatus(userInfo);
      LoginStatusSet(userInfo);
    },
    signOut: () => {
      AsyncStorage.removeItem('auth_token');
      AsyncStorage.removeItem('loginStaus');
      setUserToken(null);
      setLoginStatus(null);
      setLoading(false);
    },
    signUp: (token, userInfo) => {
      storeData(token);
      setUserToken(token);

      //user information update with signup
      setUserInfo(userInfo);
      LoginStatusSet(userInfo);
    },
    Otp: token => {
      storeData(token);
      setUserToken(token);
    },
    userInfoUpate: userInfo => {
      //user information update with information update
      setUserInfo(userInfo);
      LoginStatusSet(userInfo);
    },
    category: () => {
      setLoginStatus('login');
      LoginStatusSet(useInfo);
    },
    token: async () => {
      try {
        const value = await AsyncStorage.getItem('auth_token');
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.log(error);
      }
    },
  }));

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_token');
      if (value !== null) {
        setUserToken(value);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    } catch (error) {}
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authContext,
        userToken,
        axiosConfig,
        useInfo,
        notification,
        setNotification,
        socketData,
        setPosts,
        posts,
        setWaletInfo,
        waletInfo,
        socket,
        activities,
        getActivity,
        totalNotification,
        setTotalNotification,
        updateNotification,
        paytmSuccess,
        setUserInfo,
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* !!loginStatus */}
          {!!loginStatus ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Routes;
