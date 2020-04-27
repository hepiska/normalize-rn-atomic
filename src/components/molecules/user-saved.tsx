import React from 'react'
import { Div, Font } from '@components/atoms/basic'
import Img from '@components/atoms/image'
import { colors } from '@utils/constants'

interface UserSaved {
  imageUrl: string
}

const UserSaved = ({ imageUrl }: UserSaved) => {
  return (
    <Div _direction="row" justify="flex-start" _margin="8px 0px 0px 4px">
      <Img
        source={imageUrl}
        _width={16}
        _height={16}
        _margin="0px 4px 0px 0px"
        radius={16 / 2}
      />
      <Font size={14} color={colors.black100} style={{ fontWeight: '500' }}>
        agungganteng
        <Font size={14} style={{ fontWeight: 'normal' }}>
          save this
        </Font>
      </Font>
    </Div>
  )
}

export default UserSaved
