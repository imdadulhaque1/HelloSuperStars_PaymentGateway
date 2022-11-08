import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import styles from './stylesActive';
import {BackHandler} from 'react-native';
import MenuNavigator from '../MenuNavigator';

const MenuActivities = ({
  menuActivitList,
  menuChange,
  setChildActivityEventType,
  setChildActivityEventList,
  setMenuChange,
  menuNavigator,
  setMenuNavigator,
  MenuBackRoute,
}) => {
  const navigation = useNavigation();

  const [check, setCheck] = React.useState(false);
  const [greetingActivities, setGreetingActivities] = useState(0);
  const filteredActivities = menuActivitList.greeting_activities.filter(
    item => {
      return item.type === 'greeting'
        ? item.greeting_registration.status > 2
          ? () => {
              item.greeting;
              setGreetingActivities(greetingActivities + 1);
            }
          : null
        : item;
    },
  );

  //============back handler==================
  return (
    <>
      <View
        style={{
          height: 1,
          backgroundColor: '#4B4B4B',
          alignSelf: 'stretch',
        }}
      />

      {/* Learning Sessions  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(
            menuActivitList?.learning_session_activities,
          );
          setChildActivityEventType('learningSession');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities2} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.learning_session_activities?.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Learning Sessions</Text>

                <Text style={styles.contentText2}>
                  {menuActivitList?.learning_session_activities?.length > 0
                    ? menuActivitList?.learning_session_activities?.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            {menuActivitList?.learning_session_activities?.length > 0 ? (
              <View style={{justifyContent: 'center'}}>
                {menuActivitList?.learning_session_activities[0]?.created_at ? (
                  <>
                    <Text style={styles.contentText2}>
                      {moment(
                        menuActivitList?.learning_session_activities[0]
                          ?.created_at
                          ? menuActivitList?.learning_session_activities[0]
                              ?.created_at
                          : null,
                      ).fromNow()}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* Live Chat  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.live_chat_activities);
          setChildActivityEventType('liveChat');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities3} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.live_chat_activities?.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Live Chat</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.live_chat_activities?.length > 0
                    ? menuActivitList?.live_chat_activities?.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.live_chat_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.live_chat_activities[0]?.created_at
                        ? menuActivitList?.live_chat_activities[0]?.created_at
                        : null,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>
      {/* Question & Answer  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.qna_activities);
          setChildActivityEventType('qna');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities3} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.qna_activities?.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Question & Answer</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.qna_activities?.length > 0
                    ? menuActivitList?.qna_activities?.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.qna_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.qna_activities[0]?.created_at
                        ? menuActivitList?.qna_activities[0]?.created_at
                        : null,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* Meetup Events  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.meetup_activities);
          setChildActivityEventType('meetup');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities5} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.meetup_activities.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Meetup Events</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.meetup_activities.length > 0
                    ? menuActivitList?.meetup_activities.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.meetup_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.meetup_activities[0]?.created_at,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* Greetings  */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.GREETINGS, {
            activeGreetings: menuActivitList?.greeting_activities,
          });
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities1} />
              <Text style={styles.NotifyText}>{filteredActivities.length}</Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Greetings</Text>
                <Text style={styles.contentText2}>
                  {filteredActivities.length > 0
                    ? filteredActivities.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}></View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* Upcoming Auditions  */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.LEARNING, {
            activeAudition: menuActivitList?.audition_activities,
          });

          // setMenuChange(1);
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities4} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.audition_activities.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Auditions</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.audition_activities.length > 0
                    ? menuActivitList?.audition_activities.length
                    : 'No'}{' '}
                  audition available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.contentText2}>
                {moment(
                  menuActivitList?.audition_activities[0]?.created_at,
                ).fromNow()}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* MarketPlace  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.marketplace_activities);
          setChildActivityEventType('marketplace');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities5} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.marketplace_activities.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>MarketPlace</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.marketplace_activities.length > 0
                    ? menuActivitList?.marketplace_activities.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.marketplace_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.marketplace_activities[0]?.created_at,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>
      {/* Auction  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.auction_activities);
          setChildActivityEventType('auction');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities5} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.auction_activities.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Auction</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.auction_activities.length > 0
                    ? menuActivitList?.auction_activities.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.auction_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.auction_activities[0]?.created_at,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>
      {/* Souvenir  */}
      <TouchableOpacity
        onPress={() => {
          setMenuChange(1);
          setChildActivityEventList(menuActivitList?.souviner_activities);
          setChildActivityEventType('souviner');
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities5} />
              <Text style={styles.NotifyText}>
                {menuActivitList?.souviner_activities.length}
              </Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Souvenir</Text>
                <Text style={styles.contentText2}>
                  {menuActivitList?.souviner_activities.length > 0
                    ? menuActivitList?.souviner_activities.length
                    : 'No'}{' '}
                  activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {menuActivitList?.souviner_activities[0]?.created_at ? (
                <>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.souviner_activities[0]?.created_at,
                    ).fromNow()}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>

      {/* live now  */}
      <TouchableOpacity
        onPress={() => {
          // setMenuChange(1);
        }}>
        <View style={styles.Touch}>
          <View style={styles.content}>
            <View style={styles.ContentItems}>
              <Text style={styles.Bar}></Text>
              <Image source={imagePath.activities1} />
              <Text style={styles.NotifyText}>15</Text>
              <View style={styles.ContentItems2}>
                <Text style={styles.contentText}>Live Now</Text>
                <Text style={styles.contentText2}>
                  No activities available now
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.contentText2}>4 min ago</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#4B4B4B',
            alignSelf: 'stretch',
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default MenuActivities;
