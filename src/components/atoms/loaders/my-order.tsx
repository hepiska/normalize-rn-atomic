import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const MyOrderLoader = (props: LoaderPropsType) => {
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
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 80`}
            height={80}
            width={layout.width}>
            <Circle x={50} y="30" r="20" />
            <Circle x={layout.width / 2 - 50} y="30" r="20" />
            <Circle x={layout.width / 2 + 50} y="30" r="20" />
            <Circle x={layout.width - 50} y="30" r="20" />

            <Rect x={25} y="60" rx="8" ry="8" width={50} height={10} />
            <Rect
              x={layout.width / 2 - 75}
              y="60"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
            <Rect
              x={layout.width / 2 + 25}
              y="60"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
            <Rect
              x={layout.width - 75}
              y="60"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default MyOrderLoader
