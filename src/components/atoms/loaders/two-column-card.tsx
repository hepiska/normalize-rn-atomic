import React from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const TwoColumnListLoader = (props: LoaderPropsType) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}>
      <ContentLoader viewBox="0 0 360 248" height={260} width={360}>
        <Rect x="0" y="0" rx="8" ry="8" width={360 / 2 - 24} height="180" />
        <Rect x="0" y="188" rx="8" ry="8" width={360 / 2 - 24} height="20" />
        <Rect x="0" y="216" rx="8" ry="8" width={360 / 2 - 24} height="20" />
        <Rect
          x={360 / 2 + 16}
          y="0"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="180"
        />
        <Rect
          x={360 / 2 + 16}
          y="188"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="20"
        />
        <Rect
          x={360 / 2 + 16}
          y="216"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="20"
        />
      </ContentLoader>
      <ContentLoader viewBox="0 0 360 248" height={260} width={360}>
        <Rect x="0" y="0" rx="8" ry="8" width={360 / 2 - 24} height="180" />
        <Rect x="0" y="188" rx="8" ry="8" width={360 / 2 - 24} height="20" />
        <Rect x="0" y="216" rx="8" ry="8" width={360 / 2 - 24} height="20" />
        <Rect
          x={360 / 2 + 16}
          y="0"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="180"
        />
        <Rect
          x={360 / 2 + 16}
          y="188"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="20"
        />
        <Rect
          x={360 / 2 + 16}
          y="216"
          rx="8"
          ry="8"
          width={360 / 2 - 24}
          height="20"
        />
      </ContentLoader>
    </View>
  )
}
export default TwoColumnListLoader
