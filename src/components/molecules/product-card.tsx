import React, { useState, memo } from 'react'
import {
  ViewStyle,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native'
import styled from 'styled-components'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors, images as defaultImages } from '@utils/constants'
import Price from '@src/components/atoms/price'
import { fontStyle } from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
// import { useNavigation } from '@react-navigation/native'
import RangePrice from '@components/molecules/range-price'
import { setImage as chageImageUri } from '@utils/helpers'
import UserSaved from '@components/molecules/user-saved'
import ColorList from '@components/molecules/color-list'
import { navigate } from '@src/root-navigation'

const AbsDiv = styled(PressAbbleDiv)`
  position: absolute;
  right: 16px;
  top: 16px;
`

interface styleTypes {
  _margin: string
  _width: string | number
}

interface ViewExtend extends ViewStyle {
  wrappermargin?: number
}

interface ProductCardType {
  product: any
  brand?: any
  isSaved?: boolean
  isShowRangePrice: boolean
  onPress: () => void
  onAddtoCart: (productId) => void
  isAtributesShow: boolean
  onSave: (productId) => void
  style?: ViewExtend
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
    width: 156,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
  },
})

const ProductCard = ({
  product,
  style,
  brand = {},
  onSave,
  onAddtoCart,
  isAtributesShow = true,
  isShowRangePrice = true,
  isSaved,
  onPress,
  horizontal = false,
  isAuth,
}: ProductCardType) => {
  const type = 'med'
  const composeStyle = { ...styles.defaultStyle, ...style }
  const margin = composeStyle.marginRight
    ? Number(composeStyle.marginRight)
    : Number(composeStyle.paddingHorizontal) * 2
  let width = Number(composeStyle.width) - margin
  width = composeStyle.wrappermargin
    ? width - composeStyle.wrappermargin
    : width

  const [defaultImage, setImage] = useState(null)
  const [attributeSelected, setAttributeSelected] = useState(null)
  const [selectedVariantId, setSelectedVariantId] = useState(null)

  const colorAttributes =
    product.attributes &&
    product.attributes.label &&
    product.attributes.find(x => x.label === 'Color')

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
      onSave(product.id)
    }
  }

  const selectedVariant =
    product.variants.find(variant => variant.id === selectedVariantId) ||
    product.variants[0]
  const images = selectedVariant.image_urls || product.image_urls || []
  // const random = Math.floor(Math.random() * images.length)
  const variantPrice = selectedVariantId && {
    price: selectedVariant.price,
    discount_price: selectedVariant.price_after_disc,
  }

  const image =
    defaultImage || (!!images[0] && chageImageUri(images[0], { width }))

  const thumbnailImage = defaultImage
    ? null
    : !!images[0] && chageImageUri(images[0], { width: width / 20 })

  return horizontal ? (
    <ProductCardHorizontal
      composeStyle={composeStyle}
      width={width}
      image={image}
      thumbnailImage={thumbnailImage}
      setImage={setImage}
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
    />
  ) : (
    <ProductCardVertical
      composeStyle={composeStyle}
      width={width}
      isSaved={isSaved}
      thumbnailImage={thumbnailImage}
      onPress={onPress}
      image={image}
      isShowRangePrice={isShowRangePrice}
      isAtributesShow={isAtributesShow}
      setImage={setImage}
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
    />
  )
}

const ProductCardHorizontal = ({
  composeStyle,
  width,
  image,
  setImage,
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
  isShowRangePrice,
  colorAttributes,
  isAtributesShow,
  attributeSelected,
  onColorChange,
}) => {
  const productName = product.name.replace(/\n|\r/g, '')
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
    <TouchableWithoutFeedback onPress={onPress}>
      <Div
        style={{ ...composeStyle, width: '100%' }}
        _direction="row"
        justify="space-between"
        align="flex-start">
        <Div _width="40%">
          <ImageAutoSchale
            errorStyle={{ width: width, height: 1.5 * width }}
            thumbnailSource={
              typeof thumbnailImage === 'string'
                ? { uri: thumbnailImage }
                : thumbnailImage
            }
            source={typeof image === 'string' ? { uri: image } : image}
            width={width}
            style={styles.image}
          />
        </Div>

        <View
          style={{
            width: '60%',
            paddingHorizontal: composeStyle.paddingHorizontal,
          }}>
          <Font
            style={fontStyle.helveticaBold}
            size={typeDict[type].main}
            _margin="0px 4px 4px"
            color={colors.black100}>
            {brand.name}
          </Font>
          <Font
            style={fontStyle.helvetica}
            size={typeDict[type].sub}
            _margin="4px"
            color={colors.black80}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Font>
          {/* <UserSaved imageUrl={imageSource} /> */}
          {variantPrice ? (
            <Price {...variantPrice} />
          ) : (
            <RangePrice {...price} upTo />
          )}
          {onAddtoCart && (
            <Div _flex={1} justify="flex-end" _margin="16px 0px 0px">
              <OutlineButton
                title="Add to Cart"
                onPress={isAuth ? onAddtoCart : triggerLogin}
                leftIcon={
                  <IconFa
                    name="shopping-bag"
                    size={12}
                    color={colors.black80}
                  />
                }
                style={styles.button}
                fontStyle={styles.buttonText}
                disabled={!product.is_commerce}
              />
            </Div>
          )}
        </View>
      </Div>
    </TouchableWithoutFeedback>
  )
}

const ProductCardVertical = ({
  composeStyle,
  width,
  isSaved,
  image,
  setImage,
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
}) => {
  if (!product) {
    return null
  }
  const productName = product.name.replace(/\n|\r/g, '')
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
    <TouchableWithoutFeedback onPress={onPress}>
      <Div style={{ ...composeStyle, width }}>
        <Div _margin="0px 0px 8px" overflow="visible">
          <AbsDiv
            zIndex="2"
            _width="32px"
            _height="32px"
            _background="white"
            onPress={onSave}
            radius="16px">
            <Icon
              name={isSaved ? 'bookmark' : 'bookmark-border'}
              size={18}
              color={isSaved ? colors.black100 : colors.black90}
            />
          </AbsDiv>
          <ImageAutoSchale
            errorStyle={{ width: width, height: 1.5 * width }}
            thumbnailSource={
              typeof thumbnailImage === 'string'
                ? { uri: thumbnailImage }
                : thumbnailImage
            }
            source={typeof image === 'string' ? { uri: image } : image}
            width={width}
            style={{ ...styles.image }}
          />
        </Div>

        <View
          style={{
            // flex: 1,
            alignItems: 'flex-start',
            width: '100%',
            paddingHorizontal: composeStyle.paddingHorizontal,
          }}>
          <Font
            // type="HelveticaNeue"
            style={fontStyle.helveticaBold}
            size={typeDict[type].main}
            // weight="bold"
            _margin="4px"
            color={colors.black100}>
            {brand.name}
          </Font>
          <Font
            size={typeDict[type].sub}
            _margin="4px"
            color={colors.black80}
            numberOfLines={2}
            ellipsizeMode="tail">
            {productName}
          </Font>
          {isAtributesShow && colorAttributes && (
            <ColorList
              selectedId={attributeSelected ? attributeSelected.id : null}
              data={colorAttributes ? colorAttributes.values : []}
              onChange={onColorChange}
            />
          )}
          {variantPrice ? (
            <Price {...variantPrice} />
          ) : isShowRangePrice ? (
            <RangePrice {...price} upTo />
          ) : (
            <Price price={product.price} />
          )}

          {onAddtoCart && (
            <Div _width="100%" justify="flex-end" _margin="16px 0px 0px">
              <OutlineButton
                title="Add to Cart"
                onPress={isAuth ? onAddtoCart : triggerLogin}
                leftIcon={
                  <IconFa
                    name="shopping-bag"
                    size={12}
                    color={colors.black80}
                  />
                }
                style={styles.button}
                fontStyle={styles.buttonText}
                disabled={!product.is_commerce}
              />
            </Div>
          )}
        </View>
      </Div>
    </TouchableWithoutFeedback>
  )
}

export default memo(ProductCard)
