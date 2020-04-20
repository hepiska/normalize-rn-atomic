import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserDetail from './user-detail'
import AddNewAddress from './add-address'
import AddNewAddressManual from './add-address-manual'
import InitialPage from '../page-initial.config'
import Checkout from './checkout'
import Test from './test'

const Stack = createStackNavigator()

function InsiderStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
      initialRouteName={InitialPage.screens}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen
        name="AddNewAddressManual"
        component={AddNewAddressManual}
      />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  )
}

export default InsiderStack
