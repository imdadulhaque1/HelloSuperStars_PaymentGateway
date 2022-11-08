import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HeaderComp from '../../../Components/HeaderComp';
import AppealRequestModal from '../../../Components/MODAL/AppealRequestModal';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import RoundTopBanner from '../Round1/RoundTopBanner';
import AfterRound5 from './AfterRound5';
import styles from './styles';
import RequestPending from '../../../Components/AUDITION/UpcomingAudition/RequestPending';
import CustomModal from '../../../Components/MODAL/CustomModal';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';

const Result = ({route}) => {
  const {
    roundName,
    auditionTitle,
    auditionImage,
    remainingTime,
    auditionId,
    roundId,
    roundInformation,
  } = route.params;
  console.log('params', route.params);
  const Navigation = useNavigation();
  const [show, setShow] = useState(false);
  const {axiosConfig} = useContext(AuthContext);

  const [customShow, setCustomShow] = useState(false);

  const [appeal, setAppeal] = useState(false);
  const [apply, setApply] = useState(false);
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
  }

  const [videoList, setVideoList] = React.useState([]);
  const [appealVideoList, setAppealVideoList] = useState([]);
  const [markTracking, setMarkTracking] = useState({});
  const [appealMarkTracking, setAppealMarkTracking] = useState({});

  const [isAppealedForThisRound, setIsAppealedForThisRound] = useState(false);
  const [appealedRegistration, setAppealedRegistration] = useState(null);

  const [videoType, setVideoType] = useState('general');
  const downloadCertificate = () => {
    console.log('download');
    console.log(
      `${AppUrl.downloadAuditionCertificate}${auditionId}/${roundId}`,
    );
    console.log(roundId);
    axios
      .get(
        `${AppUrl.downloadAuditionCertificate}${auditionId}/${roundId}`,
        axiosConfig,
      )
      // axios
      //   .get(
      //     `http://192.168.0.103/HelloSuperStarsBackend-2/public/api/user/audition/getAuditionCertificate/3/17`,
      //     axiosConfig,
      //   )
      .then(res => {
        console.log(res.data);
        Linking.openURL(`${AppUrl.MediaBaseUrl}${res.data.certificateURL}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchUploadedVideo = () => {
    axios
      .get(
        AppUrl.getUploadedRoundVideo + auditionId + '/' + roundId,
        axiosConfig,
      )
      .then(res => {
        if (res.data.status === 200) {
          setVideoList(res?.data?.videos);
          setAppealVideoList(res?.data?.appeal_videos);
          setMarkTracking(res?.data?.auditionRoundMarkTracking);
          setAppealMarkTracking(res?.data?.appealAuditionRoundMarkTracking);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUploadedVideo();
    checkIsAppealForRound();
  }, [auditionId, roundId]);

  useEffect(() => {
    fetchUploadedVideo();
    checkIsAppealForRound();
  }, [isAppealedForThisRound]);

  const checkIsAppealForRound = () => {
    axios
      .get(AppUrl.isAppealRound + auditionId + '/' + roundId, axiosConfig)
      .then(res => {
        if (res?.data?.status === 200) {
          console.log('----____checkAppealAPI____-------', res?.data);
          setIsAppealedForThisRound(res?.data?.isAppealedForThisRound);
          if (res?.data?.isAppealedForThisRound == true) {
            setAppealedRegistration(res?.data?.appealedRegistration);
          }
        }
      });
  };

  const handleAppealedVideo = () => {
    if (appealedRegistration?.id) {
      setVideoType('appeal');
    }
  };

  const handleGeneralVideo = () => {
    setVideoType('general');
  };
  if (show) {
    const data = {
      audition_id: auditionId,
      round_info_id: roundId,
    };
    axios.post(AppUrl.AppealRegistration, data, axiosConfig).then(res => {
      console.log(res.data);
      console.log('res?.data=========', res?.data);
      if (res?.data?.status === 200) {
      } else if (res?.data?.status === 422) {
        setErrorList(res?.data?.validation_errors);
      } else {
      }
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {/* Home Page 39 */}

      <HeaderComp backFunc={() => Navigation.goBack()} />

      <ScrollView>
        <RoundTopBanner
          title={`AUDITION ${roundName} ROUND ENDING TIME`}
          RoundName={roundName}
          auditionTitle={auditionTitle}
          auditionImage={auditionImage}
          remainingTime={remainingTime}
        />
        {isEmptyObject(markTracking) === 0 ? (
          <View style={styles.topCard}>
            <Text style={{color: 'white', fontSize: 22, margin: 50}}>
              Result is not published yet
            </Text>
          </View>
        ) : (
          <>
            {roundInformation.round_type === 1 ? (
              <AfterRound5
                RoundName={roundName}
                auditionId={auditionId}
                roundId={roundId}
              />
            ) : (
              <View style={styles.topCard}>
                <Text
                  style={styles.fonts}
                  onPress={() => {
                    console.log('-----------------');
                    console.log(markTracking);
                    console.log(videoList);
                    console.log(appealVideoList);
                    console.log(appealMarkTracking);

                    console.log('------------------');

                    console.log('Appealed Register', appealedRegistration);
                  }}>
                  Your Uploaded videos
                </Text>
                <UnderlineImage />

                <View style={styles.VideoT}>
                  {videoList.map((item, index) => {
                    return (
                      <>
                        <View style={{width: '30%'}}>
                          <VideoPlayer
                            video={{
                              uri: `${AppUrl.MediaBaseUrl + item.video}`,
                            }}
                            videoWidth={100}
                            videoHeight={100}
                            autoplay={false}
                            pauseOnPress
                            hideControlsOnStart
                            resizeMode="stretch"
                            thumbnail={imagePath.AuditionTitleBanner}
                          />
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
            )}
            {isAppealedForThisRound && markTracking.wining_status === 0 && (
              <View style={{marginTop: 20}}>
                <View style={styles.topCard}>
                  <Text
                    style={styles.fonts}
                    onPress={() => {
                      console.log('-----------------');
                      console.log(markTracking);
                      console.log(videoList);
                      console.log(appealVideoList);
                      console.log(appealMarkTracking);

                      console.log('------------------');

                      console.log('Appealed Register', appealedRegistration);
                    }}>
                    Your Appeal uploaded videos
                  </Text>
                  <UnderlineImage />
                  <View style={styles.VideoT}>
                    {appealVideoList.map((item, index) => {
                      return (
                        <>
                          <View style={{width: '30%'}}>
                            <VideoPlayer
                              video={{
                                uri: `${AppUrl.MediaBaseUrl + item.video}`,
                              }}
                              videoWidth={100}
                              videoHeight={100}
                              autoplay={false}
                              pauseOnPress
                              hideControlsOnStart
                              resizeMode="stretch"
                              thumbnail={imagePath.AuditionTitleBanner}
                            />
                          </View>
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
            )}

            {/* Not Qualified */}
            {!appeal ? (
              <>
                <View style={styles.Card}>
                  <View>
                    <Image
                      source={imagePath.Rectangle4}
                      style={styles.AudiImgCard}
                    />
                  </View>
                  <View>
                    {isAppealedForThisRound &&
                    markTracking.wining_status === 0 ? (
                      <Text style={styles.Input}>Your appeal marks</Text>
                    ) : (
                      <Text style={styles.Input}>Your total marks</Text>
                    )}
                  </View>

                  {appealMarkTracking?.avg_mark >= 0 ? (
                    <Text style={styles.markText}>
                      {appealMarkTracking?.avg_mark}
                    </Text>
                  ) : markTracking === null ? (
                    <Text style={styles.markText}>--</Text>
                  ) : (
                    <Text style={styles.markText}>
                      {markTracking?.avg_mark}
                    </Text>
                  )}

                  <View style={{}}>
                    {roundName === 8 ? (
                      <View
                        style={{
                          backgroundColor: '#000000',

                          justifyContent: 'center',
                          alignItems: 'center',

                          fontWeight: 'bold',
                          textAlign: 'center',
                          width: 110,

                          paddingHorizontal: 5,
                          paddingVertical: 6,
                          fontSize: 13,
                          height: 40,
                        }}>
                        {markTracking?.wining_status === 1 ? (
                          <Text style={{color: '#E19A04'}}>
                            Congratulation!!!
                          </Text>
                        ) : (
                          <Text style={{color: '#E19A04'}}>Sorry!!!</Text>
                        )}
                      </View>
                    ) : markTracking?.wining_status === 1 ||
                      appealMarkTracking?.wining_status === 1 ? (
                      <Text style={styles.winingCard}>
                        You are Qualified {'\n'}for the next Round
                      </Text>
                    ) : (
                      <Text style={styles.Input2}>
                        You are not Qualified {'\n'}for the next Round
                      </Text>
                    )}
                  </View>
                </View>
                {/* Not able to appeal  */}

                {roundName === 8 ? null : appealedRegistration !== null ? (
                  appealMarkTracking?.wining_status === 1 ||
                  markTracking?.wining_status === 1 ? (
                    <TouchableOpacity
                      style={{backgroundColor: '#000000'}}
                      onPress={
                        roundInformation.round_type === 1
                          ? () => setCustomShow(true)
                          : () => setShow(true)
                      }>
                      <LinearGradient
                        colors={['#FFAD00', '#E19A04', '#FACF75']}
                        style={styles.CardA}>
                        <Text style={styles.CardTex}>
                          {roundInformation.round_type === 1
                            ? markTracking?.wining_status === 1 ||
                              appealMarkTracking?.wining_status === 1
                              ? 'Apply for Certificate'
                              : 'abc'
                            : appealMarkTracking?.wining_status === 1
                            ? 'Request for certificate'
                            : appealMarkTracking === null &&
                              'Result is not published yet'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Already appealed in this round
                    </Text>
                  )
                ) : (
                  // Able to appeal

                  roundInformation.appeal === 1 && (
                    <TouchableOpacity
                      style={{backgroundColor: '#000000'}}
                      onPress={
                        roundInformation.round_type === 1
                          ? () => setCustomShow(true)
                          : markTracking?.wining_status === 1 ||
                            appealMarkTracking?.wining_status === 1
                          ? () => {
                              downloadCertificate();
                            }
                          : () => setShow(true)
                      }>
                      <LinearGradient
                        colors={['#FFAD00', '#E19A04', '#FACF75']}
                        style={styles.CardA}>
                        <Text style={styles.CardTex}>
                          {markTracking?.wining_status === 1
                            ? 'Download Your Certificate'
                            : markTracking === null
                            ? 'Result is not published yet'
                            : 'Appeal Request'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                )}
              </>
            ) : (
              <>
                <View style={styles.Card}>
                  <View>
                    <Image
                      source={imagePath.Rectangle4}
                      style={styles.AudiImgCard}
                    />
                  </View>
                  <View>
                    <Text style={styles.Input}>Your total marks</Text>
                  </View>
                  <View>
                    <TextInput
                      type=""
                      name=""
                      style={styles.Input1}
                      placeholder="80"
                      placeholderTextColor={'white'}
                    />
                  </View>

                  <View>
                    <Text style={styles.Input3}>
                      You are Qualified {'\n'}for the next Round
                    </Text>
                  </View>
                </View>

                {apply ? (
                  <>
                    {/* Home Page 41 */}
                    <TouchableOpacity>
                      <LinearGradient
                        colors={['#79EC66', '#79EC66', '#79EC66']}
                        style={styles.CardA}>
                        <Text style={styles.CardTex}>
                          Certificate Request Pending
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    {/* Home Page 41 End */}

                    {/* Home Page 40 End*/}

                    {/* Home Page 42 */}
                    <View style={styles.LastZ}>
                      <Text style={styles.TextG}>
                        Download Your Certificate{' '}
                      </Text>
                      <Text>
                        <TouchableOpacity>
                          <LinearGradient
                            colors={['#79EC66', '#79EC66', '#79EC66']}
                            style={styles.CardA}>
                            <Text style={styles.CardTexG}>Download</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </Text>
                    </View>
                    {/* Home Page 42 */}
                  </>
                ) : (
                  <RequestPending apply={apply} setApply={setApply} />
                )}
              </>
            )}
            {/* {markTracking === null ? (
              <LinearGradient
                colors={['#FFAD00', '#E19A04', '#FACF75']}
                style={styles.CardA}>
                <Text style={styles.CardTex}>Result is not published yet</Text>
              </LinearGradient>
            ) : (
              appealedRegistration !== null &&
              markTracking.wining_status === 0 && (
                <LinearGradient
                  colors={['#FFAD00', '#E19A04', '#FACF75']}
                  style={styles.CardA}>
                  <Text style={styles.CardTex}>
                    Appeal Result is not published yet
                  </Text>
                </LinearGradient>
              )
            )}

            {markTracking !== null && markTracking?.wining_status === 1 && (
              <TouchableOpacity
                style={{backgroundColor: '#000000'}}
                onPress={() => setShow(true)}>
                <LinearGradient
                  colors={['#FFAD00', '#E19A04', '#FACF75']}
                  style={styles.CardA}>
                  <Text style={styles.CardTex}>Apply for Certificate</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            {markTracking !== null && markTracking?.wining_status === 0 && (
              <TouchableOpacity
                style={{backgroundColor: '#000000'}}
                onPress={() => setShow(true)}>
                <LinearGradient
                  colors={['#FFAD00', '#E19A04', '#FACF75']}
                  style={styles.CardA}>
                  <Text style={styles.CardTex}>Appeal Request</Text>
                </LinearGradient>
              </TouchableOpacity>
            )} */}

            <AppealRequestModal
              appeal={appeal}
              setAppeal={setAppeal}
              show={show}
              setShow={setShow}
            />

            {/*========= this modal for after round 5=========  */}
            <CustomModal
              setAppeal={setAppeal}
              customShow={customShow}
              setCustomShow={setCustomShow}
              RoundName={roundName}
            />

            {/* <Button title='yo button' onPress={()=>Navigation.navigate(navigationStrings.VOTING)} /> */}

            {/* Home Page 39  end*/}
          </>
        )}
        {/* ====================here i props round names and give conditions======================== */}

        {/* Home Page 40 */}
      </ScrollView>
    </View>
  );
};

export default Result;
