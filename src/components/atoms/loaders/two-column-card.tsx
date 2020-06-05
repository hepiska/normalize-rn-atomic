import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

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
            viewBox={`0 0 ${layout.width} 248`}
            height={260}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="180"
            />
            <Rect
              x="0"
              y="188"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x="0"
              y="216"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x={layout.width / 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="180"
            />
            <Rect
              x={layout.width / 2}
              y="188"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x={layout.width / 2}
              y="216"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
          </ContentLoader>
          <ContentLoader
            viewBox={`0 0 ${layout.width} 248`}
            height={260}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="180"
            />
            <Rect
              x="0"
              y="188"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x="0"
              y="216"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x={layout.width / 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="180"
            />
            <Rect
              x={layout.width / 2}
              y="188"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
            <Rect
              x={layout.width / 2}
              y="216"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height="20"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default TwoColumnListLoader
