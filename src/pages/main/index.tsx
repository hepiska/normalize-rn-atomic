import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic';
import NabarBottom from '@components/molecules/navbar-bottom';
import { Switch, Route } from 'react-router-native';
import HomePage from './home/home';
import ShopPage from './shop/index';
import DiscoverPage from './discover/index';
import NotificationPage from './notifications/index';
import CreatePage from './create/index';
import ProfilPage from './profile/index';
import SettingsPage from './settings';

const Tab = createBottomTabNavigator();

class MainPages extends React.Component<any, any> {
  state = {};

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Discover" component={DiscoverPage} />
        <Tab.Screen name="Shop" component={ShopPage} />
        <Tab.Screen name="Create" component={CreatePage} />
        <Tab.Screen name="Notifications" component={NotificationPage} />
        <Tab.Screen name="Profile" component={ProfilPage} />
      </Tab.Navigator>
    );
  }
}

export default MainPages;
