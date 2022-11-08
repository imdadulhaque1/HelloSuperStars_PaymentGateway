import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import noImage from '../../../../../../Assets/Images/no-image.png';
import navigationStrings from '../../../../../../Constants/navigationStrings';
import AppUrl from '../../../../../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../../../../../Constants/imagePath';

const ProfileVideos = ({userActivites}) => {
  const Navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);
  console.log(userActivites);

  useEffect(() => {
    setVideoList(
      userActivites.filter(
        item =>
          item.type === 'greeting' && item.greeting_registration.status > 2,
      ),
    );
  }, []);

  const renderVideo = (data, index) => {
    return (
      <View key={index} style={{margin: 7}}>
        <View
          style={{
            height: 120,
            width: '100%',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'gold',
            overflow: 'hidden',
          }}>
          <VideoPlayer
            video={{
              uri: `${
                AppUrl.MediaBaseUrl + data.item.greeting_registration.video
              }`,
            }}
            pauseOnPress
            fullScreenOnLongPress
            videoWidth={1600}
            videoHeight={1000}
            thumbnail={{
              uri: `${AppUrl.MediaBaseUrl + data.item?.greeting.banner}`,
            }}
            blurRadius={1}
          />
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              justifyContent: 'center',
            }}></View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{margin: 7}}>
        {videoList.length > 0 ? (
          <FlatGrid
            itemDimension={160}
            data={videoList}
            renderItem={renderVideo}
          />
        ) : (
          <View style={{height: 300, justifyContent: 'center'}}>
            <View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
      </View>
    </>
  );
};

export default ProfileVideos;

const styles = StyleSheet.create({});

// {userActivites && userActivites?.map((item, index) =>
//   <>
//     <View key={index} style={{ margin: 7 }}>
//       {item.type === "greeting" && item?.greeting_registration?.status > 2 && item?.greeting_registration?.video != null ?
//         <>
//           <TouchableOpacity style={{ height: 180, width: 120, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: 'gold' }} onPress={() => handleVideoPress(item)}>
//             <Image source={{ uri: 'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg' }} style={{ width: 120, height: 180 }} />
//           </TouchableOpacity>
//         </> :
//         <>
//           {/* <Text style={{ color: 'white' }}>
//             Hello {item?.type}
//           </Text> */}
//           <TouchableOpacity style={{ height: 180, width: 120, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: 'gold' }} onPress={() => Navigation.navigate(navigationStrings.GALLARYIDEOVIEW)}>
//             <Image source={{ uri: 'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg' }} style={{ width: 120, height: 180 }} />
//           </TouchableOpacity>
//         </>
//       }
//     </View>
//   </>
// )}
