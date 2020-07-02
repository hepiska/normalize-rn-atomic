import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import CircleLoader from '@components/atoms/loaders/cirle'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProfileLoader = (props: LoaderPropsType) => {
  return (
    <View style={{ alignItems: 'center', ...props.style }}>
      <CircleLoader r={50} />
      <LineLoader style={{ marginTop: 16, height: 28, width: 240 }} />
      <LineLoader style={{ marginTop: 16, height: 14, width: 135 }} />
      <View style={{ flexDirection: 'row' }}>
        <LineLoader style={{ marginTop: 24, height: 36, width: 176 }} />
        <LineLoader
          style={{ marginTop: 24, marginLeft: 8, height: 36, width: 36 }}
        />
        <LineLoader
          style={{ marginTop: 24, marginLeft: 8, height: 36, width: 36 }}
        />
      </View>

      <LineLoader style={{ marginTop: 16, height: 14, width: 328 }} />
      <LineLoader style={{ marginTop: 8, height: 14, width: 228 }} />
    </View>
  )
}
export default ProfileLoader
