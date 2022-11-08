import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import imagePath from '../../../../../../Constants/imagePath';
import AppUrl from '../../../../../../RestApi/AppUrl';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';

const ProfilePhotos = ({userActivites}) => {
  console.log('user photo', userActivites);
  const filteredActivities = userActivites.filter(item => {
    return item.type === 'greeting'
      ? item.greeting_registration.status > 2
        ? item.greeting
        : null
      : item;
  });

  const renderProfileImage = ({item}) => {
    let postContent;
    switch (item.type) {
      case 'learningSession':
        postContent = item.learning_session;

        break;
      case 'marketplace':
        postContent = item.auction;

        break;
      case 'greeting':
        postContent = item.greeting;

        break;
      case 'general':
        postContent = item.general;

        break;
      case 'qna':
        postContent = item.qna;

        break;
      case 'meetup':
        postContent = item.meetup;
        break;
      case 'livechat':
        postContent = item.livechat;
        break;
      case 'livechat':
        postContent = item.livechat;
        break;
      case 'fangroup':
        postContent = item.fangroup;
        break;
    }

    return (
      <>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#ffa825', '#ffce48', '#ab6616']}
          style={{borderRadius: 10}}>
          <TouchableOpacity>
            <Image
              source={{uri: `${AppUrl.MediaBaseUrl + postContent?.banner}`}}
              style={{
                height: 115,
                width: 110,
                borderRadius: 10,
                borderWidth: 0,
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  };

  return (
    <>
      {filteredActivities.length > 0 ? (
        <View style={styles.container}>
          <FlatGrid
            spacing={15}
            itemDimension={100}
            data={filteredActivities}
            renderItem={renderProfileImage}
          />
        </View>
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
    </>
  );
};

export default ProfilePhotos;
