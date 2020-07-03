import React from 'react'
import { View, ViewStyle } from 'react-native'

import LineLoader from '@components/atoms/loaders/line'
import CircleLoader from '@components/atoms/loaders/circle-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const ConnectionCardLoader = (props: LoaderPropsType) => {
  return (
    <View style={{ alignItems: 'center', ...props.style }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <LineLoader style={{ width: 117, height: 20 }} />
        <LineLoader style={{ width: 38, height: 20 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginTop: 24,
        }}>
        <CircleLoader r={20} />
        <CircleLoader r={20} />
        <CircleLoader r={20} />
        <CircleLoader r={20} />
        <CircleLoader r={20} />
        <CircleLoader r={20} />
        <CircleLoader r={20} />
      </View>
    </View>
  )
}
export default ConnectionCardLoader
