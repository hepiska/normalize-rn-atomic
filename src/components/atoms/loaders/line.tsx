import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect } from 'react-native-svg'

interface LikeListPropsType {
  style?: ViewStyle
}

const LineLoader = (props: LikeListPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      onLayout={_setLayout}
      style={{
        alignItems: 'center',
        ...props.style,
      }}>
      {layout && (
        <>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            height={layout.height}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              width={layout.width}
              height={layout.height}
              rx="8"
              ry="8"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default LineLoader
