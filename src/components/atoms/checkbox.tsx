import React from 'react'
import { ViewStyle, TextStyle, View } from 'react-native'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@src/utils/constants'

interface CheckboxType {
  text?: string
  fontStyle?: TextStyle
  isChecked?: boolean
  onPress?: Function
  style?: ViewStyle
  disabled?: boolean
}

export const Checkbox = ({
  style,
  text,
  fontStyle = {},
  onPress,
  isChecked,
  disabled = false,
}: CheckboxType) => {
  return (
    <PressAbbleDiv onPress={onPress}>
      <View style={style}>
        <Icon
          name={!isChecked ? 'check-box-outline-blank' : 'check-box'}
          size={16}
          color={colors.black100}
        />
        {text && <Font {...fontStyle}>{text}</Font>}
      </View>
    </PressAbbleDiv>
  )
}
