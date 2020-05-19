import React from 'react'
import { TextStyle } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import Img from '@components/atoms/image'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

interface RangePrice {
  from: number
  to: number
  exFrom?: number
  exTo?: number
  withDiscount?: boolean
  style?: TextStyle
  upTo?: boolean
}

const RangePrice = ({
  from,
  to,
  exFrom,
  exTo,
  withDiscount,
  style,
  upTo,
}: RangePrice) => {
  const price = `${formatRupiah(from)} - ${formatRupiah(to)}`.split(' ')
  const discount = Math.ceil(
    Math.max((exFrom - from) / exFrom, (exTo - to) / exTo) * 100,
  )
  if (withDiscount) {
    price.push(`${discount}%`)
  }
  return (
    <Div align="flex-start" _margin="8px 0px 0px 0px">
      {exFrom && exTo && (
        <Font
          size={11}
          _margin="4px"
          color={colors.black60}
          style={{
            ...fontStyle.helvetica,
            textDecorationLine: 'line-through',
          }}>
          {`${formatRupiah(exFrom)} - ${formatRupiah(exTo)}`}
        </Font>
      )}

      <Div _direction="row" justify="flex-start" style={{ flexWrap: 'wrap' }}>
        {price.map((x, i) => {
          if (i !== price.length - 1 || !withDiscount) {
            return (
              <Font
                key={`range-price-${i}`}
                size={14}
                type="title"
                _margin="4px 0px 0px 4px"
                style={style}>
                {x}
              </Font>
            )
          } else if (withDiscount && i === price.length - 1) {
            return (
              <Div
                key={`range-price-${i}`}
                _margin="4px 4px 4px 12px"
                overflow="visible">
                <Img
                  // source={
                  //   upTo
                  //     ? require('../../assets/icons/long-badge-discount.png')
                  //     : require('../../assets/icons/badge-discount.png')
                  // }
                  source={require('../../assets/icons/badge-discount.png')}
                  style={{
                    position: 'absolute',
                    width: upTo ? 65 : 31,
                    height: 15,
                  }}
                />
                <Font
                  size={8}
                  _margin="0px 0px 0px 8px"
                  color={colors.white}
                  style={{ fontWeight: '500' }}>
                  {upTo ? `UP TO ${x}` : x}
                </Font>
              </Div>
            )
          }
        })}
      </Div>
    </Div>
  )
}

export default RangePrice
