import React from 'react'
import { StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import Img from '@components/atoms/image'
import { fontStyle } from '@components/commont-styles'
import { images, colors } from '@src/utils/constants'

interface ProductOverviewCart {
  image: any
  brand: string
  name: string
  sale?: boolean
}

const styles = StyleSheet.create({
  image: {
    width: 108,
    height: 162,
    borderRadius: 8,
    marginRight: 16,
  },
  saleIcon: {
    width: 56,
    height: 26,
    marginBottom: 8,
  },
})

const ProductOverviewCart: React.FC<ProductOverviewCart> = ({
  image,
  brand,
  name,
  sale = false,
}) => {
  return (
    <Div _direction="row" align="flex-start" _margin="0px 0px 24px">
      <Img source={image} style={styles.image} />
      <Div align="flex-start">
        {sale && (
          <Img
            source={require('../../assets/icons/badge-sale.png')}
            style={styles.saleIcon}
          />
        )}
        <Font
          type="HelveticaNeue"
          size={16}
          weight="bold"
          color={colors.black100}
          _margin="0px 0px 8px">
          {brand}
        </Font>
        <Font
          style={{ ...fontStyle.helvetica }}
          size={14}
          color={colors.black100}>
          {name}
        </Font>
      </Div>
    </Div>
  )
}

export default ProductOverviewCart
