import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePage from './create';

const Stack = createStackNavigator();

function CreateStack() {
  return (
    <Stack.Navigator initialRouteName="MainShop">
      <Stack.Screen name="MainCreate" component={CreatePage} />
    </Stack.Navigator>
  );
}

export default CreateStack;
