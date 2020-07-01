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
import FullSizeImageLoader from '@components/atoms/loaders/full-size-image'
import ProductCardLoader from '@components/atoms/loaders/product-card'
import PillsLoader from '@components/atoms/loaders/pills'
import HorizontalImageLoader from '@components/atoms/loaders/horizontal-image'
import LineLoader from '@components/atoms/loaders/line'
import ColorLoader from '@components/atoms/loaders/colors'
import { create } from 'react-test-renderer'

interface LoaderPropsType {
  style?: ViewStyle
  imageHeight: number
}
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  containermargin: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
})

const ProductDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <FullSizeImageLoader style={{ height: props.imageHeight }} />
      <LineLoader
        style={{
          height: 25,
          marginTop: 8,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          marginTop: 16,
          height: 32,
          width: 180,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          marginTop: 4,
          height: 28,
          width: 240,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          marginTop: 16,
          height: 28,
          width: 240,
          ...styles.containermargin,
        }}
      />
      <ColorLoader
        style={{
          marginTop: 32,
          height: 28,
          width: 240,
          ...styles.containermargin,
        }}
      />
    </SafeAreaView>
  )
}
export default ProductDetailLoader
