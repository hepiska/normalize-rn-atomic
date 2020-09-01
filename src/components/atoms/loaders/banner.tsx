import React, { useState } from 'react'
import { View, ViewStyle, Dimensions } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

const { width } = Dimensions.get('screen')
interface LoaderPropsType {
  style?: ViewStyle
}

const Banner = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            height={layout.height}
            width={layout.width}>
            <Rect
              x={4}
              width={width}
              height={layout.height}
              y="4"
              rx="8"
              ry="8"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default Banner
