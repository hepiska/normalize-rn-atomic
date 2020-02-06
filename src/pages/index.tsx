import * as React from 'react';
import MainPage from './main';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
let hasNotch = DeviceInfo.hasNotch();
const Stack = createStackNavigator();

const Pages = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={MainPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Pages;
