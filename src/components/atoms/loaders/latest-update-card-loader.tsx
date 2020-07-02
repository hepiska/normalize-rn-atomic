import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'
import { Instagram } from 'react-content-loader/native'

interface LoaderPropsType {
  style?: ViewStyle
}

const LatestUpdateCardLoader = (props: LoaderPropsType) => {
  return (
    <View style={{ ...props.style }}>
      <LineLoader style={{ width: 135, height: 20 }} />
      <Instagram />
    </View>
  )
}
export default LatestUpdateCardLoader
