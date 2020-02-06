import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopPage from './shop';

const Stack = createStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator initialRouteName="MainShop">
      <Stack.Screen name="MainShop" component={ShopPage} />
    </Stack.Navigator>
  );
}

export default ShopStack;
