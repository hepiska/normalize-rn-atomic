import React from 'react'
import { TextStyle } from 'react-native'
import { Font, Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import Img from '@components/atoms/image'

import { formatRupiah } from '@utils/helpers'

interface Price {
  price: number
  discount_price?: number
  style?: TextStyle
}

const Price = ({ price, discount_price, style }: Price) => {
  // const price = `${formatRupiah(from)} - ${formatRupiah(to)}`.split(' ')
  const mainPrice = `${formatRupiah(discount_price || price)}`.split(' ')

  return (
    <Div _direction="row" justify="flex-start" style={{ flexWrap: 'wrap' }}>
      {discount_price && (
        <Font
          type="HelveticaNeue"
          size={11}
          _margin="4px"
          color={colors.black60}
          style={{ textDecorationLine: 'line-through' }}>
          {formatRupiah(price)}
        </Font>
      )}
      {mainPrice.map((x, i) => {
        if (i !== mainPrice.length - 1 || !discount_price) {
          return (
            <Font
              key={`price-${i}`}
              size={14}
              type="title"
              _margin="4px 0px 0px 4px"
              style={{ ...fontStyle, ...style }}>
              {x}
            </Font>
          )
        } else if (discount_price && i === mainPrice.length - 1) {
          return (
            <Div key={i} _margin="4px 4px 4px 12px" overflow="visible">
              <Img
                source={require('../../assets/icons/badge-discount.png')}
                style={{
                  position: 'absolute',
                  width: 31,
                  height: 15,
                }}
              />
              <Font
                size={8}
                _margin="0px 0px 0px 8px"
                color={colors.white}
                style={{ fontWeight: '500' }}>
                {x}
              </Font>
            </Div>
          )
        }
      })}
    </Div>
  )
}

export default Price
