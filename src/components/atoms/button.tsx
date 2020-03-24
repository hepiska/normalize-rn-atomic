import React, { useState, useEffect, ReactType, ReactElement } from 'react'
import { Image, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'

interface ButtonType {
  title: string
  fontStyle?: TextStyle
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  style?: ViewStyle
  onPress: Function
  disabled?: boolean
}

StyleSheet.absoluteFill

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
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    borderRadius: 8,
    backgroundColor: colors.black50,
  },
})

interface KartesiusKoorType {
  x: number
  y: number
}

interface GradienButtonType extends ButtonType {
  start: KartesiusKoorType
  end: KartesiusKoorType
  colors: Array<string>
}
export const GradientButton = ({
  start,
  end,
  colors,
  style,
  onPress,
  fontStyle,
  title,
}: GradienButtonType) => {
  return (
    <PressAbbleDiv
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      _direction="row"
      align="stretch">
      <LinearGradient
        start={start}
        end={end}
        colors={colors}
        style={styles.linearGradient}>
        <Font
          family="HelveticaNeue"
          size="14px"
          style={fontStyle}
          {...fontStyle}>
          {title}
        </Font>
      </LinearGradient>
    </PressAbbleDiv>
  )
}

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
  disabled = false,
}: ButtonType) => {
  return (
    <PressAbbleDiv
      padd="8px"
      _direction="row"
      style={!disabled ? [styles.fill, style] : [style, styles.disabled]}
      onPress={!disabled ? onPress : null}>
      {leftIcon && leftIcon}
      <Font family="HelveticaNeue" size="14px" style={fontStyle}>
        {title}
      </Font>
      {rightIcon && rightIcon}
    </PressAbbleDiv>
  )
}
