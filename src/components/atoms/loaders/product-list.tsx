import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView, StyleSheet } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import ProductListHeader from './product-list-header'
import SearchFilterLoader from './search-filter-loader'
import LineLoader from './line'
import PillLoader from './pills'
import TwoColumnListLoader from './two-column-card'
import ProductCardLoader from '@components/atoms/loaders/product-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
  sectionMargin: {
    marginVertical: 6,
  },
})

const ProductListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <ProductListHeader style={styles.sectionMargin} />
      <View style={[styles.horizontal, styles.sectionMargin]}>
        <LineLoader style={{ flex: 7, height: 32, marginRight: 16 }} />
        <LineLoader style={{ flex: 2, height: 32 }} />
      </View>
      <PillLoader style={styles.sectionMargin} />
      <ProductCardLoader style={{ marginTop: 16 }} />
    </SafeAreaView>
  )
}
export default ProductListLoader
