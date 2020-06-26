import React, { useState } from 'react'
import { View, ViewStyle, Dimensions, Text, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import TwoColumnListLoader from './two-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}
const { width, height } = Dimensions.get('screen')

const ProductDetailLoader = (props: LoaderPropsType) => {
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
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 280`}
            height={280}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width}
              height={`${40}`}
            />
            <Rect x="0" y="72" rx="8" ry="8" width={220} height={`${32}`} />
            <Rect x="0" y="120" rx="8" ry="8" width={220} height={`${32}`} />
            <Rect x="0" y="166" rx="8" ry="8" width={220} height={`${32}`} />
          </ContentLoader>
          <TwoColumnListLoader />
        </>
      )}
    </SafeAreaView>
  )
}
export default ProductDetailLoader
