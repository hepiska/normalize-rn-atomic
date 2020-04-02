import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfilPage from './profile'

const Stack = createStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="MainShop">
      <Stack.Screen name="Main Profile" component={ProfilPage} />
    </Stack.Navigator>
  )
}

export default ProfileStack
