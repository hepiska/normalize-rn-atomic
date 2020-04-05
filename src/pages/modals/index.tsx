import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartModal from '@components/organisms/cart-modal'
import ProductFilter from '@components/organisms/product-filter'
import FormLogin from '@src/components/molecules/form-login'
import FormRegister from '@src/components/molecules/form-register-basic-information'

const Stack = createStackNavigator()

function ModalStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="cardmodal" component={CartModal} />
      <Stack.Screen
        name="ProductFilter"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        component={ProductFilter}
      />
      <Stack.Screen
        name="LoginModal"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        component={FormLogin}
      />
      <Stack.Screen name="RegisterModal" component={FormRegister} />
    </Stack.Navigator>
  )
}

export default ModalStack
