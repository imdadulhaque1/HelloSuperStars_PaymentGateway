import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UpcomingAuditionsCard from '../../../Components/GLOBAL/Card/PostCard/UpcomingAuditionsCard';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import CardSkeleton from '../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import GreetingRegistration from '../Greetings/GreetingRegistration/GreetingRegistration';
import Greetings from '../Greetings/Greetings';
import LiveChat from '../LiveChat/LiveChat';
import LiveChatDetails from '../LiveChat/LiveChatDetails';
import ShowCase from '../ShowCase/ShowCase';
import profileNavigatr from './profileNavigatr';
import styles from './Styles';

const StarProfile = ({route}) => {
  const [filterPost, setFilterPost] = useState(null);
  const {useInfo} = useContext(AuthContext);
  const {payload} = route.params;
  const navigation = useNavigation();
  const [profileNavigate, setProfileNavigate] = useState(profileNavigatr.POST);
  const [buffer, setBuffer] = useState(false);
  const [selectedLiveChat, setSelectedLiveChat] = useState(null);
  const [greetings, setGreetings] = useState({});
  const [greetingRegistration, setGreetingRegistration] = useState({});
  const {axiosConfig} = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [postPage, setPostPage] = useState(1);

  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  const [data, setData] = useState({
    star: payload,
  });

  useEffect(() => {
    getPostByStar();
  }, []);

  //get all psot base on stars
  const [allPost, setAllPost] = useState([]);
  const [auditionPosts, setAuditionPosts] = useState([]);
  const [postBuffer, setPostBuffer] = useState(false);
  const getPostByStar = () => {
    setPostBuffer(true);
    axios
      .get(AppUrl.SingleStarPost + data?.star?.id, axiosConfig)
      .then(res => {
        setPostBuffer(false);
        if (res.data.status === 200) {
          setAllPost(res.data.posts);
          console.log('post', res.data.posts);
          Toast.show('done', Toast.durations.SHORT);
          console.log('-----------------------------------');
          // console.log(allPost.filter(post => post.type == 'audition'));
          // console.log('-----------------auditions posts-------'.auditionPosts);
        }
      })
      .catch(err => {
        setPostBuffer(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setAuditionPosts(allPost.filter(post => post.type == 'audition'));
  }, [allPost]);

  // console here
  const greetingsCheck = () => {
    setBuffer(true);

    axios
      .get(AppUrl.GreetingStarStatus + data?.star?.id, axiosConfig)
      .then(res => {
        setBuffer(false);
        if (res.data.status === 200) {
          if (res.data.action) {
            setProfileNavigate(profileNavigatr.GREETINGS);
          } else {
            setProfileNavigate(profileNavigatr.GREETINGS);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);
  };
  const handleBackFunction = () => {
    return navigation.goBack();
  };

  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttonPress={modalOkBtn}
      />
      {buffer ? <LoaderComp /> : <></>}
      <HeaderComp />
      <ScrollView style={{backgroundColor: 'black'}}>
        <View style={styles.topContainer}>
          <View style={styles.banner}>
            <Image
              source={
                data.star.cover_photo == null
                  ? imagePath.coverNoImgae
                  : {
                      uri: AppUrl.MediaBaseUrl + data.star.cover_photo,

                      // uri: `https://backend.hellosuperstars.com/uploads/images/setting/cover.png`,
                    }
              }
              style={styles.bannerImage}
            />
          </View>

          <View style={styles.profileImageContainer}>
            <View
              style={{
                height: 70,
                width: 70,
                borderColor: 'gold',
                borderWidth: 1,
                borderRadius: 100,
              }}>
              <Image
                source={
                  data.star.image
                    ? {uri: AppUrl.MediaBaseUrl + data.star.image}
                    : {
                        uri: `https://backend.hellosuperstars.com/uploads/images/setting/user.png`,
                      }
                }
                style={styles.proImage}
              />
            </View>

            <View style={{marginLeft: 10}}>
              <Text style={styles.title}>
                {data.star?.first_name} {data.star?.last_name}
              </Text>
              <Text style={styles.active}>
                @{data.star?.first_name}
                {data.star.id}{' '}
              </Text>
            </View>
          </View>
          {/* fist navigator */}
          <View style={styles.postNavigator}>
            <TouchableOpacity
              style={{
                backgroundColor: '#282828',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 80,
                borderRadius: 10,
              }}
              onPress={() => setProfileNavigate(profileNavigatr.POST)}>
              <Text
                style={
                  profileNavigate == profileNavigatr.POST
                    ? styles.active
                    : {color: 'white'}
                }>
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#282828',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 80,
                borderRadius: 10,
                marginHorizontal: 5,
              }}>
              <Text style={{color: 'white'}}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#282828',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 80,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>Videos</Text>
            </TouchableOpacity>
          </View>

          {/* autoplay autoplayDelay={5} autoplayLoop */}
          <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop>
            {/* star show case */}
            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.STARSHOWCASE)}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={
                  profileNavigate === profileNavigatr.STARSHOWCASE
                    ? ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                    : ['#282828', '#282828']
                }>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={
                        profileNavigate === profileNavigatr.STARSHOWCASE
                          ? ['#ffffff', '#ffffff']
                          : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                      }
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.StarShowcase}
                        style={{height: 30, width: 30}}
                      />
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>StarShowCase</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* <TouchableOpacity>
              <LinearGradient
                style={{ height: 90, width: 90, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                colors={['#282828', '#282828']}>
                <View >
                  <View
                    style={styles.topView}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <MaterialCommunityIcons name='post' size={30} color='black' />
                    </LinearGradient>
                  </View>

                  <Text
                    style={styles.TextView}>
                    Post
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}

            {/* meet up */}

            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.MEETUP)}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#282828', '#282828']}>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.MeetUp}
                        style={{height: 30, width: 40}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Meetup</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* audition */}
            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.AUDITION)}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#282828', '#282828']}>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Auditions}
                        style={{height: 30, width: 40}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Audition</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Greetings */}
            <TouchableOpacity onPress={() => greetingsCheck()}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={
                  profileNavigate === profileNavigatr.GREETINGS
                    ? ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                    : ['#282828', '#282828']
                }>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={
                        profileNavigate === profileNavigatr.GREETINGS
                          ? ['#ffffff', '#ffffff']
                          : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                      }
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Greetings}
                        style={{height: 40, width: 40}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Greetings</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/*  Q & A */}
            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.QNA)}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={
                  profileNavigate === profileNavigatr.QNA
                    ? ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                    : ['#282828', '#282828']
                }>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={
                        profileNavigate === navigationStrings.QNA
                          ? ['#ffffff', '#ffffff']
                          : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                      }
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.QA}
                        style={{height: 30, width: 40}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Q & A</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* live chat */}
            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.LIVECHAT)}>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={
                  profileNavigate === profileNavigatr.LIVECHAT
                    ? ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                    : ['#282828', '#282828']
                }>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={
                        profileNavigate === profileNavigatr.LIVECHAT
                          ? ['#ffffff', '#ffffff']
                          : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
                      }
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.LiveChat}
                        style={{height: 30, width: 30}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Live Chat</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setProfileNavigate(profileNavigatr.LARNINGSESSION)
              }>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#282828', '#282828']}>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Learning}
                        style={{height: 30, width: 30}}
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Learning</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <LinearGradient
                style={{
                  height: 90,
                  width: 90,
                  margin: 3,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#282828', '#282828']}>
                <View>
                  <View style={styles.topView}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <MaterialCommunityIcons
                        name="account-group"
                        size={30}
                        color="black"
                      />
                      {/* <Icon name="gift" size={30} color="black" /> */}
                    </LinearGradient>
                  </View>

                  <Text style={styles.TextView}>Fangroup</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </SwiperFlatList>
        </View>
        <View style={styles.postContainer}>
          {profileNavigate == profileNavigatr.POST ? (
            <>
              {postBuffer ? (
                <CardSkeleton />
              ) : (
                <LiveChat
                  setBuffer={setBuffer}
                  setProfileNavigate={setProfileNavigate}
                  data={allPost}
                  setSelectedLiveChat={setSelectedLiveChat}
                  PostData={filterPost}
                  star={data.star}
                  filter="null"
                />
              )}
            </>
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.LIVECHAT ? (
            <LiveChat
              setBuffer={setBuffer}
              setProfileNavigate={setProfileNavigate}
              data={allPost}
              setSelectedLiveChat={setSelectedLiveChat}
              PostData={filterPost}
              star={data.star}
              filter="livechat"
            />
          ) : (
            <></>
          )}
          {/* meetup session */}
          {profileNavigate == profileNavigatr.MEETUP ? (
            <LiveChat
              setBuffer={setBuffer}
              setProfileNavigate={setProfileNavigate}
              data={allPost}
              setSelectedLiveChat={setSelectedLiveChat}
              PostData={filterPost}
              star={data.star}
              filter="meetup"
            />
          ) : (
            <></>
          )}
          {/* learning session  */}
          {profileNavigate == profileNavigatr.LARNINGSESSION ? (
            <LiveChat
              setBuffer={setBuffer}
              setProfileNavigate={setProfileNavigate}
              data={allPost}
              setSelectedLiveChat={setSelectedLiveChat}
              PostData={filterPost}
              star={data.star}
              filter="learningSession"
            />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.QNA ? (
            // <Qna QnaData={filterPost} star={data.star} />
            <LiveChat
              setBuffer={setBuffer}
              setProfileNavigate={setProfileNavigate}
              data={allPost}
              setSelectedLiveChat={setSelectedLiveChat}
              PostData={filterPost}
              star={data.star}
              filter="qna"
            />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.LIVECHATDETAILS ? (
            <LiveChatDetails data={selectedLiveChat} />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.AUDITION ? (
            <UpcomingAuditionsCard
              setProfileNavigate={setProfileNavigate}
              post={auditionPosts}
            />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.GREETINGS ? (
            <Greetings
              setProfileNavigate={setProfileNavigate}
              star_id={data.star.id}
            />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.GREETINGREGISTRATION ? (
            <GreetingRegistration
              parentGreetings={greetings}
              parentGreetingRegistration={greetingRegistration}
              setProfileNavigate={setProfileNavigate}
              star={data.star}
              setBuffer={setBuffer}
            />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.STARSHOWCASE ? (
            <ShowCase data={data?.star} />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default StarProfile;
