import React from 'react'
import { ViewStyle, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Div,
  Font,
  Image,
  ScrollDiv,
  PressAbbleDiv,
} from '@components/atoms/basic'
import { formatRupiah } from '@utils/helpers'
import { colors } from '@utils/constants'

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
  style?: ViewExtend
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

const ProductCard = ({ product, style, brand }: ProductCard) => {
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
        uri:
          product.image_url +
          '?w=450&h=600&fit=fillmax&fill=solid&fill-color=white',
      }
    : require('../../assets/placeholder/placeholder2.jpg')
  return (
    <Div style={{ ...composeStyle, width }}>
      <Div>
        <AbsDiv zIndex="2">
          <Icon
            name="bookmark"
            size={24}
            color={isSaved ? colors.black50 : colors.black90}
          />
        </AbsDiv>
        <ImageAutoSchale
          source={imageSource}
          width={width}
          style={styles.image}
        />
      </Div>

      <View
        style={{
          width: '100%',
          paddingHorizontal: composeStyle.paddingHorizontal,
        }}>
        <Font
          type="HelveticaNeue"
          size={typeDict[type].main}
          weight="bold"
          _margin="4px"
          color="black">
          {brand.name}
        </Font>
        <Font size={typeDict[type].main} _margin="4px" color={colors.gray3}>
          {product.name}
        </Font>
        <Font size={typeDict[type].sub} type="title" _margin="4px">
          {formatRupiah(product.price)}
        </Font>
      </View>
    </Div>
  )
}

export default ProductCard
