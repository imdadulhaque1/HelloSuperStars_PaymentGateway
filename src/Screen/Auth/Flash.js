//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import imagePath from '../../Constants/imagePath';
// create a component
const Flash = () => {
  const [clickTour, setClickTour] = useState(true);
  const navigation = useNavigation();
  const [music, setMusic] = React.useState(null);
  const [seconds, setSeconds] = React.useState(5);
  const [check, setCheck] = React.useState(false);
  React.useEffect(() => {
    retrieveData();
    play();
  }, []);
  useEffect(
    () => {
      timer();
      if (seconds === 'redirect') {
        redirectLoginPage();
      }
    },
    check ? [] : null,
  );

  function timer() {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('redirect');
    }
  }

  const retrieveData = async () => {
    // play()
    try {
      const value = await AsyncStorage.getItem('auth_token');
      if (value !== null) {
        navigation.navigate('Login');
      }
    } catch (error) {}
  };

  const redirectLoginPage = () => {
    // clearInterval(redirectToLogin)
    navigation.navigate('Login');
  };

  // auto redirect to login
  // const redirectToLogin = setTimeout(redirectLoginPage, 5000)

  const handelTour = () => {
    setCheck(true);
    // clearInterval(redirectToLogin)

    navigation.navigate('virtualTour', {
      music,
      setMusic,
    });
  };

  const play = () => {
    let summer = new Sound('summer.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('error', err);
        return;
      }
      summer.play(success => {
        console.log('music playing', success);
      });
    });
    console.log('success,', summer);
    setMusic(summer);
  };

  return (
    <ImageBackground
      source={imagePath.background}
      resizeMode="cover"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Button title='play' onPress={()=>{play()}}  />
   <Button title='pause' onPress={()=>{music.pause()}}  />
   <Button title='play' onPress={()=>{music.play()}}  />
   <Button title='stop' onPress={()=>{music.stop()}}  /> */}
      <View>
        {/* <Text style={{color:'white'}}>{seconds}</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            // animation="zoomIn"
            // easing="ease-out"
            // iterationCount="infinite"

            source={imagePath.logo}
            style={{height: 200, width: 200}}
          />
        </TouchableOpacity>

        <Animatable.View
          style={styles.virtual_tour_btn}
          // animation="pulse"
          // easing="ease-out"
          // iterationCount="infinite"
        >
          <TouchableOpacity
            style={styles.virtualContainer}
            onPress={handelTour}>
            <LinearGradient
              style={styles.virtualBtn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MatarialIcon name="play-circle-fill" color="black" size={20} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text style={styles.virtual_tour_btn_text}>Virtual Tour</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

// define your styles
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  // linearGradient: {

  virtual_tour_btn: {
    // backgroundColor: '#ffaa00',
    alignItems: 'center',

    marginTop: 40,
  },
  virtual_tour_btn_text: {
    color: 'black',
    // fontWeight: 'bold',
    paddingVertical: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  virtualContainer: {
    width: '80%',
  },
  virtualBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default Flash;
