import React from 'react'
import { StyleSheet, ViewStyle, View, Text } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { setImage as changeImageUri, formatRupiah } from '@utils/helpers'
import { images as defaultImages } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import {
  helveticaBlackBold,
  helveticaBlackBoldFont12,
  helveticaBlackFont12,
  futuraNormalFont12,
  helveticaNormalFont10,
} from '@components/commont-styles'
import { colors } from '@utils/constants'

interface ProductSummaryCartType {
  style?: ViewStyle
  item: any
  cart: any
  brand: any
  variant: any
  index: any
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 24,
  },
  warehouse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
})

class ProductSummaryCart extends React.PureComponent<
  ProductSummaryCartType,
  any
> {
  state = {
    defaultImage: null,
  }
  render() {
    const { style, cart, brand, variant, index } = this.props

    const images = variant.image_urls
    const random = Math.floor(Math.random() * images.length)

    const image =
      this.state.defaultImage ||
      (!!variant.image_urls[random]
        ? changeImageUri(images[random], { ...styles.image })
        : defaultImages.product)

    return (
      <>
        <View
          style={
            index !== 0 && {
              borderStyle: 'dashed',
              borderColor: colors.black50,
              borderWidth: 1,
              width: '100%',
            }
          }
        />
        <View {...style} {...styles.container}>
          <Div flexDirection="row" alignItems="center">
            <ImageAutoSchale
              source={{
                uri: image,
              }}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <Div
              _flex="1"
              flexDirection="column"
              align="flex-start"
              _margin="0 0 0 16px">
              <Font
                ellipsizeMode="tail"
                numberOfLines={1}
                {...helveticaBlackBoldFont12}>
                {brand.name ? brand.name.toUpperCase() : 'UNKNOWN'}
              </Font>
              <Font
                ellipsizeMode="tail"
                numberOfLines={1}
                {...helveticaBlackFont12}
                color={colors.black70}
                _margin="8px 0 0 0">
                {variant.product
                  ? variant.product.product_name.replace(/(\r\n|\n|\r)/gm, '')
                  : 'UNKNOWN'}
              </Font>
              <Div flexDirection="row" _margin="8px 0 0 0">
                <Div flexDirection="row">
                  <Font {...futuraNormalFont12}>Qty</Font>
                  <Font
                    {...helveticaNormalFont10}
                    style={{ marginLeft: 8 }}>{`${cart.qty} pcs`}</Font>
                </Div>

                {variant.attribute_values?.map((dat, key) => {
                  return (
                    <Div key={key} flexDirection="row" _margin="0 0 0 16px">
                      <Font {...futuraNormalFont12}>{dat.label}</Font>
                      <Font
                        {...helveticaNormalFont10}
                        style={{ marginLeft: 8 }}>
                        {dat.value.label}
                      </Font>
                    </Div>
                  )
                })}
              </Div>
              <Font {...helveticaBlackBold} _margin="16px 0 0 0">
                {formatRupiah(variant.price * cart.qty) || '0'}
              </Font>
            </Div>
          </Div>
        </View>
      </>
    )
  }
}

export default ProductSummaryCart
