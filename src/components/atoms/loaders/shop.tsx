import React, { useState } from 'react'
import { View, ViewStyle, Dimensions, Text, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const ShopLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <ContentLoader
            viewBox={`0 0 ${layout.width} 240`}
            height={240}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width}
              height={`${240}`}
            />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 48`}
            height={48}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={layout.width} height={48} />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 220`}
            height={220}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height={220}
            />
            <Rect
              x={`${layout.width / 2}`}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height={220}
            />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default ShopLoader
