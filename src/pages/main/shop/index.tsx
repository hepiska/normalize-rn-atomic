import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import initialPageConfig from '@pages/page-initial.config'
import ShopPage from './shop';
import ProductList from './product-list';


const Stack = createStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator initialRouteName={initialPageConfig.shop} screenOptions={{
      cardStyle: {
        backgroundColor: 'white'
      }
    }} >
      <Stack.Screen name="MainShop" component={ShopPage} />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={ProductList.navigationOptions}
      />
    </Stack.Navigator>
  );
}

export default ShopStack;
