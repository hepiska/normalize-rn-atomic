import React, { useState, useEffect, ReactType, ReactElement } from 'react'
import {
  Image,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TextInput,
} from 'react-native'
import { Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'

interface FieldType {
  title?: string
  placeholder?: string
  onChangeText(text: string): void
  value: string
  inputProps?: TextInput
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
      padd="8px"
      _direction="row"
      justify="flex-start"
      style={[styles.wraper, style]}>
      {leftIcon && leftIcon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...inputProps}
      />
      {rightIcon && rightIcon}
    </Div>
  )
}

export default Field
