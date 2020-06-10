import React, { Component } from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import CreatePage from './create'

const Stack = createStackNavigator()

function CreateStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainShop"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="MainCreate" component={CreatePage} />
    </Stack.Navigator>
  )
}

export default CreateStack
