import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartModal from '@components/organisms/cart-modal'
import ProductFilter from '@components/organisms/product-filter'
import initialPageConfig from '@pages/page-initial.config'

import ShareModal from '@pages/modals/share'

const Stack = createStackNavigator()

function ModalStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName={initialPageConfig.modals}
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
        name="Share"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        component={ShareModal}
      />
    </Stack.Navigator>
  )
}

export default ModalStack
