import React, { useState } from 'react'
import {
  View,
  ViewStyle,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import LineLoader from './line'
import ProductCard from './product-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  containerMargin: {
    marginVertical: 8,
  },
})

const ProductDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={props.style}>
      <LineLoader style={{ height: 32, ...styles.containerMargin }} />
      <LineLoader style={{ height: 32, marginTop: 16, width: 156 }} />
      <LineLoader style={{ height: 24, marginTop: 8, width: 84 }} />
      <LineLoader style={{ height: 24, marginTop: 8, width: 84 }} />
      <LineLoader style={{ height: 24, marginTop: 32, width: 156 }} />
      <ProductCard style={styles.containerMargin} />
    </SafeAreaView>
  )
}
export default ProductDetailLoader
