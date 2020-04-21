import React from 'react'
import { ViewStyle, TextStyle, View } from 'react-native'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@src/utils/constants'

interface RadioButtonType {
  text?: string
  fontStyle?: TextStyle
  isSelected?: boolean
  onPress?: Function | void
  style?: ViewStyle
  disabled?: boolean
}

export const RadioButton = ({
  style,
  text,
  fontStyle = {},
  onPress,
  isSelected,
  disabled = false,
}: RadioButtonType) => {
  return (
    <PressAbbleDiv onPress={onPress}>
      <View style={style}>
        <Icon
          name={!isSelected ? 'radio-button-unchecked' : 'check-circle'}
          size={16}
          color={colors.black100}
        />
        {text && <Font {...fontStyle}>{text}</Font>}
      </View>
    </PressAbbleDiv>
  )
}
