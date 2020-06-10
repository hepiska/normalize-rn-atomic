import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import ProductListHeader from './product-list-header'
import SearchFilterLoader from './search-filter-loader'
import TwoColumnListLoader from './two-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProductListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <ProductListHeader />
      <SearchFilterLoader style={{ marginTop: 16 }} />
      <TwoColumnListLoader />
    </SafeAreaView>
  )
}
export default ProductListLoader
