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
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="Main Profile" component={NotificationPage} />
    </Stack.Navigator>
  )
}

export default NotificationStack
