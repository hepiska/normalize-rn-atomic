import React, { ReactElement } from 'react'
import { ViewStyle, TextStyle, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { colors as constantsColors } from '@src/utils/constants'

interface ButtonType {
  title: string
  fontStyle?: TextStyle
  leftIcon?: ReactElement | string
  rightIcon?: ReactElement | string
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
    flexDirection: 'row',
  },
  disabled: {
    borderRadius: 8,
    backgroundColor: constantsColors.black50,
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
  disabled = false,
  title,
  leftIcon,
}: GradienButtonType) => {
  return (
    <PressAbbleDiv
      onPress={!disabled ? onPress : null}
      style={{ ...styles.container, ...style }}
      _direction="row"
      align="stretch">
      <LinearGradient
        start={start}
        end={end}
        colors={
          !disabled ? colors : [constantsColors.black50, constantsColors.gray5]
        }
        style={styles.linearGradient}>
        {leftIcon && typeof leftIcon === 'string' ? (
          <Icon
            name={leftIcon}
            color={fontStyle.color || constantsColors.black100}
            size={fontStyle.fontSize || 14}
          />
        ) : (
          leftIcon
        )}
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
  fontStyle = {},
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
      {leftIcon && typeof leftIcon === 'string' ? (
        <Icon
          name={leftIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 14}
        />
      ) : (
        leftIcon
      )}
      <Font
        family="HelveticaNeue"
        size="14px"
        style={{ marginLeft: 8, ...fontStyle }}>
        {title}
      </Font>
      {rightIcon && typeof rightIcon === 'string' ? (
        <Icon
          name={rightIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 16}
        />
      ) : (
        rightIcon
      )}
    </PressAbbleDiv>
  )
}

export const Button = ({
  style,
  title,
  fontStyle = {},
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
      {leftIcon && typeof leftIcon === 'string' ? (
        <Icon
          name={leftIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 14}
        />
      ) : (
        leftIcon
      )}
      <Font
        family="HelveticaNeue"
        size="14px"
        style={{ marginLeft: 8, ...fontStyle }}>
        {title}
      </Font>
      {rightIcon && typeof rightIcon === 'string' ? (
        <Icon
          name={rightIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 16}
        />
      ) : (
        rightIcon
      )}
    </PressAbbleDiv>
  )
}
