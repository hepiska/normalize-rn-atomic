import React, { useState, memo } from 'react'
import {
  ViewStyle,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { colors, images as defaultImages } from '@utils/constants'
import Price from '@src/components/atoms/price'
import { fontStyle } from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
import RangePrice from '@components/molecules/range-price'
import { setImage as chageImageUri } from '@utils/helpers'
import ColorList from '@components/molecules/color-list'
import { navigate, push } from '@src/root-navigation'

import HTML from 'react-native-render-html'

interface ProductCardType {
  product: any
  brand?: any
  isSaved?: boolean
  isShowRangePrice: boolean
  onAddtoCart: (productId) => void
  isAtributesShow: boolean
  deleteProductSaved: (productId) => void
  addProductSaved: (productId) => void
  style?: ViewStyle
  horizontal?: boolean
  isAuth?: boolean
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

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
  },
  button: {
    width: '100%',
    height: 36,
    borderColor: '#EFEFEF',
  },
  buttonText: {
    ...fontStyle.helveticaBold,
    color: colors.black80,
    marginLeft: 8,
  },
  defaultStyle: {
    marginTop: 16,
    marginBottom: 16,
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
  horizontal = false,
  isAtributesShow = true,
  isShowRangePrice = true,
  isSaved,
  isAuth,
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
  const onPress = () => {
    push('Screens', {
      screen: 'ProductDetail',
      params: { productId: product.id },
    })
  }

  const selectedVariant =
    product.variants.find(variant => variant.id === selectedVariantId) ||
    product.variants[0]
  const images = selectedVariant.image_urls || product.image_urls || []
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
        width: (layout && layout.width / 20) || 0,
        height: (layout && (layout.width / 20) * 1.5) || 0,
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
      onPress={onPress}
      brand={brand}
      onSave={_onSave}
      isAuth={isAuth}
      triggerLogin={triggerLogin}
      onAddtoCart={onAddtoCart}
      product={product}
      colorAttributes={colorAttributes}
      attributeSelected={attributeSelected}
      onColorChange={onColorChange}
      layout={layout}
      onLayout={_onLayout}
    />
  ) : (
    <ProductCardVertical
      composeStyle={composeStyle}
      isSaved={isProductSaved}
      thumbnailImage={thumbnailImage}
      onPress={onPress}
      image={image}
      isShowRangePrice={isShowRangePrice}
      isAtributesShow={isAtributesShow}
      variantPrice={variantPrice}
      onSave={_onSave}
      isAuth={isAuth}
      triggerLogin={triggerLogin}
      onAddtoCart={onAddtoCart}
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
        {onAddtoCart && product.is_commerce && (
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 16 }}>
            <OutlineButton
              title="Add to Cart"
              onPress={isAuth ? onAddtoCart : triggerLogin}
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
        <TouchableOpacity
          style={{
            zIndex: 2,
            width: 32,
            height: 32,
            backgroundColor: colors.white,
            borderRadius: 16,
            position: 'absolute',
            right: 16,
            top: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onSave}>
          <Icon
            name={isSaved ? 'bookmark' : 'bookmark-border'}
            size={18}
            color={isSaved ? colors.black100 : colors.black90}
          />
        </TouchableOpacity>
        {layout && (
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
              style={{ ...styles.image }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* product desc */}
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
            margin: 4,
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
                    ...fontStyle.helveticaThin,
                    fontWeight: '300',
                    fontSize: typeDict[type].sub,
                    margin: 4,
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

        {onAddtoCart && product.is_commerce && (
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}>
            <OutlineButton
              title="Add to Cart"
              onPress={isAuth ? onAddtoCart : triggerLogin}
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

export default memo(ProductCard)
