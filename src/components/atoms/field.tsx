import React, { ReactElement } from 'react'
import { ViewStyle, StyleSheet, TextInput, Platform } from 'react-native'
import { Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'

interface FieldType {
  title?: string
  placeholder?: string
  onChangeText(text: string): void
  value: string
  inputProps?: TextInputProps
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  style?: ViewStyle
}

const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.black50,
    borderRadius: 8,
    flex: 1,
  },
})

const Field = ({
  style,
  leftIcon,
  onChangeText,
  rightIcon,
  value = '',
  placeholder = 'placeholder...',
  inputProps,
}: FieldType) => {
  return (
    <Div
      padd={Platform.OS === 'ios' ? '8px' : '0px 8px'}
      _direction="row"
      overflow="visible"
      justify="flex-start"
      style={[styles.wraper, style]}>
      {leftIcon && leftIcon}
      <TextInput
        value={value}
        style={{ flex: 1 }}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...inputProps}
      />
      {rightIcon && rightIcon}
    </Div>
  )
}

export default Field
