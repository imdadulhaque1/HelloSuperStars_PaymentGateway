import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import HeaderComp from '../../Components/HeaderComp';
import NotificationRender from '../../NotificationHandeler/NotificationRender';
import AppUrl from '../../RestApi/AppUrl';
import HomeOnlineStars from './HomeOnlineStars/HomeOnlineStars';
import PostContainer from './HomePostContainer/PostContainer';
import styles from './styles';

function Home() {
  const navigation = useNavigation();
  const [postPage, setPostPage] = useState(1);


  useEffect(() => {
    console.log(postPage);
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel",
        channelDescription: "A channel for notification",
        playSound: true,
        soundName: 'sound.mp3',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`channel created ${created}`)
    )
  }
  const handleNotification = () => {

    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: "test-channel",
      title: "You clicked on ",
      message: "habijabi message here",
      bigText: " is one of the largest and most beatiful cities in ",
      color: "red",
      id: 1,
      playSound: true,
      soundName: 'sound.mp3',
      importance: 4,
      vibrate: true,
      vibration: 1000,
    });

    PushNotification.localNotificationSchedule({
      channelId: "test-channel",
      title: "Alarm",
      message: "You clicked on " + item.country + " 20 seconds ago",
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    });
  }

  return (
    <View style={styles.container}>
      {/* <LearningSessionNav /> */}
      {/* <VideoUploadLearningSession /> */}
      {/* <ResultLearningSession /> */}
      <SafeAreaView>
        {/*.............. custom header start .............. */}
        <HeaderComp />
        {/* <Button title='notify' onPress={handleNotification} /> */}


        {/* <Button title='Avatar' onPress={()=>navigation.navigate('ImgCrop')} /> */}
        {/* ..........custom header end....................  */}

        {/* ...........online active stars................... */}
        <NotificationRender />
        <HomeOnlineStars />
        {/* ...........online active end................... */}

        {/* ...........Home Page card start................... */}
        <View style={{ paddingBottom: 120 }}>
          <PostContainer
            path={AppUrl.AllPostWithPagination + 5 + `?page=${postPage}`}
            postPage={postPage}
            setPostPage={setPostPage}

          />
        </View>
        {/* ...........Home Page card end................... */}

        {/* <View>
            <Text style={styles.text}>Shohan Screen</Text>
            <Button onPress={HandelProfile} title="GO to Profile"></Button>
          </View> 
           */}
      </SafeAreaView>
    </View>
  );
}

export default Home;
