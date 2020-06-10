import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import OneColumnListLoader from './one-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const PaymentListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <OneColumnListLoader />
    </SafeAreaView>
  )
}
export default PaymentListLoader
