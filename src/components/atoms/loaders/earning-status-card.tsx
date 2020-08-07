import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const ReferalStatusCard = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 248`}
            height={260}
            width={360}>
            <Rect x="0" y="0" rx="8" ry="8" width={40} height="40" />
            <Rect x="48" y="0" rx="8" ry="8" width={140} height="16" />
            <Rect x="48" y="24" rx="8" ry="8" width={160} height="16" />
            <Rect
              x={layout.width - 96}
              y="12"
              rx="8"
              ry="8"
              width={80}
              height="16"
            />
            <Rect x="0" y="54" rx="8" ry="8" width={40} height="40" />
            <Rect x="48" y="54" rx="8" ry="8" width={140} height="16" />
            <Rect x="48" y="78" rx="8" ry="8" width={160} height="16" />
            <Rect
              x={layout.width - 96}
              y="66"
              rx="8"
              ry="8"
              width={80}
              height="16"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default ReferalStatusCard
