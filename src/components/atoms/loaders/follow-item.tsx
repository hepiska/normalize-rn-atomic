import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const FollowItem = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 64`}
            height={64}
            width={layout.width}>
            <Circle cx="16" r="20" cy="20" />
            <Rect x={48} width={186} height="32" y="5" rx="8" ry="8" />
            <Rect
              x={layout.width - 72}
              width={64}
              height="32"
              y="5"
              rx="8"
              ry="8"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default FollowItem
