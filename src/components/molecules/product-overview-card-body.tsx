import React from 'react'
import { Div, Font, Image, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { colors, globalDimention } from '@utils/constants'


interface ProductOverviewCardType {
  product: any,
  type?: string,

}

const typeDict = {
  large: {
    main: 18,
    sub: 16,
  }
}

const ProductOverviewCardBody = ({ product, type = 'large' }: ProductOverviewCardType) => {
  return (
    <Div width="100%" align="flex-start" _padding="16px">
      <Font family='Futura-Bold' size={typeDict[type].main} _margin='4px' color='black'>
        {product.brand}
      </Font>
      <Font size={typeDict[type].main} _margin='4px' color={colors.gray3}>
        {product.name}
      </Font>
      <Font size={typeDict[type].sub} type='title' _margin='4px' >
        {product.price}
      </Font>
    </Div>
  )
}

export default ProductOverviewCardBody
