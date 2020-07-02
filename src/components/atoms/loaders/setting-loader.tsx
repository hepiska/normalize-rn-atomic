import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
}

const SettingLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <View
        style={{
          ...props.style,
        }}>
        <LineLoader style={{ width: 122, height: 14, marginTop: 24 }} />
        <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
        <LineLoader style={{ width: 249, height: 14, marginTop: 48 }} />
        <LineLoader style={{ width: 249, height: 14, marginTop: 48 }} />
        <LineLoader style={{ width: 249, height: 14, marginTop: 48 }} />
      </View>
    </SafeAreaView>
  )
}
export default SettingLoader
