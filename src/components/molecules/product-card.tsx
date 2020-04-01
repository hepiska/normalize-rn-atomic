import React, { useState } from 'react'
import {
  ViewStyle,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import styled from 'styled-components'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font } from '@components/atoms/basic'
import { colors, images } from '@utils/constants'
import Price from '@src/components/atoms/price'
import AddToCartButton from '@src/components/atoms/button-add-to-cart'
import { useNavigation } from '@react-navigation/native'
import RangePrice from '@components/molecules/range-price'
import { setImage as chageImageUri } from '@utils/helpers'
import UserSaved from '@components/molecules/user-saved'
import ColorList from '@components/molecules/color-list'

const AbsDiv = styled(Div)`
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

interface ProductCard {
  product: any
  brand?: any
  onPress: () => void
  style?: ViewExtend
  horizontal?: boolean
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

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
  },
  defaultStyle: {
    width: 156,
    minHeight: 352,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
  },
})

const ProductCard = ({
  product,
  style,
  brand = {},
  onPress,
  horizontal = false,
}: ProductCard) => {
  const type = 'med'
  const composeStyle = { ...styles.defaultStyle, ...style }
  const margin = composeStyle.marginRight
    ? Number(composeStyle.marginRight)
    : Number(composeStyle.paddingHorizontal) * 2
  let width = Number(composeStyle.width) - margin
  width = composeStyle.wrappermargin
    ? width - composeStyle.wrappermargin
    : width

  const isSaved = false

  const imageSource = product.image_url
    ? {
        uri: chageImageUri(product.image_url, { width: 100, height: 150 }),
      }
    : require('../../assets/placeholder/placeholder2.jpg')

  const [image, setImage] = useState(imageSource)
  const [attributeSelected, setAttributeSelected] = useState(null)
  console.log('brand', brand)

  const onAttributeChange = (attribute, index) => () => {
    const random = Math.floor(Math.random() * product.image_urls.length)
    const selected = product.image_urls[random]
    setImage({ uri: selected })
    setAttributeSelected(attribute)
  }

  return horizontal ? (
    <ProductCardHorizontal
      composeStyle={composeStyle}
      width={width}
      image={image}
      setImage={setImage}
      type={type}
      onPress={onPress}
      brand={brand}
      product={product}
      attributeSelected={attributeSelected}
      onAttributeChange={onAttributeChange}
    />
  ) : (
    <ProductCardVertical
      composeStyle={composeStyle}
      width={width}
      isSaved={isSaved}
      onPress={onPress}
      image={image}
      setImage={setImage}
      type={type}
      brand={brand}
      product={product}
      attributeSelected={attributeSelected}
      onAttributeChange={onAttributeChange}
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
  onPress,
  attributeSelected,
  onAttributeChange,
}) => {
  const productName = product.name.replace(/\n|\r/g, '')
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Div
        style={{ ...composeStyle, width: '100%' }}
        _direction="row"
        justify="space-between"
        align="flex-start">
        <Div _width="40%">
          <ImageAutoSchale
            source={image}
            onError={() => {
              setImage(images.product)
            }}
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
            type="HelveticaNeue"
            size={typeDict[type].main}
            weight="bold"
            _margin="0px 4px 4px"
            color={colors.black100}>
            {brand.name}
          </Font>
          <Font
            size={typeDict[type].sub}
            _margin="4px"
            color={colors.black80}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Font>
          {/* <UserSaved imageUrl={imageSource} /> */}
          <RangePrice
            from={1090900}
            to={1890000}
            exFrom={1590000}
            exTo={2390000}
            withDiscount={true}
          />
          <AddToCartButton />
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
  onPress,
  attributeSelected,
  onAttributeChange,
}) => {
  const productName = product.name.replace(/\n|\r/g, '')

  const colorAttributes =
    product.attributes && product.attributes.find(x => x.label === 'Color')
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Div style={{ ...composeStyle, width }}>
        <Div _margin="0px 0px 8px" _width="100%">
          <AbsDiv zIndex="2">
            <Icon
              name="bookmark"
              size={24}
              color={isSaved ? colors.black50 : colors.black90}
            />
          </AbsDiv>
          <ImageAutoSchale
            source={image}
            onError={() => {
              setImage(images.product)
            }}
            width={width}
            style={styles.image}
          />
        </Div>

        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: composeStyle.paddingHorizontal,
          }}>
          <Font
            type="HelveticaNeue"
            size={typeDict[type].main}
            weight="bold"
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
          {/* {product.attributes && (
          <ColorList
            selectedId={attributeSelected ? attributeSelected.id : null}
            data={colorAttributes ? colorAttributes.values : []}
            onChange={onAttributeChange}
          />
        )} */}
          <Price value={1000} />
          <AddToCartButton />
        </View>
      </Div>
    </TouchableWithoutFeedback>
  )
}

export default ProductCard
