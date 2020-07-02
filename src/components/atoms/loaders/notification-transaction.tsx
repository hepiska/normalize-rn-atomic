import React from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
// import MyOrderLoader from './my-order'
import NotificationCardLoader from './notification-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const NotificationTransaction = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      {/* <MyOrderLoader style={{ margin: 16 }} /> */}
      <NotificationCardLoader style={{ margin: 16 }} />
    </SafeAreaView>
  )
}
export default NotificationTransaction
