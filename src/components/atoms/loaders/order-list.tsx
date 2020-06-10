import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import SearchFilterLoader from './search-filter-loader'
import OneColumnListLoader from './one-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const OrderListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <SearchFilterLoader style={{ marginTop: 16 }} />
      <OneColumnListLoader />
    </SafeAreaView>
  )
}
export default OrderListLoader
