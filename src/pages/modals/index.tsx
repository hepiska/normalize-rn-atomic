import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartModal from '@components/organisms/cart-modal'
// import ProductFilter from '@components/organisms/product-filter'
// import initialPageConfig from '@pages/page-initial.config'
import FormLogin from '@src/components/molecules/form-login'
import FormRegister from '@src/components/molecules/form-register-basic-information'
import ConfirmationModal from './confirmation'
import LikeListModal from '@pages/modals/like-list'
import ProductSortBottomSheet from './product-sort'
import ProductFilter from './product-filter'
import initialPageConfig from '@pages/page-initial.config'
import PostMoreModal from './post-more'
import GlobalSearchProductFilter from './global-search-product-filter'
import Register from './register'

import ShareModal from '@pages/modals/share'

const Stack = createStackNavigator()

function ModalStack() {
  return (
    <Stack.Navigator
      mode="modal"
      initialRouteName={initialPageConfig.modal}
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="CartModal" component={CartModal} />
      <Stack.Screen
        name="ProductFilter"
        options={{
          animationEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={ProductFilter}
      />
      <Stack.Screen
        name="GlobalSearchProductFilter"
        options={{
          animationEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={GlobalSearchProductFilter}
      />
      <Stack.Screen
        name="ProductSort"
        options={{
          animationEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={ProductSortBottomSheet}
      />
      <Stack.Screen
        name="Share"
        options={{
          animationEnabled: false,

          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={ShareModal}
      />
      <Stack.Screen
        name="PostMore"
        options={{
          animationEnabled: false,

          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={PostMoreModal}
      />
      <Stack.Screen
        name="LikeList"
        options={{
          animationEnabled: false,

          cardStyle: { backgroundColor: 'transparent' },
        }}
        component={LikeListModal}
      />
      <Stack.Screen
        name="LoginModal"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        component={FormLogin}
      />
      <Stack.Screen name="RegisterModal" component={Register} />
      <Stack.Screen
        name="ConfirmationModal"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        component={ConfirmationModal}
      />
    </Stack.Navigator>
  )
}

export default ModalStack
