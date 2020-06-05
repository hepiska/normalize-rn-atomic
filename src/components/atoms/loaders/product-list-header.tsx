import React from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProductListHeader = (props: LoaderPropsType) => {
  return (
    <View style={{ alignItems: 'center', ...props.style }}>
      <ContentLoader viewBox="0 0 360 103" height={103} width={360}>
        <Rect x="8" y="0" rx="8" ry="8" width={360 - 24} height="103" />
      </ContentLoader>
    </View>
  )
}
export default ProductListHeader
