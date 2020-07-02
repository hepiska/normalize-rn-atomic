import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, Dimensions } from 'react-native'
import OrderCardLoader from './order-card-loader'
import PillsLoader from './pills'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}
const { width } = Dimensions.get('screen')

const OrderListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <LineLoader
        style={{
          marginTop: 12,
          width: width - Number(props.style.marginHorizontal) * 2,
          height: 33,
        }}
      />
      <PillsLoader style={{ marginVertical: 12 }} />
      <OrderCardLoader style={{ margin: 16 }} />
      <OrderCardLoader style={{ margin: 16 }} />
      <OrderCardLoader style={{ margin: 16 }} />
    </SafeAreaView>
  )
}
export default OrderListLoader
