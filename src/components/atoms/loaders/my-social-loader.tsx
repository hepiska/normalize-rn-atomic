import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import LineLoader from '@components/atoms/loaders/line'
import { shimmerLoader } from '@utils/constants'
import CircleLoader from './cirle'

interface LoaderPropsType {
  style?: ViewStyle
  hasTitle?: boolean
}

const MySocialLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      onLayout={_setLayout}
      style={{
        ...props.style,
      }}>
      {layout && (
        <>
          <LineLoader style={{ width: 122, height: 20 }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 36,
              width: layout.width,
              marginTop: 48,
              marginBottom: 24,
            }}>
            <CircleLoader r={10} />
            <View style={{ marginLeft: 22 }}>
              <LineLoader style={{ width: 122, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 36,
              width: layout.width,
              marginVertical: 24,
            }}>
            <CircleLoader r={10} />
            <View style={{ marginLeft: 22 }}>
              <LineLoader style={{ width: 122, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
          </View>
        </>
      )}
    </View>
  )
}
export default MySocialLoader
