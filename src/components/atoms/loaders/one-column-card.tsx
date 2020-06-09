import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const OneColumnListLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 242`}
            height={270}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width - 16}
              height="230"
            />
          </ContentLoader>
          <ContentLoader
            viewBox={`0 0 ${layout.width} 242`}
            height={270}
            width={360}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width - 16}
              height="230"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default OneColumnListLoader
