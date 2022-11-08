import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

// import AppUrl from '../../RestApi/AppUrl';
import styles from './ActivitiesCardStyle';
import {BackHandler} from 'react-native';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import MenuNavigator from '../../../Screen/Menu/MenuNavigator';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import {AuthContext} from '../../../Constants/context';
import Toast from 'react-native-root-toast';

const ActivitiesCard = ({
  childActivityEventList,
  childActivityEventType,
  setMenuNavigator,
  setMenuChange,
  MenuBackRoute,
}) => {
  // console.log('menu data', childActivityEventList);
  // console.log('menu event type', childActivityEventType);
  const [roomId, setRoomId] = useState();
  const navigation = useNavigation();
  const {axiosConfig} = useContext(AuthContext);

  //============back handler==================
  function handleBackButtonClick() {
    setMenuNavigator(MenuNavigator.MENUACTIVITIES);
    setMenuChange(0);
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  //============back handler==================

  let title = '';
  switch (childActivityEventType) {
    case 'learningSession':
      title = 'Learning Session';
      break;
    case 'general':
      title = 'General';
      break;
    case 'souviner':
      title = 'Souvenir';
      break;
    case 'auction':
      title = 'Auction';
      break;
    case 'marketplace':
      title = 'Marketplace';
      break;
    case 'meetup':
      title = 'Meetup';
      break;
    case 'liveChat':
      title = 'Live Chat';
      break;
    case 'qna':
      title = 'Question & Answer';
      break;
  }

  // const width = Dimensions.get('window').width;
  const renderEventItem = ({item}) => {
    // console.log('market place', item.market_place);
    let event = {};
    let eventRegistration = {};
    let eventType = '';

    switch (childActivityEventType) {
      case 'learningSession':
        event = item.learning_session;
        eventType = 'learningSession';
        console.log(event);
        break;
      case 'general':
        event = item.general;
        break;
      case 'meetup':
        event = item.meetup;
        break;
      case 'liveChat':
        setRoomId(item.room_id);
        event = item.livechat;
        eventRegistration = item.livechat_registration;
        break;
      case 'qna':
        event = item.qna;
        eventRegistration = item.qna_registration;
        break;
      case 'marketplace':
        eventType = 'marketplace';
        event = item.market_place_order;
        break;
      case 'souviner':
        eventType = 'souvenir';
        event = item.souvenir_apply;
    }

    console.log('event data', event);
    let ActualEventDate = moment(
      event?.date ? event?.date : event?.event_date,
    ).format('YYYY-MM-DD');

    // console.log('ActualEventDate------------', ActualEventDate);
    let EndTime = '';
    let StartTime = '';
    if (childActivityEventType == 'liveChat') {
      EndTime = moment(
        '2022-01-20 ' + eventRegistration?.live_chat_end_time,
      ).format('HH:mm:ss');
      StartTime = moment(
        '2022-01-20 ' + eventRegistration?.live_chat_start_time,
      ).format('HH:mm:ss');
    } else if (childActivityEventType == 'qna') {
      EndTime = moment('2022-01-20 ' + eventRegistration?.qna_end_time).format(
        'HH:mm:ss',
      );
      StartTime = moment(
        '2022-01-20 ' + eventRegistration?.qna_start_time,
      ).format('HH:mm:ss');
    } else if (childActivityEventType == 'marketplace') {
    } else {
      EndTime = moment('2022-01-20 ' + event?.end_time).format('HH:mm:ss');
      StartTime = moment('2022-01-20 ' + event?.start_time).format('HH:mm:ss');
    }

    let EventDateWithEndTime = new Date(
      moment(ActualEventDate + ' ' + EndTime),
    );
    let EventDateWithStartTime = new Date(
      moment(ActualEventDate + ' ' + StartTime),
    );
    let CurrentDateWithTime = new Date();

    let days = parseInt(
      (EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60 * 24),
    );
    let hours = parseInt(
      ((EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60)) % 24,
    );
    let minutes = parseInt(
      (Math.abs(
        EventDateWithStartTime.getTime() - CurrentDateWithTime.getTime(),
      ) /
        (1000 * 60)) %
        60,
    );

    const handleJoinNow = () => {
      // console.log('jdshfgjs', event);

      if (childActivityEventType == 'liveChat') {
        navigation.navigate('VideoSdk', {
          meetingId: roomId,
          type: 'videoChat',
        });
      } else if (childActivityEventType == 'qna') {
        // alert('under devolpment');
        navigation.navigate('Message');
      } else if (childActivityEventType == 'meetup') {
        if (event.meetup_type == 'Offline') {
          alert('offline');
        } else {
          navigation.navigate('VideoSdk', {
            meetingId: event.event_link,
            type: 'meetup',
          });
        }
      } else if (childActivityEventType == 'learningSession') {
        navigation.navigate('VideoSdk', {
          meetingId: event.room_id,
          type: 'learningSession',
        });
      } else {
      }
    };

    //video upload
    const videoUpload = () => {
      console.log('i hit');
      return navigation.navigate(navigationStrings.LEARNINGSESSIONNAV, {
        event: event,
      });
    };
    const showDetails = () => {
      return navigation.navigate(navigationStrings.ORDERSTATUS, {
        event: event,
      });
    };
    const showSouvinorDetails = () => {
      return navigation.navigate(navigationStrings.SOUVENIRSTATUS, {
        event: event,
      });
    };

    const downlodeTicket = () => {
      Toast.show('Please wait downloading...', Toast.durations.SHORT);

      axios
        .get(AppUrl.DownlodMeetUpTicket + event.id, axiosConfig)
        .then(res => {
          return Linking.openURL(
            `${AppUrl.MediaBaseUrl}${res.data.certificateURL}`,
          );
        })
        .catch(err => {
          console.log(err);
          setError(err);
        });
    };

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.Container}>
          {event?.banner == null && eventType == '' ? (
            <>
              <Image
                source={imagePath.AuditionTitle}
                style={styles.ImgBanner}
              />
            </>
          ) : eventType == 'marketplace' ? ( //for marketplace image is return as image not banner
            <>
              <TouchableOpacity onPress={showDetails}>
                <Image
                  source={{
                    uri: `${AppUrl.MediaBaseUrl + event?.marketplace?.image}`,
                  }}
                  style={styles.ImgBanner}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={showDetails}>
                <Text style={styles.Title}>{event?.marketplace?.title}</Text>
              </TouchableOpacity>
            </>
          ) : eventType == 'souvenir' ? ( //for souvenir
            <>
              <TouchableOpacity onPress={showSouvinorDetails}>
                <Image
                  source={{
                    uri: `${AppUrl.MediaBaseUrl + event?.image}`,
                  }}
                  style={styles.ImgBanner}
                />
                <Text style={styles.Title}>{event?.souvenir?.title}</Text>
                <Text style={styles.Title}>{event?.souvenir?.status}</Text>
                <View style={styles.DateBox}>
                  <View style={styles.Join}>
                    <Text style={styles.JoinText}>
                      {event?.souvenir?.status == 0 ? (
                        <> Pending</>
                      ) : event?.souvenir?.status == 1 ? (
                        <> Please Pay</>
                      ) : event?.souvenir?.status == 2 ? (
                        <> Payment Complete</>
                      ) : event?.souvenir?.status == 3 ? (
                        <> Processing</>
                      ) : event?.souvenir?.status == 4 ? (
                        <> Product Received</>
                      ) : eevent?.souvenir?.status == 5 ? (
                        <> Processing</>
                      ) : event?.souvenir?.status == 6 ? (
                        <> Out for Delivery</>
                      ) : (
                        <> Delivered</>
                      )}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: `${AppUrl.MediaBaseUrl + event?.banner}`,
                }}
                style={styles.ImgBanner}
              />
              <Text style={styles.Title}>{event?.title}</Text>
            </>
          )}
          {/* <Image source={imagePath.BgLane1} style={styles.ImgBanner} /> */}

          <View style={styles.DateBox}>
            {eventType == 'marketplace' ? (
              <>
                {event?.marketplace.status == 0 ? (
                  <View style={styles.Join}>
                    <TouchableOpacity onPress={showDetails}>
                      <Text style={styles.JoinText}>Pending</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={styles.Join}>
                      <TouchableOpacity onPress={showDetails}>
                        <Text style={styles.JoinText}>Approved</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                {/* <Text style={{color: 'white'}}>I am date Box</Text> */}
                {EventDateWithEndTime.getTime() <
                CurrentDateWithTime.getTime() ? (
                  <>{/* completed  */}</>
                ) : (
                  <>
                    {EventDateWithStartTime.getTime() >
                    CurrentDateWithTime.getTime() ? (
                      <>
                        <View style={styles.DateColor}>
                          <Text style={styles.textDay}>{days}</Text>
                          <Text style={styles.textSec}>DAYS</Text>
                        </View>

                        <View style={styles.DateColor}>
                          <Text style={styles.textDay}>{hours}</Text>
                          <Text style={styles.textSec}>HOURS</Text>
                        </View>

                        <View style={styles.DateColor}>
                          <Text style={styles.textDay}>{minutes}</Text>
                          <Text style={styles.textSec}>MIN</Text>
                        </View>
                      </>
                    ) : (
                      <>
                        {EventDateWithStartTime.getTime() <
                          CurrentDateWithTime.getTime() ||
                        EventDateWithEndTime.getTime() >
                          CurrentDateWithTime.getTime() ? (
                          <>
                            <TouchableOpacity onPress={handleJoinNow}>
                              <Text style={styles.JoinNowColor}>Join Now</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}

                {event.assignment === 1 && event.status === 5 ? (
                  <View style={styles.Join}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('wait');
                        videoUpload();
                      }}>
                      <Text style={styles.JoinText}>Assignment</Text>
                    </TouchableOpacity>
                  </View>
                ) : event.assignment === 1 && event.status === 9 ? (
                  <View style={styles.Join}>
                    <TouchableOpacity
                      onPress={() => {
                        return navigation.navigate(
                          navigationStrings.RESULTLEARNINGSESSION,
                          {
                            event: event,
                          },
                        );
                      }}>
                      <Text style={styles.JoinText}>Show Result</Text>
                    </TouchableOpacity>
                  </View>
                ) : event.assignment === 1 &&
                  event.status > 1 &&
                  event.status < 5 ? (
                  <View style={styles.Join}>
                    <TouchableOpacity>
                      <Text style={styles.JoinText}>Assignment Pending</Text>
                    </TouchableOpacity>
                  </View>
                ) : EventDateWithStartTime.getTime() <
                    CurrentDateWithTime.getTime() ||
                  EventDateWithEndTime.getTime() >
                    CurrentDateWithTime.getTime() ? (
                  EventDateWithEndTime.getTime() <
                  CurrentDateWithTime.getTime() ? (
                    <View style={styles.Join}>
                      <TouchableOpacity>
                        <Text style={styles.JoinText}>Expired</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.Join}>
                      <TouchableOpacity>
                        <Text style={styles.JoinText}>Running...</Text>
                      </TouchableOpacity>
                    </View>
                  )
                ) : EventDateWithStartTime.getTime() >
                  CurrentDateWithTime.getTime() ? (
                  <View style={styles.Join}>
                    <TouchableOpacity>
                      <Text style={styles.JoinText}>Upcomming</Text>
                    </TouchableOpacity>
                  </View>
                ) : event.assignment === 1 && event.status === 2 ? (
                  <View style={styles.Join}>
                    <TouchableOpacity>
                      <Text style={styles.JoinText}>Waiting</Text>
                    </TouchableOpacity>
                  </View>
                ) : EventDateWithEndTime.getTime() <
                  CurrentDateWithTime.getTime() ? (
                  <View style={styles.Join}>
                    <TouchableOpacity>
                      <Text style={styles.JoinText}>Expired</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {EventDateWithStartTime.getTime() >
                    CurrentDateWithTime.getTime() ? (
                      <View style={styles.Join}>
                        {childActivityEventType == 'meetup' &&
                        event.meetup_type == 'Offline' ? (
                          <TouchableOpacity onPress={() => downlodeTicket()}>
                            <Text style={styles.JoinText}>Download Ticket</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity>
                            <Text style={styles.JoinText}>Upcomming</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <>
                        {EventDateWithStartTime.getTime() <
                          CurrentDateWithTime.getTime() ||
                        EventDateWithEndTime.getTime() >
                          CurrentDateWithTime.getTime() ? (
                          <View style={styles.Join}>
                            <TouchableOpacity onPress={handleJoinNow}>
                              <Text style={styles.JoinText}>Running</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* {EventDateWithEndTime.getTime() < CurrentDateWithTime.getTime() ? (
              <View style={styles.Join}>
                <TouchableOpacity>
                  <Text style={styles.JoinText}>Completed</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {EventDateWithStartTime.getTime() > CurrentDateWithTime.getTime() ? (
                  <></>
                ) : (
                  <>
                    {EventDateWithStartTime.getTime() < CurrentDateWithTime.getTime() || EventDateWithEndTime.getTime() > CurrentDateWithTime.getTime() ? (
                      <View style={styles.Join}>
                        <TouchableOpacity>
                          <Text style={styles.JoinText}>Running</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                      </>
                    )}
                  </>
                )}
              </>
            )} */}
              </>
            )}
          </View>

          {/* {EventDateWithEndTime.getTime() < CurrentDateWithTime.getTime() ? (
            <View style={styles.BannerCsText1}>
              <TouchableOpacity
                style={styles.STextA}>
                <Text style={styles.ext}>Completed </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {EventDateWithStartTime.getTime() > CurrentDateWithTime.getTime() ? (
                <View style={styles.BannerCsText}>
                  <View style={styles.SText}>
                    <Text style={styles.ext}>{days}</Text>
                    <Text style={styles.ext}>Days</Text>
                  </View>
                  <View style={styles.SText}>
                    <Text style={styles.ext}>{hours}</Text>
                    <Text style={styles.ext}>Hours</Text>
                  </View>
                  <View style={styles.SText}>
                    <Text style={styles.ext}>{minutes}</Text>
                    <Text style={styles.ext}>Min</Text>
                  </View>
                </View>
              ) : (
                <>
                  {EventDateWithStartTime.getTime() < CurrentDateWithTime.getTime() || EventDateWithEndTime.getTime() > CurrentDateWithTime.getTime() ? (
                    <View style={styles.BannerCsText1}>
                      <TouchableOpacity
                        style={styles.STextA}>
                        <Text style={styles.ext}>Running </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                    </>
                  )}
                </>
              )}
            </>
          )} */}

          <View style={styles.bannerTag}>
            <Image source={imagePath.BgTag} />
          </View>

          {item.days === '00' && item.hours === '00' ? (
            <View style={styles.Join}>
              <TouchableOpacity>
                <Text style={styles.JoinText}>Join Now</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.Header}>
        <Image source={imagePath.BgLane} style={styles.HeaderImg} />
        <Text style={styles.HeaderText}>{title}</Text>
      </View>

      <FlatGrid
        itemDimension={150}
        data={childActivityEventList}
        renderItem={renderEventItem}
      />
    </>
  );
};

export default ActivitiesCard;
