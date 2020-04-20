import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import initialPageConfig from '@pages/page-initial.config'
import UserDetail from './user-detail'
import Checkout from './checkout'

const Stack = createStackNavigator()

function InsiderStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  )
}

export default InsiderStack
