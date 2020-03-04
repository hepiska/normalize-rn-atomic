import React, { useState, useEffect, ReactType, ReactElement } from 'react'
import { Image, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'

interface ButtonType {
  title: string
  fontStyle?: TextStyle
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  style?: ViewStyle
  onPress: Function
}

const styles = StyleSheet.create({
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  fill: {
    borderRadius: 8,
    backgroundColor: 'white',
  },
})

export const OutlineButton = ({
  style,
  title,
  fontStyle,
  leftIcon,
  rightIcon,
  onPress,
}: ButtonType) => {
  return (
    <PressAbbleDiv
      padd="8px"
      _direction="row"
      style={[styles.outline, style]}
      onPress={onPress}>
      {leftIcon && leftIcon}
      <Font family="HelveticaNeue" size="14px" style={fontStyle}>
        {title}
      </Font>
      {rightIcon && rightIcon}
    </PressAbbleDiv>
  )
}

export const Button = ({
  style,
  title,
  fontStyle,
  leftIcon,
  onPress,
  rightIcon,
}: ButtonType) => {
  return (
    <PressAbbleDiv
      padd="8px"
      _direction="row"
      style={[styles.fill, style]}
      onPress={onPress}>
      {leftIcon && leftIcon}
      <Font family="HelveticaNeue" size="14px" style={fontStyle}>
        {title}
      </Font>
      {rightIcon && rightIcon}
    </PressAbbleDiv>
  )
}
