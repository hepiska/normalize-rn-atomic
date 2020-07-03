import React from 'react'
import { StyleSheet, ViewStyle, View, Text } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { setImage as changeImageUri, formatRupiah } from '@utils/helpers'
import { images as defaultImages } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { helveticaBlackBold, fontStyle } from '@components/commont-styles'
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
    // width: 60,
    // height: 80,
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

  renderProductName = variant => {
    if (variant.prduct) {
      return variant.product.product_name.replace(/(\r\n|\n|\r)/gm, '')
    } else if (variant.name) {
      return variant.name
    }
    return 'UNKNOWN'
  }
  render() {
    const { style, cart, brand, variant, index } = this.props

    let image
    let thumbnailImage
    if (variant.image_urls) {
      const images = variant.image_urls
      const random = Math.floor(Math.random() * images.length)

      image =
        !!variant.image_urls[random] &&
        changeImageUri(images[random], { width: 60, height: 80 })
      thumbnailImage =
        !!variant.image_urls[random] &&
        changeImageUri(images[random], { width: 24, height: 30 })
    } else if (variant.image_url) {
      image = !!variant.image_url
        ? changeImageUri(variant.image_url, { width: 60, height: 80 })
        : defaultImages.product
      thumbnailImage =
        !!variant.image_url &&
        changeImageUri(variant.image_url, { width: 60, height: 80 })
    } else if (variant.variant.image_url) {
      image = !!variant.variant.image_url
        ? changeImageUri(variant.variant.image_url, { width: 60, height: 80 })
        : defaultImages.product
      thumbnailImage =
        !!variant.variant.image_url &&
        changeImageUri(variant.variant.image_url, { width: 60, height: 80 })
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
        <View style={{ ...styles.container, ...style }}>
          <Div flexDirection="row" alignItems="center">
            <ImageAutoSchale
              errorStyle={{ width: 60, height: 80 }}
              thumbnailSource={
                typeof thumbnailImage === 'string'
                  ? { uri: thumbnailImage }
                  : thumbnailImage
              }
              source={
                typeof image === 'string'
                  ? {
                      uri: image,
                    }
                  : image
              }
              width={60}
              // height={80}
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
                  {this.renderProductName(variant)}
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
              <Text style={{ ...helveticaBlackBold, marginTop: 16 }}>
                {formatRupiah(
                  (variant.price || variant.variant.price) * cart.qty,
                ) || '0'}
              </Text>
            </Div>
          </Div>
        </View>
      </>
    )
  }
}

export default ProductSummaryCart
