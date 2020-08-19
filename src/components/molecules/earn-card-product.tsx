import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Modal } from 'react-native'
import ImageAutoSchale from '@src/components/atoms/image-autoschale'
import { setImage as changeImageUri, formatCur } from '@utils/helpers'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@src/components/commont-styles'
import { product } from '@src/modules/normalize-schema'

const styles = StyleSheet.create({
  thumbWrap: {
    width: 36,
    height: 60,
    marginRight: 16,
  },
  infoWrap: {
    flexDirection: 'row',
  },
  earn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E0BC85', //remove this hexa
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 16,
  },
  product: {
    fontWeight: 'normal',
    color: colors.black70,
  },
  earnText: {
    ...fontStyle.helvetica,
    color: colors.white,
  },
  brand: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.black100,
  },
})

const CardProduct = ({ product }) => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#FCFBF9',
        borderRadius: 8,
        marginTop: 16,
        width: '100%',
      }}>
      <View style={styles.infoWrap}>
        <View style={styles.thumbWrap}>
          <ImageAutoSchale
            source={
              typeof product.image_url === 'string'
                ? {
                    uri: changeImageUri(product.image_url, {
                      width: 36 * 2,
                      height: 60 * 2,
                    }),
                  }
                : product.image_url
            }
            width={36}
            height={60}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.brand}>
            {product?.brand.name}{' '}
            <Text style={styles.product}>- {product?.name}</Text>
          </Text>
          <View style={styles.earn}>
            <Text style={styles.earnText}>
              Earn IDR{' '}
              {product.min_potential_earnings !== product.max_potential_earnings
                ? 'Max '
                : ''}
              {formatCur(
                product.min_potential_earnings || product.max_potential_earning,
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardProduct
