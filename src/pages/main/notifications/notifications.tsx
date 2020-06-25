import React, { useEffect } from 'react'
import { InteractionManager, Text, SafeAreaView } from 'react-native'

import NotificationTab from '@src/components/molecules/tab-menu-chip'
import NotificationUpdate from '@src/components/organisms/notification-update'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import notificationTransaction from '@src/components/organisms/notification-transaction'
import NotificationLoader from '@src/components/atoms/loaders/notification-update'

const Tab = createMaterialTopTabNavigator()

const NotificationPage = () => {
  const [finishAnimation, setFinishAnimation] = React.useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
    })
  }, [])

  if (!finishAnimation) {
    return <NotificationLoader style={{ margin: 16 }} />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={props => <NotificationTab {...props} />}>
        <Tab.Screen name="Update" component={NotificationUpdate} />
        <Tab.Screen name="Transaction" component={notificationTransaction} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default NotificationPage
