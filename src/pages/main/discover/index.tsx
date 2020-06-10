import React, { Component } from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import DiscoverPage from './discover'

const Stack = createStackNavigator()

function DiscoverStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainShop"
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      <Stack.Screen name="MainDiscover" component={DiscoverPage} />
    </Stack.Navigator>
  )
}

export default DiscoverStack
