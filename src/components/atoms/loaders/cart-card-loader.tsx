import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface ItemCheckoutType {
  style?: ViewStyle
}

const CartCardLoader = (props: ItemCheckoutType) => {
  return (
    <View
      style={{
        ...props.style,
      }}>
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <LineLoader style={{ width: 14, height: 14, borderRadius: 10 }} />
        <LineLoader style={{ width: 195, height: 14, marginLeft: 16 }} />
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <LineLoader style={{ width: 14, height: 14, borderRadius: 10 }} />
          <LineLoader
            style={{ width: 78, height: 104, borderRadius: 10, marginLeft: 16 }}
          />
        </View>
        <View style={{ marginLeft: 16 }}>
          <LineLoader style={{ width: 111, height: 14 }} />
          <LineLoader style={{ width: 202, height: 14, marginTop: 8 }} />
          <LineLoader style={{ width: 74, height: 14, marginTop: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
              alignContent: 'center',
            }}>
            <LineLoader style={{ width: 80, height: 24 }} />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <LineLoader style={{ width: 20, height: 20 }} />
              <LineLoader style={{ width: 20, height: 20, marginLeft: 16 }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default CartCardLoader
