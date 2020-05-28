import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

const { width } = Dimensions.get('screen')

const TwoColumnListLoader = (props: any) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <ContentLoader viewBox="0 0 360 220" height={220} width={360}>
        <Rect x="16" y="0" rx="8" ry="8" width={width / 2 - 32} height="220" />
        <Rect
          x={width / 2}
          y="0"
          rx="8"
          ry="8"
          width={width / 2 - 32}
          height="220"
        />
      </ContentLoader>
      <ContentLoader
        viewBox="0 0 360 220"
        height={220}
        width={360}
        style={{ marginTop: 16 }}>
        <Rect x="16" y="0" rx="8" ry="8" width={width / 2 - 32} height="220" />
        <Rect
          x={width / 2}
          y="0"
          rx="8"
          ry="8"
          width={width / 2 - 32}
          height="220"
        />
      </ContentLoader>
      <ContentLoader
        viewBox="0 0 360 220"
        height={220}
        width={360}
        style={{ marginTop: 16 }}>
        <Rect x="16" y="0" rx="8" ry="8" width={width / 2 - 32} height="220" />
        <Rect
          x={width / 2}
          y="0"
          rx="8"
          ry="8"
          width={width / 2 - 32}
          height="220"
        />
      </ContentLoader>
    </View>
  )
}
export default TwoColumnListLoader
