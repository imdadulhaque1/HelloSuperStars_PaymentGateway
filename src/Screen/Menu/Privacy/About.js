import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';
import RenderHTML from 'react-native-render-html';
function CustomHeader(props) {
  return (
    <View style={{backgroundColor: '#343434', paddingVertical: 10}}>
      <TouchableOpacity
        style={{flexDirection: 'row', marginLeft: 10}}
        onPress={() => props.onPress()}>
        <Text style={{color: 'white'}}>
          <Icon name="arrow-back" size={25} />
        </Text>
        <Text style={{color: 'white', fontSize: 18, marginLeft: 4}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const About = ({navigation}) => {
  function handleBack() {
    return navigation.goBack();
  }
  const {axiosConfig} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');
  const {width} = useWindowDimensions();
  useEffect(() => {
    axios.get(AppUrl.aboutUs, axiosConfig).then(res => {
      setTitle(res.data?.data.title);
      setDetails(res.data?.data?.details);
    });
  }, []);
  useEffect(() => {
    setSource({
      html: `<div style='color: #959595'>${details}</div>`,
    });
  }, [details]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{margin: 10}}>
          <View>
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              onPress={() => {
                console.log(details);
              }}>
              {title}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#1F1F1F',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              height: 600,
              overflow: 'scroll',
            }}>
            <ScrollView>
              <RenderHTML contentWidth={width} source={source} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
