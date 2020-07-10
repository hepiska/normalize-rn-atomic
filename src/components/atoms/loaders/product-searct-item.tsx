import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const TwoColumnListLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      onLayout={_setLayout}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}>
      {layout && (
        <>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width="64" height="93" />
            <Rect x="80" y="0" rx="8" ry="8" width="200" height="20" />
            <Rect x="80" y="36" rx="8" ry="8" width="120" height="20" />
            <Rect x="0" y="109" rx="8" ry="8" width="64" height="93" />
            <Rect x="80" y="109" rx="8" ry="8" width="200" height="20" />
            <Rect x="80" y="145" rx="8" ry="8" width="120" height="20" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default TwoColumnListLoader
