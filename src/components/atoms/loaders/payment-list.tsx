import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import PaymentCardLoader from './payment-card-loader'
interface LoaderPropsType {
  style?: ViewStyle
}

const PaymentListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <PaymentCardLoader style={{ margin: 16, marginTop: 28 }} />
      <PaymentCardLoader style={{ margin: 16 }} />
      <PaymentCardLoader style={{ margin: 16 }} />
    </SafeAreaView>
  )
}
export default PaymentListLoader
