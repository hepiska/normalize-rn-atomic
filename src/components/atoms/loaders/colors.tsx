import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect, Circle } from 'react-native-svg'

interface LikeListPropsType {
  style?: ViewStyle
}

const ColorLoader = (props: LikeListPropsType) => {
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
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 40`}
            height="40"
            width={layout.width}>
            <Circle cx="20" r="20" cy="20" />
            <Circle cx="76" r="20" cy="20" />
            <Circle cx="132" r="20" cy="20" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default ColorLoader
