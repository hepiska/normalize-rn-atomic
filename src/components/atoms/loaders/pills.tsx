import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect } from 'react-native-svg'

interface LikeListPropsType {
  style?: ViewStyle
}

const PillsLoader = (props: LikeListPropsType) => {
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
            viewBox={`0 0 ${layout.width} 38`}
            height="38"
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={94} height="38" />
            <Rect x="110" y="0" rx="8" ry="8" width={94} height="38" />
            <Rect x="220" y="0" rx="8" ry="8" width={94} height="38" />
            <Rect x="330" y="0" rx="8" ry="8" width={94} height="38" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default PillsLoader
