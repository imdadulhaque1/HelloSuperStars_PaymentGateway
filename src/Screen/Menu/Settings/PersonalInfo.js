import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';
import moment from 'moment';
const PersonalInfo = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const {axiosConfig, setUserInfo, useInfo} = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(AppUrl.userPersonalData, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setFullName(res.data?.userList?.first_name);
          setPhone(res.data?.userList?.phone);
          setEmail(res.data?.userList?.email);
          console.log(moment(res.data?.employmentList?.dob, 'DD-MM-YYYY'));
          setCountry(res.data?.employmentList?.country);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleUpdate = () => {
    const data = {
      first_name: fullName,
      last_name: null,
      country,
      birthday: moment(date).format('yyyy-MM-DD HH:mm:ss'),
    };
    console.log(data);
    axios
      .post(AppUrl.userPersonalDataSubmit, data, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          // setUserInfo(useInfo);
          setUserInfo(res.data.userInfo);
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <View style={{margin: 10}}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            PERSONAL INFORMATION
          </Text>

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
                borderRadius: 23,
                paddingVertical: 2,
              }}>
              <Icon name="user-circle" size={20} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your Name'}
                placeholderTextColor="gray"
                onChangeText={setFullName}
                value={fullName}
              />
            </View>
          </View>

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
                borderRadius: 23,
                paddingVertical: 2,
              }}>
              <Icon name="mobile-phone" size={25} color="#ffaa00" />
              <TextInput
                keyboardType="numeric"
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your phone number'}
                placeholderTextColor="gray"
                onChangeText={setPhone}
                value={phone}
              />
            </View>
          </View>

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
                borderRadius: 23,
                paddingVertical: 2,
              }}>
              <Ionicons name="mail" size={18} color="#ffaa00" />
              <TextInput
                keyboardType="numeric"
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your email'}
                placeholderTextColor="gray"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{marginVertical: 5}}
            onPress={() => setOpen(true)}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>Birthday</Text>
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            theme="dark"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <TouchableOpacity style={{marginVertical: 5}}>
            <View
              style={{
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
                height: 50,
                justifyContent: 'center',
              }}>
              <Picker
                style={{color: '#fff'}}
                selectedValue={setCountry}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Bangladesh" value="Bd" />
                <Picker.Item label="Dubai" value="Du" />
                <Picker.Item label="India" value="In" />
              </Picker>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              handleUpdate();
            }}>
            <LinearGradient
              style={styles.login_btn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <Text style={{color: 'black'}}>Save</Text>
            </LinearGradient>
            {/* <Text style={styles.input_title}>LOGIN</Text> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  login_btn: {
    // backgroundColor: '#D4AF37',
    borderWidth: 1,
    // borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,

    color: 'black',
  },
});
