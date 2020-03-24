import React from 'react'
import { TextStyle } from 'react-native'
import { Font } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

interface Price {
  value: number
  style?: TextStyle
}

const Price = ({ value, style }: Price) => {
  return (
    <Font
      size={14}
      color={colors.black100}
      type="title"
      _margin="4px"
      style={{
        marginTop: 16,
        ...style,
      }}>
      {formatRupiah(value)}
    </Font>
  )
}

export default Price
