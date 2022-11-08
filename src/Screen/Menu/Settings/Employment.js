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
const Employment = ({navigation}) => {
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const {axiosConfig} = useContext(AuthContext);
  const handleUpdate = () => {
    const data = {
      salary,
      position,
      company,
    };
    console.log(data);
    console.log(AppUrl.userEducationalData);
    axios
      .post(AppUrl.userEmploymentDataSubmit, data, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    axios
      .get(AppUrl.userEmploymentData, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setSalary(res.data?.employmentList?.salary);
          setPosition(res.data?.employmentList?.occupation);
          setCompany(res.data?.employmentList?.company);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <View style={{margin: 10}}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            EMPLOYMENT INFORMATION
          </Text>
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
              <Ionicons
                name="man-sharp"
                size={20}
                color="#ffaa00"
                style={{position: 'absolute', left: 9}}
              />
              <Picker
                style={{color: '#fff', marginLeft: 10}}
                selectedValue={position}
                onValueChange={(itemValue, itemIndex) =>
                  setPosition(itemValue)
                }>
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Businessman" value="Businessman" />
                <Picker.Item label="Engineer" value="Engineer" />
                <Picker.Item label="Doctor" value="Doctor" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </TouchableOpacity>

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
              <Icon name="building" size={18} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Company Name'}
                placeholderTextColor="gray"
                onChangeText={setCompany}
                value={company}
              />
            </View>
          </View>

          <TouchableOpacity style={{padding: 20}} onPress={handleUpdate}>
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

export default Employment;

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
