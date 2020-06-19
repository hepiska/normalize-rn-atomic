import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const ThreeCollumnCardLoaderSmall = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 100`}
            height={90}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height="90"
            />
            <Rect
              x={layout.width / 2 - (layout.width / 3 - 16) / 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height="90"
            />
            <Rect
              x={layout.width - (layout.width / 3 - 16)}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height="90"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default ThreeCollumnCardLoaderSmall
