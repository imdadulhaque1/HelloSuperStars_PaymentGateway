import React from 'react';
import VideoSdk from '../../VideoSdk';
import MessengerCom from '../Components/GLOBAL/MessengerCom/MessengerCom';
import navigationStrings from '../Constants/navigationStrings';
import ImgCrop from '../ImageCrop/ImgCrop';
import SearchPage from '../Screen/Home/SearchPage/SearchPage';
// import LiveChatSdk from '../LiveChatSdk/LiveChatSdk';
import Message from '../Screen/Message/Message';
import MessageStar from '../Screen/Message/MessageStar';
import QnaMessages from '../Screen/Message/QnaMessages';
import PromoView from '../Screen/PromoSection/PromoView';
import ChatWithStar from '../Screen/StarProfile/Greetings/ChatWithStar/ChatWithStar';
import Greetings from '../Screen/StarProfile/Greetings/Greetings';
import GreetingsHome from '../Screen/StarProfile/Greetings/GreetingsHome/GreetingsHome';
import PaymentInfo from '../Screen/StarProfile/Greetings/PaymentInfo/PaymentInfo';
import ShujoyPay from '../Screen/TakePayment/ShujoyPay';
import TabRoutes from './TabRoutes';

const MainStack = Stack => {
  return (
    <>
      <Stack.Screen name="Tabs" component={TabRoutes} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="MessageStar" component={MessageStar} />

      <Stack.Screen name="QnaMessages" component={QnaMessages} />

      <Stack.Screen name="Messenger" component={MessengerCom} />
      <Stack.Screen name="Greetings" component={Greetings} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
      <Stack.Screen name="GreetingsHome" component={GreetingsHome} />
      <Stack.Screen name="ChatWithStar" component={ChatWithStar} />
      <Stack.Screen name={navigationStrings.PROMOSHOW} component={PromoView} />
      <Stack.Screen name={'VideoSdk'} component={VideoSdk} />
      {/* <Stack.Screen name={'LiveChatSdk'} component={LiveChatSdk} /> */}
      <Stack.Screen name={'ImgCrop'} component={ImgCrop} />
      <Stack.Screen name={'SearchPage'} component={SearchPage} />
      <Stack.Screen name={navigationStrings.SHURJOPAY} component={ShujoyPay} />

    </>
  );
};

export default MainStack;
