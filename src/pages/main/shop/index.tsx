import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import initialPageConfig from '@pages/page-initial.config'
import ShopPage from './shop'
import ProductDetail from './product-detail'
import ProductList from './product-list'
import CartModal from './cart-modal'

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
