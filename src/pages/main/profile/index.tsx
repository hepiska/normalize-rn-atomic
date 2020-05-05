import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfilPage from './profile'

const Stack = createStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
      <Stack.Screen name="MainProfile" component={ProfilPage} />
    </Stack.Navigator>
  )
}

export default ProfileStack
