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
import axios from 'axios';
import {AuthContext} from '../../../Constants/context';
import LinearGradient from 'react-native-linear-gradient';
import AppUrl from '../../../RestApi/AppUrl';
const EducationInfo = ({navigation}) => {
  const [degree, setDegree] = useState('');
  const [institute, setInstitute] = useState('');
  const [subject, setSubject] = useState('');
  const {axiosConfig} = useContext(AuthContext);
  const handleUpdate = () => {
    const data = {
      degree,
      institute,
      subject,
    };
    console.log(data);
    console.log(AppUrl.userEducationalData);
    axios
      .post(AppUrl.userEducationalDataSubmit, data, axiosConfig)
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
      .get(AppUrl.userEducationalData, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setDegree(res.data?.educationList?.grade);
          setInstitute(res.data?.educationList?.institute);
          setSubject(res.data?.educationList?.subject);
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
            EDUCATIONAL INFORMATION
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
                name="school"
                size={20}
                color="#ffaa00"
                style={{position: 'absolute', left: 9}}
              />
              <Picker
                style={{color: '#fff', marginLeft: 10}}
                selectedValue={degree}
                onValueChange={(itemValue, itemIndex) => setDegree(itemValue)}>
                <Picker.Item label="Select One" value="" />
                <Picker.Item label="JSC" value="JSC" />
                <Picker.Item label="SSC" value="SSC" />
                <Picker.Item label="SSC" value="SSC" />
                <Picker.Item label="HSC" value="HSC" />
                <Picker.Item label="Honours/Degree" value="Honours/Degree" />
                <Picker.Item label="PHD" value="PHD" />
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
              <Ionicons name="home" size={20} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Institute'}
                placeholderTextColor="gray"
                onChangeText={setInstitute}
                value={institute}
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
              <Icon name="book" size={20} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Subject'}
                placeholderTextColor="gray"
                onChangeText={setSubject}
                value={subject}
              />
            </View>
          </View>

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

export default EducationInfo;

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
