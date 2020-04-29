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
  fontStyle,
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
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  futuraBold12: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 12,
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

    let image
    if (variant.image_urls) {
      const images = variant.image_urls
      const random = Math.floor(Math.random() * images.length)

      image =
        this.state.defaultImage ||
        (!!variant.image_urls[random]
          ? changeImageUri(images[random], { ...styles.image })
          : defaultImages.product)
    }
    if (variant.image_url) {
      image =
        this.state.defaultImage ||
        (!!variant.image_url
          ? changeImageUri(variant.image_url, { ...styles.image })
          : defaultImages.product)
    }
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
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ ...styles.helveticaBold12, color: colors.black100 }}>
                {brand.name ? brand.name.toUpperCase() : 'UNKNOWN'}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ ...styles.helvetica12, color: colors.black70 }}>
                  {variant.product
                    ? variant.product.product_name.replace(/(\r\n|\n|\r)/gm, '')
                    : 'UNKNOWN'}
                </Text>
              </View>
              <Div flexDirection="row" _margin="8px 0 0 0">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ ...styles.futuraBold12, color: colors.black70 }}>
                    Qty
                  </Text>
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{ ...styles.helvetica10, color: colors.black60 }}>
                      {`${cart.qty} pcs`}
                    </Text>
                  </View>
                </View>

                {variant.attribute_values?.map((dat, key) => {
                  return (
                    // <Div key={key} flexDirection="row" _margin="0 0 0 16px">
                    //   <Font {...futuraNormalFont12}>{dat.label}</Font>
                    //   <Font
                    //     {...helveticaNormalFont10}
                    //     style={{ marginLeft: 8 }}>
                    //     {dat.value.label}
                    //   </Font>
                    // </Div>
                    <View
                      key={key}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 16,
                      }}>
                      <Text
                        style={{
                          ...styles.futuraBold12,
                          color: colors.black70,
                        }}>
                        {dat.label}
                      </Text>
                      <View style={{ marginLeft: 8 }}>
                        <Text
                          style={{
                            ...styles.helvetica10,
                            color: colors.black60,
                          }}>
                          {dat.value.label}
                        </Text>
                      </View>
                    </View>
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
