import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import styles from './GreetingStyle';
import CountDown from 'react-native-countdown-component';
import {FlatGrid} from 'react-native-super-grid';
import moment from 'moment';
import HeaderComp from '../../Components/HeaderComp';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import TitleHeader from '../../Components/TitleHeader';
const Greeting = ({route}) => {
  const {activeGreetings} = route.params;
  console.log(activeGreetings);
  const filteredActivities = activeGreetings.filter(item => {
    return item?.type === 'greeting'
      ? item?.greeting_registration?.status > 2
        ? item?.greeting
        : null
      : item;
  });
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  const vedioRef = useRef(null);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  let halfWidth = windowWidth / 2 - 20;
  const [videoUrl, setVideoUrl] = useState();

  const [Play, setPlay] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);
  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  const loadVideo = () => {
    setVideoLoad(true);
  };

  return (
    <>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.container}>
        <SafeAreaView style={styles.ActiveNew}>
          <TitleHeader title={'Greetings'} />
          {/* <View style={{position: 'relative'}}>
            <Image source={imagePath.BgLane} style={styles.LaneBg} />
            <Text
              style={styles.LaneText}
              onPress={console.log(activeGreetings)}>
              Greetings
            </Text>
          </View> */}

          <View style={{height: '100%'}}>
            {activeGreetings.length > 0 ? (
              <FlatGrid
                itemDimension={200}
                data={filteredActivities}
                renderItem={({item}) => {
                  return (
                    <View style={{}}>
                      {/* <text style={{color: 'white'}}>Hi</text> */}

                      <View style={{height: 270, width: 400}}>
                        <Video
                          source={{
                            uri: `${AppUrl.MediaBaseUrl}${item?.greeting_registration?.video}`,
                          }}
                          ref={vedioRef} // Store reference
                          onBuffer={onBuffer}
                          onError={onError} // Callback when video cannot be loaded
                          // resizeMode={windowWidth < 600 ? 'cover' : 'contain'}
                          onLoad={loadVideo}
                          onEnd={() => console.log('end')}
                          // controls
                          pictureInPicture
                          // paused={currentIndex != index || Play ? true : false}
                          paused={false}
                          repeat={true}
                          controls={true}
                          height={270}
                          resizeMode={'stretch'}
                          style={{
                            height: 270,
                            width: 400,
                            position: 'absolute',
                          }}
                        />
                      </View>

                      {/* <VideoPlayer
                        style={styles.BannerCardImg}
                        video={{
                          uri: `${AppUrl.MediaBaseUrl}${item?.greeting_registration?.video}`,
                        }}
                        videoWidth={1600}
                        videoHeight={900}
                        thumbnail={{
                          uri: `${AppUrl.MediaBaseUrl}${
                            item?.greeting?.banner !== null
                              ? item?.greeting?.banner
                              : imagePath.greetingStar
                          }`,
                        }}
                        blurRadius={10}
                      /> */}
                    </View>
                  );
                }}
              />
            ) : (
              <View style={{height: 300, justifyContent: 'center'}}>
                <View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
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

            {/*================== Card  Start here==================  */}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Greeting;
