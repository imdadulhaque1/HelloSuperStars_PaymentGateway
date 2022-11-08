import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import HeaderComp from '../../HeaderComp';
import VideoUploadSuccessfulModal from '../../MODAL/VideoUploadSuccessfulModal';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import VideoPlayer from 'react-native-video-player';
import {androidCameraPermission} from '../../../../permission';
import ImagePicker from 'react-native-image-crop-picker';

const VideoUploadLearningSession = ({route}) => {
  const [assinmentNumebr, setAssinmentNumebr] = useState(0);
  const Navigation = useNavigation();
  const [uploadDone, setUploadDone] = useState(false);
  const [document, setDocument] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  const {event} = route.params;
  const [lastTime, setLastTime] = useState(true);
  const [updateData, setUpdateData] = useState({
    video: {
      learningSessionId: event.id,
      taskNumber: event.assignment,
      uri: '',
      type: '',
      name: '',
      data: '',
    },
  });

  const [progress, setProgress] = useState(false);
  const nowDate = new Date().getTime();

  const countDownDate = new Date(
    moment(event.assignment_reg_end_date).format('LL') + ' ' + '23:59:59',
  ).getTime();
  const TotalMillisecondRemaining = countDownDate - nowDate;
  const totalSecond = TotalMillisecondRemaining / 1000;

  // console.log(countDownDate - nowDate)
  // console.log('dfajdhakjdh', new Date())
  // console.log('dfajdhakjdh', new Date(event.assignment_reg_end_date))
  //chose video
  const chosePhoto = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
    clearInterval(progress);
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      const url = image.path;
      const type = image.mime;

      RNFS.readFile(url, 'base64').then(res => {
        setUpdateData({
          video: {
            learningSessionId: event.id,
            taskNumber: event.assignment,
            uri: url,
            type: type,
            name: (Math.random() + 1).toString(36).substring(7),
            data: res,
          },
        });
        console.log('image data', url, type, res);
      });
    });
  };

  const onGallery = () => {
    let options = {
      mediaType: 'video',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('Video Picker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        RNFS.readFile(response.assets[0].uri, 'base64')
          .then(res => {
            setUpdateData({
              video: {
                learningSessionId: event.id,
                taskNumber: event.assignment,
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
                data: res,
              },
            });
          })
          .catch(err => {
            console.log(err.message, err.code);
          });
      }
    });
  };

  const uploadVideo = () => {
    console.log('wait uploading');
    setProgress(true);
    axios
      .post(AppUrl.LearningSessionVideoUplaod, updateData, axiosConfig)
      .then(res => {
        console.log(res);

        setUpdateData({
          video: {
            learningSessionId: event.id,
            taskNumber: event.assignment,
            uri: '',
            type: '',
            name: '',
            data: '',
          },
        });
        if (res.status === 200) {
          setUploadDone(true);
          setAssinmentNumebr(res.data.assinmentNumber);
        } else if (res.data.status === 300) {
          setAssinmentNumebr(res.data.assinmentNumber);
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
        setProgress(false);
        // console.log('done', res)
      })
      .catch(err => {
        console.log(err);
        setUpdateData({
          video: {
            learningSessionId: event.id,
            taskNumber: event.assignment,
            uri: '',
            type: '',
            name: '',
            data: '',
          },
        });
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  // console.log('update video---', updateData)
  // setUploadDone(true);
  return (
    <View style={styles.container}>
      <HeaderComp />
      <View style={styles.bannerTitle}>
        <ImageBackground
          style={styles.background}
          source={{uri: `${AppUrl.MediaBaseUrl + event.banner}`}}>
          <View>
            <View
              style={{
                backgroundColor: '#ffffffa2',
                padding: 5,
                borderRadius: 10,
              }}>
              <CountDown
                until={totalSecond}
                // onFinish={() => setLastTime(false)}
                // onPress={() => alert('hello')}
                digitStyle={{
                  backgroundColor: 'black',
                  borderWidth: 2,
                  borderColor: '#FFAD00',
                  borderRadius: 20,
                }}
                digitTxtStyle={{color: '#FFAD00'}}
                timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
                size={20}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <Text
              style={{
                color: '#ddd',
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center',
                padding: 5,
              }}>
              {event.title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {totalSecond && lastTime > 0 ? (
        <>
          {updateData.video.uri != '' ? (
            <View
              style={{
                backgroundColor: '#343434',
                marginHorizontal: 10,
                borderRadius: 20,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#ffad00',
              }}>
              <VideoPlayer
                video={{uri: updateData.video.uri}}
                videoWidth={100}
                videoHeight={100}
                autoplay={false}
                pauseOnPress
                hideControlsOnStart
                resizeMode="contain"
              />
            </View>
          ) : (
            <></>
          )}
          <View>
            {Array(event.assignment)
              .fill(0)
              .map((x, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={
                    updateData.video.uri === '' ? chosePhoto : uploadVideo
                  }
                  style={styles.listParent}>
                  <View style={styles.onRight}>
                    {progress ? (
                      <Image
                        source={imagePath.loadingBuffering}
                        style={{height: 40, width: 40}}
                      />
                    ) : (
                      <Image source={imagePath.UploadVideoLearning} />
                    )}
                  </View>
                  <View style={styles.middleOne}>
                    <Text style={styles.participationText}>
                      {updateData.video.uri === ''
                        ? 'Chose Video'
                        : 'Upload Video'}{' '}
                      ({event.assignment - assinmentNumebr})
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Image source={imagePath.lazyDog} style={{height: 150, width: 150}} />
          <Text style={{color: '#FFAD00', fontSize: 20}}>
            Oops Time Expired !
          </Text>
        </View>
      )}

      <VideoUploadSuccessfulModal
        uploadDone={uploadDone}
        setUploadDone={setUploadDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#343434',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffad00',
    height: 70,
  },

  participationText: {
    color: '#FFAD00',
    fontSize: 18,
    marginHorizontal: 8,
  },
  // middleOne: {
  //   flex: 3,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // onRight: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
  roundImage: {
    flexDirection: 'row',
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roundOneSize: {
    // width: 200,
    // height: 100,
  },
});

export default VideoUploadLearningSession;
