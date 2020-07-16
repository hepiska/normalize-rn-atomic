import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const Coupon = (props: LoaderPropsType) => {
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
            style={{ borderRadius: 8 }}
            viewBox={`0 0 ${layout.width} 220`}
            height={220}
            width={layout.width}>
            <Rect x={0} width={layout.width} height="62" y="0" />
            <Rect x={16} width={180} height="32" y="76" rx="8" ry="8" />
            <Rect
              x={16}
              width={layout.width - 32}
              height="16"
              y="116"
              rx="8"
              ry="8"
            />
            <Rect x={16} width={180} height="16" y="140" rx="8" ry="8" />
            <Circle cx="26" cy="188" r="16" />
            <Rect x="52" width={180} height="32" y="172" rx="8" ry="8" />
            <Rect
              x={layout.width - 88}
              width={64}
              height="32"
              y="172"
              rx="8"
              ry="8"
            />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 16, borderRadius: 8 }}
            viewBox={`0 0 ${layout.width} 220`}
            height={220}
            width={layout.width}>
            <Rect x={0} width={layout.width} height="62" y="0" />
            <Rect x={16} width={180} height="32" y="76" rx="8" ry="8" />
            <Rect
              x={16}
              width={layout.width - 32}
              height="16"
              y="116"
              rx="8"
              ry="8"
            />
            <Rect x={16} width={180} height="16" y="140" rx="8" ry="8" />
            <Circle cx="26" cy="188" r="16" />
            <Rect x="52" width={180} height="32" y="172" rx="8" ry="8" />
            <Rect
              x={layout.width - 88}
              width={64}
              height="32"
              y="172"
              rx="8"
              ry="8"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default Coupon
