import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserDetail from './user-detail'
import Checkout from './checkout'
import ChooseCourier from './choose-courier'
import ChooseAddress from './choose-address'
import AddNewAddress from './add-address'
import AddNewAddressManual from './add-address-manual'
import InitialPage from '../page-initial.config'
import Test from './test'
import PaymentMethod from './payment-method'
import PaymentDetails from './payment-details'

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
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="ChooseCourier" component={ChooseCourier} />
      <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen
        name="AddNewAddressManual"
        component={AddNewAddressManual}
      />
    </Stack.Navigator>
  )
}

export default InsiderStack
