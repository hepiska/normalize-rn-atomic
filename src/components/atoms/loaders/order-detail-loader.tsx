import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'
import ItemCheckoutCardLoader from './item-checkout-card-loader'
import ShipmentDetailLoader from './shipment-detail-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const OrderDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <LineLoader style={{ marginTop: 24, width: 168, height: 24 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 24,
        }}>
        <LineLoader style={{ width: 80, height: 14 }} />
        <LineLoader style={{ width: 130, height: 14 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <LineLoader style={{ width: 92, height: 14 }} />
        <LineLoader style={{ width: 99, height: 14 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <LineLoader style={{ width: 45, height: 14 }} />
        <LineLoader style={{ width: 130, height: 14 }} />
      </View>
      <ItemCheckoutCardLoader style={{ marginTop: 40 }} />
      <ShipmentDetailLoader style={{ marginTop: 54 }} />

      <LineLoader style={{ width: 123, height: 14, marginTop: 24 }} />
      <LineLoader style={{ width: 293, height: 14, marginTop: 16 }} />
      <LineLoader style={{ width: 293, height: 14, marginTop: 8 }} />
      <LineLoader style={{ width: 94, height: 14, marginTop: 12 }} />
    </SafeAreaView>
  )
}
export default OrderDetailLoader
