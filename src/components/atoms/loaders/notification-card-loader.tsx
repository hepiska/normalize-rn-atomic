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
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}>
      {layout && (
        <ContentLoader
          {...shimmerLoader}
          viewBox={`0 0 ${layout.width} 250`}
          height={250}
          width={layout.width}>
          <Rect
            x={layout.width - 40}
            y="0"
            rx="8"
            ry="8"
            width={40}
            height={40}
          />
          <Rect x="0" y="0" rx="8" ry="8" width={180} height={20} />
          <Rect x="0" y="30" rx="8" ry="8" width={140} height={10} />

          <Rect
            x={layout.width - 40}
            y="60"
            rx="8"
            ry="8"
            width={40}
            height={40}
          />
          <Rect x="0" y="60" rx="8" ry="8" width={180} height={20} />
          <Rect x="0" y="90" rx="8" ry="8" width={140} height={10} />

          <Rect
            x={layout.width - 40}
            y="120"
            rx="8"
            ry="8"
            width={40}
            height={40}
          />
          <Rect x="0" y="120" rx="8" ry="8" width={180} height={20} />
          <Rect x="0" y="150" rx="8" ry="8" width={140} height={10} />
        </ContentLoader>
      )}
    </View>
  )
}
export default MyOrderLoader
