import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect, Circle } from 'react-native-svg'

interface LikeListPropsType {
  style?: ViewStyle
}

const ConnectionsLoader = (props: LikeListPropsType) => {
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
            height={40}
            width={layout.width}>
            <Circle cx="20" r="20" cy="20" />
            <Circle cx="74" r="20" cy="20" />
            <Circle cx="128" r="20" cy="20" />
            <Circle cx="182" r="20" cy="20" />
            <Circle cx="236" r="20" cy="20" />
            <Circle cx="290" r="20" cy="20" />
            <Circle cx="344" r="20" cy="20" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default ConnectionsLoader
