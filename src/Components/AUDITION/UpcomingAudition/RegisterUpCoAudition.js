import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import VideoPlayer from 'react-native-video-player';
// import Video from '../Video/Video';
import InstructionComp from '../../GLOBAL/InstructionComp/InstructionComp';
// import CostComp from '../../GLOBAL/CostComp/CostComp';
// import RegistrationComp from '../../QnA/RegistrationComp/Registration';
import PaymentComp from '../../GLOBAL/PaymentComp/PaymentComp';
import RegistrationComp from '../../QnA/RegistrationComp/Registration';

import { ScrollView } from 'react-native-gesture-handler';
import AppUrl from '../../../RestApi/AppUrl';
import CostComp from '../../GLOBAL/CostComp/CostComp';
import HeaderComp from '../../HeaderComp';
import { useNavigation } from '@react-navigation/native';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';
import axios from 'axios';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
// import CostComp from '../../GLOBAL/CostComp/CostComp';
const RegisterUpCoAudition = ({ route }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const { data } = route.params;
  const slug = data?.audition?.slug;
  const [postContent, setPostContent] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState({});
  const { axiosConfig } = useContext(AuthContext);

  useEffect(() => {
    console.log(slug);
    axios.get(AppUrl.auditionDetails + `${slug}`, axiosConfig).then(res => {
      if (res.data.status === 200) {
        setPostContent(res.data.audition);
        console.log('-----------');
        console.log(res.data.audition);
        console.log('-----------');
      }
    });

    axios
      .get(AppUrl.auditionRegisterCheck + `${slug}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          console.log(res.data.participant);
          setIsAlreadyRegistered(res.data.participant);
        }
      });
  }, []);

  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: '#282828' }}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.topCard}>
        <VideoPlayer
          style={styles.BannerCardImg}
          video={{
            uri: `${AppUrl.MediaBaseUrl}${postContent?.video}`,
          }}
          videoWidth={120}
          videoHeight={70}
          thumbnail={{
            uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
          }}
          blurRadius={10}
        />
      </View>
      <InstructionComp
        title={`${postContent?.title}`}
        instruction={`${postContent?.instruction}`}
      />
      <CostComp title={'With'} stars={postContent?.assigned_judges} />
      <CostComp title={'Cost for the greeting:'} amount={postContent?.fees} />
      {isAlreadyRegistered ? (
        <View
          style={{
            borderColor: '#FFAD00',
            borderWidth: 1,
            padding: 1,
            borderRadius: 3,
          }}>
          <ImageBackground
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              height: 350,
              backgroundColor: 'coral',
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 20,
            }}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{ marginTop: 30 }}>
              {/* <Image source={imagePath.sorry} style={{  justifyContent:'center', width: 300, height: 150 }} /> */}
              <Text
                style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                Already Registered
              </Text>
              {/* <Text style={{ color: 'white', textAlign: 'center' }}>
            {description}
          </Text> */}
            </View>
          </ImageBackground>
        </View>
      ) : (
        <>
          <RegistrationComp
            post={data.learning_session}
            event_type="auditionRegistration"
            eventId={postContent?.id}
            modelName="auditionRegistration"
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
          />
          {/* {isShowPaymentComp ? <PaymentComp eventType="LearningSession" eventId={data.learning_session.id} modelName="learningSession" /> : <></>} */}
          {isShowPaymentComp ? (
            <RegisPaymentModal
              eventType="auditionRegistration"
              eventId={postContent.id}
              modelName="audition"
              isShowPaymentComp={isShowPaymentComp}
              setIsShowPaymentComp={setIsShowPaymentComp}
              parentData={parentData}
              fee={postContent?.fees}
            />
          ) : (
            <></>
          )}

          {/* <RegistrationComp
            post={postContent}
            fee={postContent?.fees}
            event_type="audition"
            // event_id={data.event_id}
            modelName="auditionRegistration"
            isShowPaymentComp={isShowPaymentComp}
            parentData={parentData}
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
          /> */}
        </>
      )}

      {/* <PaymentComp /> */}
    </ScrollView>
  );
};

export default RegisterUpCoAudition;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
  },
});
