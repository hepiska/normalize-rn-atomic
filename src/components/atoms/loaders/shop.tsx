import React, { useState } from 'react'
import {
  View,
  ViewStyle,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import FullSizeImageLoader from '@components/atoms/loaders/full-size-image'
import ProductCardLoader from '@components/atoms/loaders/product-card'
import PillsLoader from '@components/atoms/loaders/pills'
import TitleLoader from '@components/atoms/loaders/title'
import HorizontalImageLoader from '@components/atoms/loaders/horizontal-image'

import { globalDimention } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  margin: { marginHorizontal: 16, marginVertical: 8 },
})

const ShopLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView
      style={{
        ...props.style,
      }}>
      <FullSizeImageLoader
        style={{ height: globalDimention.jumbotronSize.height }}
      />
      <PillsLoader style={{ ...styles.margin, marginTop: 16 }} />
      <TitleLoader style={styles.margin} />
      <ProductCardLoader style={styles.margin} />
      <TitleLoader style={styles.margin} />
      <HorizontalImageLoader style={styles.margin} />
    </SafeAreaView>
  )
}
export default ShopLoader
