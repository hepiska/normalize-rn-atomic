import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartModal from '@components/organisms/cart-modal'
import ProductFilter from '@components/organisms/product-filter'

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
    </Stack.Navigator>
  )
}

export default ModalStack
