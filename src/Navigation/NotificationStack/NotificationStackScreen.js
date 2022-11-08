import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import navigationStrings from '../../Constants/navigationStrings';
import Notification from '../../Screen/Notification/Notification';
import GreetingRegistration from '../../Screen/Notification/GreetingRegistration/GreetingRegistration';
const NotificationStack = createNativeStackNavigator();

export function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationStack.Screen name={navigationStrings.NOTIFICATION} component={Notification} />
      <NotificationStack.Screen name={navigationStrings.GREETINGREGISTRATION} component={GreetingRegistration} />
    </NotificationStack.Navigator>
  );
}
