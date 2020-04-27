import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import initialPageConfig from '@pages/page-initial.config'
import ShopPage from './shop'
import PostDetailPage from './post-detail'
import BrandList from './brand-list'
// import CartPage from './cart'

const Stack = createStackNavigator()

function ShopStack() {
  return (
    <Stack.Navigator
      initialRouteName={initialPageConfig.shop}
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="MainShop" component={ShopPage} />
      <Stack.Screen name="PostDetail" component={PostDetailPage} />
      <Stack.Screen name="BrandList" component={BrandList} />
    </Stack.Navigator>
  )
}

export default ShopStack
