import React from 'react'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

interface ProductOverviewCardType {
  product: any
  type?: string
}

const typeDict = {
  large: {
    main: 18,
    sub: 16,
  },
}

const ProductOverviewCardBody = ({
  product,
  type = 'large',
}: ProductOverviewCardType) => {
  return (
    <Div width="100%" align="flex-start" padd="16px 0px">
      <Font
        family="Futura-Bold"
        size={typeDict[type].main}
        _margin="4px"
        color="black">
        {product.brand.name}
      </Font>
      <Font size={typeDict[type].main} _margin="4px" color={colors.gray3}>
        {product.name}
      </Font>
      <Font size={typeDict[type].sub} type="title" _margin="4px">
        {formatRupiah(product.price)}
      </Font>
    </Div>
  )
}

export default ProductOverviewCardBody
