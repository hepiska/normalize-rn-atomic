import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from '@assets/fonts/custom-icons'
import { colors } from '@utils/constants'
import CenterButton from '@components/atoms/tab-bar-center-button'
import { CommonActions } from '@react-navigation/native'
import initialPageConfig from '@pages/page-initial.config'
import { sendSeenData } from '@modules/seen-history/action'
import ShopPage from './shop/index'
import DiscoverPage from './discover/index'
import NotificationPage from './notifications/index'
import CreatePage from './create/index'
import ProfilPage from './profile/index'
import MyTabBar from '@components/molecules/navigation-bottom'

const Tab = createBottomTabNavigator()

const styles = StyleSheet.create({
  icon: {
    marginBottom: 4,
  },
})
class MainPages extends React.Component<any, any> {
  state = {}

  componentDidUpdate(prevProps) {
    if (this.props.isAuth !== prevProps.isAuth && this.props.isAuth) {
      sendSeenData(this.props.seenProduct)
    }

    if (
      this.props.maintenance_mode !== prevProps.maintenance_mode &&
      this.props.maintenance_mode
    ) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Screens', params: { screen: 'Maintenance' } }],
        }),
      )
    }
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName={initialPageConfig.main}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Discover"
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Icon
                style={styles.icon}
                name={'discover'}
                color={color}
                size={24}
              />
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
              <Icon style={styles.icon} name={'shop'} color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePage}
          options={{
            tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => (
              <Icon
                style={styles.icon}
                name={'create'}
                color={colors.black100}
                size={24}
              />
            ),
            // tabBarIcon: ({ color, size }) => <CenterButton />,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationPage}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <Icon style={styles.icon} name="bell" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilPage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon
                style={styles.icon}
                name="profile"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

const mapStateToProps = state => ({
  maintenance_mode: state.appConfig.maintenance_mode,
  seenProduct: state.seenHistory.products,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(MainPages)
