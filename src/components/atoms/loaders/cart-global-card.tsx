import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const Loader = layout => {
  return (
    <ContentLoader
      style={{ borderRadius: 8 }}
      viewBox={`0 0 ${layout.width} 220`}
      height={220}
      width={layout.width}>
      <Rect x={16} width={110} height="190" y="16" rx="10" ry="8" />
      <Rect
        x={142}
        width={layout.width - 158}
        height="16"
        y="16"
        rx="10"
        ry="8"
      />
      <Rect
        x={142}
        width={layout.width - 158}
        height="16"
        y="40"
        rx="10"
        ry="8"
      />
      <Rect
        x={142}
        width={layout.width - 158}
        height="16"
        y="72"
        rx="10"
        ry="8"
      />
      <Rect
        x={142}
        width={layout.width - 273}
        height="16"
        y="104"
        rx="10"
        ry="8"
      />
      <Rect
        x={142}
        width={layout.width - 273}
        height="16"
        y="190"
        rx="10"
        ry="8"
      />
    </ContentLoader>
  )
}

const Card = (props: LoaderPropsType) => {
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
          <Loader layout={layout} />
          <Loader layout={layout} />
        </>
      )}
    </View>
  )
}
export default Card
