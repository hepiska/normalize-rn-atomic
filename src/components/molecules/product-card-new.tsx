import React, { useState, memo, useCallback } from 'react'
import {
  ViewStyle,
  StyleSheet,
  View,
  Image,
  // TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { colors, images as defaultImages } from '@utils/constants'
import Price from '@src/components/atoms/price'
import { fontStyle } from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
import RangePrice from '@components/molecules/range-price'
import { setImage as chageImageUri, formatCur } from '@utils/helpers'
import ColorList from '@components/molecules/color-list'
import isEqual from 'lodash/isEqual'
import { navigate, push } from '@src/root-navigation'

import HTML from 'react-native-render-html'
import { product } from '@src/modules/normalize-schema'

const { width } = Dimensions.get('screen')

interface ProductCardType {
  product: any
  brand?: any
  isSaved?: boolean
  isShowRangePrice: boolean
  onAddtoCart: (productId) => void
  isAtributesShow: boolean
  deleteProductSaved: (productId) => void
  addProductSaved: (productId) => void
  addCartBeforeLogin: (data) => void
  onPress: () => {}
  goShareEarn: () => {}
  style?: ViewStyle
  horizontal?: boolean
  isAuth?: boolean
  totalCart?: number
}

const typeDict = {
  large: {
    main: 18,
    sub: 16,
  },
  med: {
    main: 16,
    sub: 14,
  },
  small: {
    main: 14,
    sub: 12,
  },
}

const triggerLogin = () => {
  navigate('modals', { screen: 'LoginModal' })
}

// revisit : handle on save handle add to cart

const cardWidth = width * 0.6 - 24

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
  },
  button: {
    flex: 1,
    marginRight: 8,
    height: 36,
    borderColor: '#EFEFEF',
  },
  shareBtn: {
    borderRadius: 8,
    borderWidth: 1,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black50,
  },
  buttonText: {
    ...fontStyle.helvetica,
    color: colors.black80,
    marginLeft: 8,
  },
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4e8',
    width: cardWidth,
    height: 1.5 * cardWidth,
  },
  defaultStyle: {
    // marginTop: 16,
    // marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
})

const ProductCard = ({
  product,
  style,
  brand = {},
  onAddtoCart,
  deleteProductSaved,
  addProductSaved,
  addCartBeforeLogin,
  horizontal = false,
  isAtributesShow = true,
  onPress,
  isShowRangePrice = true,
  isSaved,
  isAuth,
  totalCart,
}: ProductCardType) => {
  const [layout, setLayout] = useState(null)
  const type = 'med'
  const composeStyle = { ...styles.defaultStyle, ...style }
  const _onLayout = e => {
    setLayout(e.nativeEvent.layout)
  }
  const [isProductSaved, setProductSaved] = useState(isSaved)
  const [defaultImage, setImage] = useState(null)
  const [attributeSelected, setAttributeSelected] = useState(null)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const colorAttributes =
    product.attributes && product.attributes.find(x => x && x.label === 'Color')

  const onColorChange = (attribute, index) => () => {
    const _filteredVariants = product.variants.filter(_variant => {
      return _variant.attribute_values.find(
        ({ attribute_id, attribute_value_id }) =>
          attribute_id === colorAttributes.attribute_id &&
          attribute_value_id === attribute.id,
      )
    })
    setSelectedVariantId(_filteredVariants[0].id)
    setAttributeSelected(attribute)
  }

  const _onSave = () => {
    if (!isAuth) {
      triggerLogin()
    } else {
      setProductSaved(!isProductSaved)
      if (isSaved) {
        deleteProductSaved(product.id)
      } else {
        addProductSaved(product.id)
      }
    }
  }

  const _onPress = useCallback(() => {
    if (onPress) {
      onPress()
    } else {
      push('Screens', {
        screen: 'ProductDetail',
        params: { productId: product.id },
      })
    }
  }, [product.id])

  const selectedVariant =
    product.variants.find(variant => variant.id === selectedVariantId) ||
    product.variants[0]
  const images = selectedVariant.image_urls || product.image_urls || []

  const _addToCart = () => {
    navigate('modals', {
      screen: 'CartModal',
      params: { product: product.id },
    })
  }

  const goShareEarn = () => {
    if (isAuth) {
      navigate('modals', {
        screen: 'ShareProduct',
        params: {
          product: product,
        },
      })
    } else {
      navigate('modals', {
        screen: 'ShareAndEarn',
        params: {
          product: product,
        },
      })
    }
  }

  // const random = Math.floor(Math.random() * images.length)
  const variantPrice = selectedVariantId && {
    current: selectedVariant.price_disc || selectedVariant.price,
    prev: selectedVariant.price_disc ? selectedVariant.price : undefined,
  }
  const image =
    defaultImage ||
    (!!images[0] &&
      chageImageUri(images[0], {
        width: (layout && layout.width) || 0,
        height: (layout && layout.width * 1.5) || 0,
      }))

  const thumbnailImage = defaultImage
    ? null
    : !!images[0] &&
      chageImageUri(images[0], {
        width: 24,
        height: 32,
      })

  return horizontal ? (
    <ProductCardHorizontal
      composeStyle={composeStyle}
      image={image}
      thumbnailImage={thumbnailImage}
      isAtributesShow={isAtributesShow}
      type={type}
      isShowRangePrice={isShowRangePrice}
      variantPrice={variantPrice}
      onPress={_onPress}
      brand={brand}
      onSave={_onSave}
      isAuth={isAuth}
      triggerLogin={triggerLogin}
      onAddtoCart={onAddtoCart}
      addToCart={_addToCart}
      product={product}
      colorAttributes={colorAttributes}
      attributeSelected={attributeSelected}
      onColorChange={onColorChange}
      layout={layout}
      onLayout={_onLayout}
    />
  ) : (
    <MemVerticalCard
      composeStyle={composeStyle}
      isSaved={isProductSaved}
      thumbnailImage={thumbnailImage}
      onPress={_onPress}
      image={image}
      isShowRangePrice={isShowRangePrice}
      isAtributesShow={isAtributesShow}
      variantPrice={variantPrice}
      onSave={_onSave}
      isAuth={isAuth}
      triggerLogin={triggerLogin}
      onAddtoCart={onAddtoCart}
      addToCart={_addToCart}
      goShareEarn={goShareEarn}
      type={type}
      colorAttributes={colorAttributes}
      brand={brand}
      product={product}
      attributeSelected={attributeSelected}
      onColorChange={onColorChange}
      layout={layout}
      onLayout={_onLayout}
    />
  )
}

const ProductCardHorizontal = ({
  composeStyle,
  image,
  type,
  brand,
  product,
  isAuth,
  onPress,
  addToCart,
  onSave,
  triggerLogin,
  onAddtoCart,
  thumbnailImage,
  variantPrice,
  deleteProductSaved,
  addProductSaved,
  isShowRangePrice,
  colorAttributes,
  isAtributesShow,
  attributeSelected,
  onColorChange,
  layout,
  onLayout,
}) => {
  const productName =
    '<productname>' + product.name.replace(/\n|\r/g, '') + '</productname>'
  const price: any = {}
  if (!product.max_price_after_disc && !product.min_price_after_disc) {
    price.from = product.min_price
    price.to = product.max_price
    price.withDiscount = false
  } else {
    price.from = product.min_price_after_disc
    price.to = product.max_price_after_disc
    price.exFrom = product.min_price
    price.exTo = product.max_price
    price.withDiscount = true
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...composeStyle,
      }}
      onLayout={onLayout}>
      {layout && (
        <View style={{ width: '40%' }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              errorStyle={{ width: layout.width, height: 1.5 * layout.width }}
              thumbnailSource={
                typeof thumbnailImage === 'string'
                  ? { uri: thumbnailImage }
                  : thumbnailImage
              }
              source={typeof image === 'string' ? { uri: image } : image}
              width={layout.width}
              height={1.5 * layout.width}
              style={styles.image}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      <View
        style={{
          width: '60%',
          // paddingHorizontal: composeStyle.paddingHorizontal,
        }}>
        <Text
          style={{
            ...fontStyle.helveticaBold,
            textTransform: 'uppercase',
            fontSize: typeDict[type].main,
            marginRight: 4,
            marginBottom: 4,
            color: colors.black100,
          }}>
          {brand.name}
        </Text>
        <HTML
          html={productName}
          renderers={{
            // eslint-disable-next-line react/display-name
            productname: (
              htmlAttribs,
              children,
              convertedCSSStyles,
              passProps,
            ) => {
              return (
                <Text
                  style={{
                    ...fontStyle.helvetica,
                    fontSize: typeDict[type].sub,
                    margin: 4,
                    color: colors.black80,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {passProps?.rawChildren[0]?.data || ''}
                </Text>
              )
            },
          }}
        />
        {variantPrice ? (
          <Price {...variantPrice} />
        ) : (
          <RangePrice {...price} upTo />
        )}
        {addToCart && product.is_commerce && (
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 16 }}>
            <OutlineButton
              title="Add to Cart"
              onPress={addToCart}
              leftIcon={
                <IconFa name="shopping-bag" size={12} color={colors.black80} />
              }
              style={styles.button}
              fontStyle={styles.buttonText}
              disabled={!product.is_commerce}
            />
          </View>
        )}
      </View>
    </View>
  )
}

// eslint-disable-next-line react/display-name
const ProductCardVertical = ({
  composeStyle,
  isSaved,
  image,
  type,
  brand,
  product,
  thumbnailImage,
  onPress,
  onSave,
  isShowRangePrice,
  onAddtoCart,
  isAuth,
  triggerLogin,
  variantPrice,
  isAtributesShow,
  colorAttributes,
  attributeSelected,
  onColorChange,
  layout,
  onLayout,
  addToCart,
  goShareEarn,
}) => {
  if (!product) {
    return null
  }
  const productName =
    '<productname>' + product.name.replace(/\n|\r/g, '') + '</productname>'
  const price: any = {}
  if (!product.max_price_after_disc && !product.min_price_after_disc) {
    price.from = product.min_price
    price.to = product.max_price
    price.withDiscount = false
  } else {
    price.from = product.min_price_after_disc
    price.to = product.max_price_after_disc
    price.exFrom = product.min_price
    price.exTo = product.max_price
    price.withDiscount = true
  }

  isShowRangePrice = product.min_price !== product.max_price

  return (
    <View
      style={{
        ...composeStyle,
      }}
      onLayout={onLayout}>
      {/* picture */}
      <View
        style={{
          marginBottom: 8,
          overflow: 'visible',
        }}>
        {layout ? (
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              errorStyle={{ width: layout.width, height: 1.5 * layout.width }}
              thumbnailSource={
                typeof thumbnailImage === 'string'
                  ? { uri: thumbnailImage }
                  : thumbnailImage
              }
              containerStyle={{ width: layout.width, height: 232 }}
              source={typeof image === 'string' ? { uri: image } : image}
              width={layout.width}
              height={1.5 * layout.width}
              style={{ ...styles.image }}
            />
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.defaultImage} />
        )}
      </View>

      {/* product desc */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            backgroundColor: '#E0BC85',
          }}>
          <Text
            style={{
              ...fontStyle.helvetica,
              color: colors.white,
              textAlignVertical: 'center',
            }}>
            Earn IDR {formatCur(product?.max_potential_earnings)}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={onSave}>
          <IconFa
            name={isSaved ? 'heart' : 'heart-o'}
            size={24}
            color={colors.black100}
          />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          // flex: 1,
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <Text
          style={{
            ...fontStyle.helveticaBold,
            textTransform: 'uppercase',
            fontSize: typeDict[type].main,
            marginVertical: 8,
            color: colors.black100,
          }}>
          {brand.name}
        </Text>
        <HTML
          html={productName}
          renderers={{
            // eslint-disable-next-line react/display-name
            productname: (
              htmlAttribs,
              _children,
              convertedCSSStyles,
              passProps,
            ) => {
              return (
                <Text
                  style={{
                    ...fontStyle.helveticaThin,
                    fontWeight: '300',
                    fontSize: typeDict[type].sub,
                    marginBottom: 8,
                    color: colors.black80,
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {passProps?.rawChildren[0]?.data || ''}
                </Text>
              )
            },
          }}
        />
        {isAtributesShow && colorAttributes && (
          <ColorList
            selectedId={attributeSelected ? attributeSelected.id : null}
            data={colorAttributes ? colorAttributes.values : []}
            onChange={onColorChange}
          />
        )}
        {variantPrice ? (
          <Price
            {...variantPrice}
            stylePrev={{
              fontSize: 10,
              color: colors.black90,
            }}
            style={{
              fontSize: 14,
              color: colors.gray1,
              ...fontStyle.helveticaBold,
            }}
          />
        ) : isShowRangePrice ? (
          <RangePrice
            {...price}
            upTo
            stylePrev={{
              fontSize: 10,
              color: colors.black90,
            }}
            style={{
              fontSize: 14,
              color: colors.gray1,
              ...fontStyle.helveticaBold,
            }}
          />
        ) : (
          <Price
            {...{
              prev: price.exTo,
              current: price.to,
            }}
            stylePrev={{ fontSize: 10, color: colors.black90 }}
            style={{
              fontSize: 14,
              color: colors.gray1,
              ...fontStyle.helveticaBold,
            }}
          />
        )}

        {addToCart && product.is_commerce && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginTop: 16,
              flexDirection: 'row',
            }}>
            <OutlineButton
              title="Add to Cart"
              onPress={addToCart}
              style={styles.button}
              fontStyle={styles.buttonText}
              disabled={!product.is_commerce}
            />
            <TouchableWithoutFeedback
              onPress={goShareEarn}
              style={styles.shareBtn}>
              <Image
                source={require('@assets/icons/share.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  )
}

const MemVerticalCard = memo(ProductCardVertical, (prev, nex) => {
  if (prev.image !== nex.image) {
    return false
  }

  if (!isEqual(prev.variantPrice, nex.variantPrice)) {
    return false
  }
  if (!isEqual(prev.layout, nex.layout)) {
    return false
  }
  if (prev.isSaved !== nex.isSaved) {
    return false
  }
  return true
})

const areEq = (a, b) => {
  return true
}

export default memo(ProductCard, areEq)
