import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@utils/constants'
import CenterButton from '@components/atoms/tab-bar-center-button'
import initialPageConfig from '@pages/page-initial.config'
import ShopPage from './shop/index'
import DiscoverPage from './discover/index'
import NotificationPage from './notifications/index'
import CreatePage from './create/index'
import ProfilPage from './profile/index'

const Tab = createBottomTabNavigator()

class MainPages extends React.Component<any, any> {
  state = {}

  render() {
    return (
      <Tab.Navigator
        initialRouteName={initialPageConfig.main}
        tabBarOptions={{
          activeTintColor: colors.purple1,
          inactiveTintColor: colors.gray3,
        }}>
        <Tab.Screen
          name="Discover"
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Icon name="compass" color={color} size={16} />
            ),
          }}
          component={DiscoverPage}
        />
        <Tab.Screen
          name="Shop"
          component={ShopPage}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-bag" color={color} size={16} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePage}
          options={{
            tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => <CenterButton />,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationPage}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={16} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilPage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={16} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default MainPages
