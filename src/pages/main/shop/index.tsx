import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import initialPageConfig from '@pages/page-initial.config'
import CartModal from '@components/organisms/cart-modal'
import ShopPage from './shop'
import ProductDetail from './product-detail'
import ProductList from './product-list'
import CartPage from './cart'

const Stack = createStackNavigator()

function ShopStack() {
  return (
    <Stack.Navigator
      initialRouteName={initialPageConfig.shop}
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="MainShop" component={ShopPage} />
      <Stack.Screen name="Cart" component={CartPage} />
      <Stack.Screen name="CartModal" component={CartModal} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={ProductDetail.navigationOptions}
      />
      <Stack.Screen
        name="ProductList"
        options={ProductList.navigationOptions}
        component={ProductList}
      />
    </Stack.Navigator>
  )
}

export default ShopStack
