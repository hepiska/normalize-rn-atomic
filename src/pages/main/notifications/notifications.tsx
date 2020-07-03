import React, { useEffect } from 'react'
import { InteractionManager, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotificationTab from '@src/components/molecules/tab-menu-chip'
import NotificationUpdate from '@src/components/organisms/notification-update'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import notificationTransaction from '@src/components/organisms/notification-transaction'
import ProfileEmptyState from '@components/molecules/profile-empty-state'

import NotificationLoader from '@src/components/atoms/loaders/notification-update'

const Tab = createMaterialTopTabNavigator()

const NotificationPage = props => {
  const [finishAnimation, setFinishAnimation] = React.useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
      if (!props.isAuth) {
        props.navigation.navigate('modals', { screen: 'LoginModal' })
      }
    })
  }, [props.isAuth])

  if (!finishAnimation) {
    return <NotificationLoader style={{ margin: 16 }} />
  }
  if (!props.isAuth) {
    return (
      <ProfileEmptyState
        title="Ops you are not authorized"
        subtitle="Please register or login to access this page"
        onPress={() =>
          props.navigation.navigate('modals', { screen: 'LoginModal' })
        }
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator tabBar={props => <NotificationTab {...props} />}>
        <Tab.Screen name="Update" component={NotificationUpdate} />
        <Tab.Screen name="Transaction" component={notificationTransaction} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({ isAuth: state.auth.isAuth })

export default connect(mapStateToProps, null)(NotificationPage)
