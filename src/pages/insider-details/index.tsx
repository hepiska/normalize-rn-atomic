import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import initialPageConfig from '@pages/page-initial.config'
import UserDetail from './user-detail'

const Stack = createStackNavigator()

function InsiderStack() {
  return (
    <Stack.Navigator
      // initialRouteName={initialPageConfig.shop}
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  )
}

export default InsiderStack
