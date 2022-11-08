//import liraries

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import imagePath from '../../Constants/imagePath';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
const VirtualTour = ({route}) => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);
  const {music, setMusic} = route.params;

  useEffect(() => {
    music && music.stop();
  }, []);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <ImageBackground
      source={imagePath.background}
      resizeMode="cover"
      style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Image source={imagePath.logo} style={windowWidth>500?{height: 150, width: 150}:{height: 100, width: 100}} />
      </View>

      <View
        style={{
          borderColor: '#FFAD00',
          borderWidth: 1,
          borderRadius: 5,
          margin: 13,
          marginTop: 100,
        }}>
        <View style={{padding: 5}}>
          <YoutubePlayer
        
            height={windowWidth>500?500:280}
            play={true}
            videoId={'ZbsYZ1K7xKc'}
            onChangeState={onStateChange}
          />
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                width: '20%',
              }}
              onPress={() => navigation.navigate('Login')}>
              <LinearGradient
                style={{borderRadius: 20, marginTop: -30}}
                colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 3,
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Skip
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// define your styles
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  // linearGradient: {

  container: {
    flex: 1,
  },
});

//make this component available to the app
export default VirtualTour;
