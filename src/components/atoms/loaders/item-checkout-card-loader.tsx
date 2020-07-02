import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface ItemCheckoutType {
  style?: ViewStyle
}

const ItemCheckoutCardLoader = (props: ItemCheckoutType) => {
  return (
    <View
      style={{
        ...props.style,
      }}>
      <LineLoader style={{ width: 150, height: 24 }} />
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <LineLoader style={{ width: 14, height: 14, borderRadius: 10 }} />
        <LineLoader style={{ width: 180, height: 14, marginLeft: 8 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <LineLoader style={{ width: 60, height: 80, borderRadius: 10 }} />
        <View style={{ marginLeft: 16 }}>
          <LineLoader style={{ width: 95, height: 12 }} />
          <LineLoader style={{ width: 202, height: 12, marginTop: 8 }} />
          <LineLoader style={{ width: 52, height: 12, marginTop: 8 }} />
          <LineLoader style={{ width: 63, height: 12, marginTop: 17 }} />
        </View>
      </View>
    </View>
  )
}
export default ItemCheckoutCardLoader
