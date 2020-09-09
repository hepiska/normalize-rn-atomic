import React, { Component } from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import ProfilPage from './profile-new'

const Stack = createStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainProfile"
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="MainProfile" component={ProfilPage} />
    </Stack.Navigator>
  )
}

export default ProfileStack
