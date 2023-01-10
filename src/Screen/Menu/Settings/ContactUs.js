import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComp from '../../../Components/HeaderComp';
import TitleHeader from '../../../Components/TitleHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';
import Toast from 'react-native-root-toast';

const ContactUs = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const {axiosConfig, setUserInfo, useInfo} = useContext(AuthContext);

  const loadInfo = () => {
    axios
      .get(AppUrl.userPersonalData, axiosConfig)
      .then(res => {
        console.log('all info', res.data);
        if (res.status === 200) {
          setFullName(res.data?.userList?.first_name);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  function handleSubmit() {
    if (message != '') {
      Toast.show('submit success...', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      setMessage('');
      setFullName('');
    } else {
      Toast.show('Please complete all fields...', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  }

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <TitleHeader title={'Contact Us'} />

        <View
          style={{
            backgroundColor: '#202020',
            marginHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{color: 'white'}}>Hotline:</Text>
              </View>
              <View>
                <Text style={{color: 'white', marginHorizontal: 5}}>
                  02-222297873
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{color: 'white'}}>Emergency number</Text>
              </View>
              <View>
                <Text style={{color: 'white', marginHorizontal: 5}}>
                  +8801749969029
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{color: 'white'}}>Office Email:</Text>
              </View>
              <View>
                <Text style={{color: 'white', marginHorizontal: 5}}>
                  info@hellosuperstars.com
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#202020',
            marginHorizontal: 10,
            borderRadius: 10,
          }}>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 10,
                paddingVertical: 5,
              }}>
              <Icon
                name="user-circle"
                style={styles.iconStyle}
                size={20}
                color="#ffaa00"
              />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your Name'}
                placeholderTextColor="gray"
                onChangeText={e => setFullName(e)}
                value={fullName}
              />
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 20,
                marginTop: 15,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}>
              <Text style={styles.textColor}>Messages:</Text>
              <TextInput
                style={styles.contactMessage}
                multiline={true}
                numberOfLines={4}
                placeholder={'Type your messages....'}
                placeholderTextColor="gray"
                onChangeText={e => setMessage(e)}
                value={message}
              />
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                style={{
                  paddingVertical: 10,
                  borderRadius: 10,
                  width: 200,
                  marginVertical: 10,
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                  SUBMIT
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  textColor: {
    color: 'gray',
  },
  iconStyle: {
    padding: 6,
  },
  contactMessage: {
    paddingHorizontal: 10,
    color: 'white',
    height: 150,
    borderWidth: 0.8,
    borderColor: '#ffaa00',
    borderRadius: 10,
  },
});
