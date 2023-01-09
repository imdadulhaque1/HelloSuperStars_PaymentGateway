import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp.js';
// import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp.js';

import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal.js';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration.js';

// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl.js';
import styles from '../MeetUp/Styles.js';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp';
import Video from '../../Components/VIDEO/Video';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration';

const LearningSession = ({ route, navigation }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const { data } = route.params;
  // console.log('data------', data);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <Video
          image={`${AppUrl.MediaBaseUrl + data?.learning_session?.banner}`}
          title={data.learning_session?.title}
          videoSrc={data.learning_session?.video}
        />
        <InformationComp data={data.learning_session} />
        <InstructionComp
          title="Learning Session Instruction"
          instruction={data.learning_session?.instruction}
        />
        <RegistrationComp
          post={data.learning_session}
          event_type="learningSession"
          eventId={data.learning_session?.id}
          modelName="LearningSessionRegistration"
          passChildData={setIsShowPaymentComp}
          setParentData={setParentData}
          fee={data.learning_session?.fee}
        />
        {/* {isShowPaymentComp ? <PaymentComp eventType="LearningSession" eventId={data.learning_session.id} modelName="learningSession" /> : <></>} */}
        {isShowPaymentComp ? (
          <RegisPaymentModal
            eventType="learningSession"
            eventId={data.learning_session?.id}
            modelName="learningSession"
            isShowPaymentComp={isShowPaymentComp}
            setIsShowPaymentComp={setIsShowPaymentComp}
            parentData={parentData}
            fee={data.learning_session?.fee}
            start_time={data.learning_session?.start_time}
            end_time={data.learning_session?.end_time}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningSession;
