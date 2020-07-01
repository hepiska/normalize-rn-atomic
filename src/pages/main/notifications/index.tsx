import React, { Component } from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import NotificationPage from './notifications'

const Stack = createStackNavigator()

function NotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainShop"
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="Notifications" component={NotificationPage} />
    </Stack.Navigator>
  )
}

export default NotificationStack
