import React, { useState } from 'react'
import { View, ViewStyle, Dimensions, Text, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

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
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width}
              height={`${400}`}
            />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 48`}
            height={48}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={180} height={48} />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 20`}
            height={20}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={240} height={20} />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 20`}
            height={20}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={240} height={20} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default ProductDetailLoader
