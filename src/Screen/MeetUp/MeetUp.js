import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp';
import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration';

// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl';
import styles from './Styles';
import Video from '../../Components/VIDEO/Video';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration';

const MeetUp = ({route, navigation}) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const {data} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp />
      <ScrollView>
        <Video
          image={`${AppUrl.MediaBaseUrl + data.meetup.banner}`}
          title={data.meetup.title}
        />
        <InformationComp data={data.meetup} />
        <InstructionComp
          title="Meetup Instruction"
          instruction={data.meetup.instruction}
        />
        <RegistrationComp
          post={data.meetup}
          event_type="meetup"
          eventId={data.meetup.id}
          modelName="MeetupEventRegistration"
          passChildData={setIsShowPaymentComp}
          setParentData={setParentData}
        />
        {isShowPaymentComp ? (
          <RegisPaymentModal
            eventType={data.meetup.meetup_type + 'Meetup'}
            eventId={data.meetup.id}
            modelName="meetup"
            isShowPaymentComp={isShowPaymentComp}
            setIsShowPaymentComp={setIsShowPaymentComp}
            parentData={parentData}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeetUp;
