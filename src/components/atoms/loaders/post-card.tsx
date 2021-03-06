import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const PostCardLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 316`}
            height={316}
            width={layout.width}>
            <Circle cx="16" r="16" cy="16" />
            <Rect x={40} width={layout.width} height="24" y="4" rx="8" ry="8" />

            <Rect
              x="0"
              y="40"
              rx="8"
              ry="8"
              width={layout.width}
              height="180"
            />
            <Rect
              x="0"
              y="226"
              rx="8"
              ry="8"
              width={layout.width}
              height="18"
            />
            <Rect
              x="0"
              y="250"
              rx="8"
              ry="8"
              width={layout.width}
              height="18"
            />
            <Circle r="10" cx="10" cy="284" />
            <Circle r="10" cx={layout.width - 18} cy="284" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default PostCardLoader
