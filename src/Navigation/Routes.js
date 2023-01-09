import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import MainStack from './MainStack';

import AuthStack from './AuthStack';

import io from 'socket.io-client';
import { AuthContext } from '../Constants/context';
import AppUrl from '../RestApi/AppUrl';
import Loader from '../Screen/Auth/Loader';
import axios from 'axios';
import linking from '../SdkSrc/navigators/linking';
import publicIP from 'react-native-public-ip';
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from 'react-native-root-toast';
import moment from 'moment';

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
  const [greetingInfo, setGreetingInfo] = useState([]);
  const [shurjoPayment, setShurjoPayment] = useState(false);
  const [ipay88Payment, setIpay88Payment] = useState(false);

  const [loactionInfo, setLoactionInfo] = useState();

  const [loactionStatus, setLoactionStatus] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [stripePk, setStripePk] = useState('');
  const [currency, setCurrency] = useState({
    country_code: '',
    currency_value: '',
    symbol: '',
    min: '',
    hour: '',
    timeAction: '',
  });
  //socket connection

  useEffect(() => {
    publicIP()
      .then(ip => {
        console.log(ip);
        getLoactionInformation(ip);
        // '47.122.71.234'
      })
      .catch(error => {
        console.log(error);
        // 'Unable to get IP address.'
      });
    //socket connection
    socket.current = io(AppUrl.SoketUrl);
    setSocketData(socket.current);

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
    } catch (error) { }
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
  // '104.44.7.192'
  // "162.210.194.38" usa
  //103.91.229.182 bdt
  //get location information
  const getLoactionInformation = ip => {
    console.log(axiosConfig);
    axios
      .get(AppUrl.MyLoaction + ip, axiosConfig)
      .then(res => {
        setLoactionStatus(true);
        setLoactionInfo(res?.data?.locationData);
        setCurrency({
          country_code: res?.data?.currencyDetails?.country_code,
          currency_value: res?.data?.currencyDetails?.currency_value,
          symbol: res?.data?.currencyDetails?.symbol,
          min: res.data?.currencyDetails?.minute,
          hour: res.data?.currencyDetails?.hours,
          timeAction: res.data?.currencyDetails?.time_action,
        });
        setStripePk(res?.data?.strpe_pk);
        console.log(' location cpunty code', res?.data?.currencyDetails?.country_code);
      })
      .catch(err => {
        Toast.show('Server Error !', Toast.durations.SHORT);
        console.log(err);
      });
  };

  //country base time
  const countryTime = valu => {
    if (currency.timeAction != 'null') {
      if (currency.timeAction == 'add') {
        return moment(valu, 'HH:mm:ss')
          .add(currency.min, 'minutes')
          .add(currency.hour, 'hours')
          .format('hh:mm A');
      } else if (currency.timeAction == 'remove') {
        return moment(valu, 'HH:mm:ss')
          .subtract(currency.min, 'minutes')
          .subtract(currency.hour, 'hours')
          .format('hh:mm A');
      }
    }

    return moment(valu, 'HH:mm:ss').format('hh:mm A');
  };

  //country base time
  const countryDate = valu => {
    if (currency.timeAction != 'null') {
      if (currency.timeAction == 'add') {
        return moment(valu)
          .add(currency.min, 'minutes')
          .add(currency.hour, 'hours')
          .format('Do MMM YY');
      } else if (currency.timeAction == 'remove') {
        return moment(valu)
          .subtract(currency.min, 'minutes')
          .subtract(currency.hour, 'hours')
          .format('Do MMM YY');
      }
    }

    return moment(valu).format('Do MMM YY');
  };

  //country date for post

  const countryDateTime = (valu, formate) => {
    if (currency.timeAction != 'null') {
      if (currency.timeAction == 'add') {
        return moment(valu)
          .add(currency.min, 'minutes')
          .add(currency.hour, 'hours')
          .format(formate);
      } else if (currency.timeAction == 'remove') {
        return moment(valu)
          .subtract(currency.min, 'minutes')
          .subtract(currency.hour, 'hours')
          .format(formate);
      }
    }

    return moment(valu).format(formate);
  };

  //country base time
  const countryTimestamp = () => {
    // alert('hello')
    if (currency.timeAction != 'null') {
      if (currency.timeAction != 'add') {
        return moment(Date.now())
          .add(currency.min, 'minutes')
          .add(currency.hour, 'hours')
          .format();
      } else if (currency.timeAction != 'remove') {
        return moment(Date.now())
          .subtract(currency.min, 'minutes')
          .subtract(currency.hour, 'hours')
          .format();
      }
    }

    return moment(Date.now()).format();
  };

  //get countrybase currency
  const currencyCount = valu => {
    return (Number(valu) * Number(currency?.currency_value)).toFixed(0);
  };

  //get currency valu * number
  const currencyMulti = (valu, number) => {
    console.log('cost_____', valu);
    console.log('number_____', number);

    return (Number(valu) * Number(currency?.currency_value) * number).toFixed(
      0,
    );
  };

  //activity information
  const getActivity = () => {
    axios
      .get(AppUrl.Menu, axiosConfig)
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        //console.log(err);
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
      .catch(err => { });
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
        //console.log(err);
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
    } catch (error) { }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <StripeProvider
      publishableKey={stripePk}
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.Hellosuperstars">
      <AuthContext.Provider
        value={{
          loactionInfo,
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
          getWaletInformation,
          shurjoPayment,
          setShurjoPayment,
          setLoginStatus,
          currency,
          currencyCount,
          currencyMulti,
          greetingInfo,
          setGreetingInfo,
          loactionStatus,
          quantity,
          setQuantity,
          countryTime,
          countryDate,
          countryDateTime,
          countryTimestamp,
        }}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!!loginStatus ? (
              <>{MainStack(Stack, loactionStatus)}</>
            ) : (
              <>{AuthStack(Stack)}</>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </StripeProvider>
  );
};

export default Routes;
