import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProductListHeader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <ContentLoader
          {...shimmerLoader}
          viewBox={`0 0 ${layout.width} 103`}
          height={103}
          width={layout.width}>
          <Rect x="0" y="0" rx="8" ry="8" width={layout.width} height="103" />
        </ContentLoader>
      )}
    </View>
  )
}
export default ProductListHeader
