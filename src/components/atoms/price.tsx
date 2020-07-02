import React from 'react'
import { TextStyle, View } from 'react-native'
import { Font, Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import Img from '@components/atoms/image'

import { formatRupiah } from '@utils/helpers'

interface Price {
  current: number
  prev?: number
  style?: TextStyle
  stylePrev?: TextStyle
}

const Price = ({ prev, current, style, stylePrev }: Price) => {
  // const price = `${formatRupiah(from)} - ${formatRupiah(to)}`.split(' ')
  const mainPrice = `${formatRupiah(current)}`.split(' ')
  const disc = Math.ceil(((prev - current) / prev) * 100)

  return (
    <Div
      _direction="row"
      justify="flex-start"
      style={{ flexWrap: 'wrap' }}
      _margin="8px 0px 0px 0px">
      {Boolean(prev) && (
        <Font
          size={11}
          _margin="4px"
          color={colors.black60}
          style={{
            textDecorationLine: 'line-through',
            ...fontStyle.helvetica,
            ...stylePrev,
          }}>
          {formatRupiah(prev)}
        </Font>
      )}
      {mainPrice.map((x, i) => {
        if (i !== mainPrice.length - 1 || !prev) {
          return (
            <Font
              key={`price-${i}`}
              size={14}
              type="title"
              _margin="4px 0px 0px 4px"
              style={{ ...fontStyle.helveticaBold, ...style }}>
              {x}
            </Font>
          )
        }
        if (Boolean(prev) && i === mainPrice.length - 1) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Font
                key={`price-${i}`}
                size={14}
                type="title"
                _margin="4px 0px 0px 4px"
                style={{ ...fontStyle.helveticaBold, ...style }}>
                {x}
              </Font>
              <Div key={i} _margin="4px 4px 4px 12px" overflow="visible">
                <Img
                  source={require('../../assets/icons/badge-discount.png')}
                  style={{
                    position: 'absolute',
                    width: 34,
                    height: 15,
                  }}
                />
                <Font
                  size={10}
                  _margin="0px 0px 0px 8px"
                  color={colors.white}
                  style={{ fontWeight: '700' }}>
                  {disc} %
                </Font>
              </Div>
            </View>
          )
        }
      })}
    </Div>
  )
}

export default Price
