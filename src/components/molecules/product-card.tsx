import React from 'react'
import { ViewStyle, StyleSheet } from 'react-native'
import styled from 'styled-components'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, Image, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'


const AbsDiv = styled(Div)`
    position:absolute;
    right:16px;
    top:16px;
`

interface styleTypes {
  _margin: string,
  _width: string | number
}

interface ProductCard {
  product: any,
  style?: ViewStyle

}

const typeDict = {
  large: {
    main: 18,
    sub: 16,
  },
  med: {
    main: 16,
    sub: 14,
  }
}


const styles = StyleSheet.create({
  image: {
    borderRadius: 8
  },
  defaultStyle: {
    width: 156,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 8,
  }
})


const ProductCard = ({ product, style }: ProductCard) => {
  const type = 'med'
  const composeStyle = { ...styles.defaultStyle, ...style }
  const margin = composeStyle.marginRight ? Number(composeStyle.marginRight) : Number(composeStyle.marginHorizontal)
  const width = Number(composeStyle.width) - margin
  const isSaved = false
  return (
    <Div align="flex-start" style={{ ...composeStyle, width }} >
      <AbsDiv zIndex='2'>
        <Icon name='bookmark' size={24} color={isSaved ? colors.black50 : colors.black90} />
      </AbsDiv>
      <ImageAutoSchale
        source={{ uri: product.image_url }}
        width={width}
        style={styles.image} />
      <Font family='Futura-Bold' size={typeDict[type].main} _margin='4px' color='black'>
        {product.brand}
      </Font>
      <Font size={typeDict[type].main} _margin='4px' color={colors.gray3}>
        {product.name}
      </Font>
      <Font size={typeDict[type].sub} type='title' _margin='4px' >
        {product.price}
      </Font>
    </Div >
  )
}

export default ProductCard
