import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const ThreeColumnLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} ${layout.width / 3 + 30}`}
            height={layout.width / 3 + 30}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={layout.width / 3}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={(layout.width / 3) * 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
          </ContentLoader>
          <ContentLoader
            viewBox={`0 0 ${layout.width} ${layout.width / 3 + 30}`}
            height={layout.width / 3 + 30}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={layout.width / 3}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={(layout.width / 3) * 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
          </ContentLoader>
          <ContentLoader
            viewBox={`0 0 ${layout.width} ${layout.width / 3 + 30}`}
            height={layout.width / 3 + 30}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={layout.width / 3}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
            <Rect
              x={(layout.width / 3) * 2}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 3 - 16}
              height={layout.width / 3 - 16}
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default ThreeColumnLoader
