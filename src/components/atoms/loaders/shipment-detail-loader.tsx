import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface ItemCheckoutType {
  style?: ViewStyle
}

const ShipmentDetailLoader = (props: ItemCheckoutType) => {
  return (
    <View
      style={{
        ...props.style,
      }}>
      <LineLoader style={{ width: 150, height: 24 }} />
      <LineLoader style={{ width: 144, height: 16, marginTop: 24 }} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          height: 54,
          alignItems: 'center',
        }}>
        <LineLoader style={{ width: 20, height: 20, borderRadius: 20 }} />
        <LineLoader
          style={{ width: 54, height: 54, borderRadius: 8, marginLeft: 16 }}
        />
        <View style={{ marginLeft: 16 }}>
          <LineLoader style={{ width: 123, height: 14 }} />
          <LineLoader style={{ width: 194, height: 12, marginTop: 8 }} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          height: 54,
          alignItems: 'center',
        }}>
        <LineLoader style={{ width: 20, height: 20, borderRadius: 20 }} />
        <LineLoader
          style={{ width: 54, height: 54, borderRadius: 8, marginLeft: 16 }}
        />
        <View style={{ marginLeft: 16 }}>
          <LineLoader style={{ width: 123, height: 14 }} />
          <LineLoader style={{ width: 194, height: 12, marginTop: 8 }} />
        </View>
      </View>
    </View>
  )
}
export default ShipmentDetailLoader
