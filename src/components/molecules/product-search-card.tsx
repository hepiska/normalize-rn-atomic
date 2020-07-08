import React, { memo } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { fontStyle } from '../commont-styles'
import isEqual from 'lodash/isEqual'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage } from '@utils/helpers'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 63,
    height: 1.5 * 63,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  subtitle: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
})

const ProductSearchCard = ({ brand, product, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <ImageAutoSchale
          errorStyle={styles.image}
          source={{ uri: setImage(product.image_url, { width: 120 }) }}
          width={styles.image.width}
          height={styles.image.height}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{brand.name}</Text>
        <Text style={styles.subtitle}>{product.name}</Text>
      </View>
    </View>
  )
}

export default memo(ProductSearchCard, (curr, nex) => {
  if (!isEqual(curr.brand, nex.brand)) {
    return false
  }

  if (!isEqual(curr.product, nex.product)) {
    return false
  }
  return true
})
