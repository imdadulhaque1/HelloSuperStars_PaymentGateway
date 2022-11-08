import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
// import {LinearTextGradient} from 'react-native-text-gradient';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';

function Video({title, image, videoSrc = null}) {
  console.log('image path', image);

  return (
    <View style={styles.topCard}>
      <Text style={styles.fonts}>{title}</Text>

      <View
        style={{borderWidth: 0.3, borderColor: 'black', marginVertical: 10}}
      />

      {videoSrc !== null ? (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <VideoPlayer
            style={{height: 300}}
            video={{
              uri: `${AppUrl.MediaBaseUrl}${videoSrc}`,
            }}
            resizeMode={'stretch'}
            thumbnail={imagePath.greetingStar}
          />
        </View>
      ) : (
        <Image
          source={{uri: image}}
          style={{height: 150, resizeMode: 'cover'}}
        />
      )}
      {/* <VideoPlayer
        style={{ height: 300 }}
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        resizeMode={'stretch'}
        thumbnail={{
          uri: 'https://www.newagebd.com/files/records/news/202103/132871_199.jpg',
        }}
      /> */}
    </View>
  );
}

export default Video;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
  },
  fonts: {
    color: '#ffaa00',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  bannerRow: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 15,
  },
  imgRow: {
    marginVertical: 2,
    width: '90%',
    height: 180,
  },
  imgRow2: {
    marginVertical: 2,
    position: 'absolute',
    top: '45%',
    left: '50%',
  },
});
