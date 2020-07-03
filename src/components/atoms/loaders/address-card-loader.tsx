import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import CircleLoader from '@components/atoms/loaders/circle-loader'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
  disableTooltip?: boolean
}

const AddressCardLoader = (props: LoaderPropsType) => {
  return (
    <View style={{ ...props.style }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <LineLoader style={{ width: 156, height: 18 }} />
        {!props.disableTooltip && (
          <LineLoader style={{ width: 26, height: 26 }} />
        )}
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 16,
        }}>
        <View>
          <LineLoader style={{ width: 104, height: 14 }} />
          <LineLoader style={{ width: 293, height: 14, marginTop: 12 }} />
          <LineLoader style={{ width: 293, height: 14, marginTop: 8 }} />
          <LineLoader style={{ width: 94, height: 14, marginTop: 12 }} />
        </View>
        <LineLoader style={{ width: 16, height: 16 }} />
      </View>
    </View>
  )
}
export default AddressCardLoader
