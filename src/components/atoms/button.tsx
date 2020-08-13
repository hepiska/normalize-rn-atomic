import React, { ReactElement } from 'react'
import { ViewStyle, TextStyle, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CirleLoader from '@src/components/atoms/loaders/circle'
import { colors as constantsColors } from '@src/utils/constants'

interface ButtonType {
  title: string
  loading?: boolean
  fontStyle?: TextStyle
  leftIcon?: ReactElement | string
  rightIcon?: ReactElement | string
  style?: ViewStyle
  onPress: Function
  disabled?: boolean
  loaderColor?: string
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
    backgroundColor: constantsColors.black60,
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
  colorsDisabled?: Array<string>
}
export const GradientButton = ({
  start,
  end,
  colors,
  style,
  loading,
  onPress,
  fontStyle,
  disabled = false,
  title,
  leftIcon,
  colorsDisabled,
}: GradienButtonType) => {
  return (
    <PressAbbleDiv
      onPress={!loading && !disabled ? onPress : null}
      style={{ ...styles.container, ...style }}
      _direction="row"
      align="stretch">
      <LinearGradient
        start={start}
        end={end}
        colors={
          !disabled
            ? colors
            : colorsDisabled || [
                constantsColors.black60,
                constantsColors.black60,
              ]
        }
        style={[styles.linearGradient, StyleSheet.absoluteFill]}>
        {leftIcon && typeof leftIcon === 'string' ? (
          <Icon
            name={leftIcon}
            color={fontStyle.color || constantsColors.black100}
            size={fontStyle.fontSize || 14}
          />
        ) : (
          leftIcon
        )}
        {loading ? (
          <CirleLoader style={{ width: 24, height: 24 }} size={24} />
        ) : (
          <Font
            family="HelveticaNeue"
            size="14px"
            style={fontStyle}
            {...fontStyle}>
            {title}
          </Font>
        )}
      </LinearGradient>
    </PressAbbleDiv>
  )
}

export const OutlineButton = ({
  style,
  title,
  disabled,
  loading,
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
      onPress={!loading && !disabled ? onPress : null}>
      {leftIcon && typeof leftIcon === 'string' ? (
        <Icon
          name={leftIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 14}
        />
      ) : (
        leftIcon
      )}
      {loading ? (
        <CirleLoader name="spinner" size={24} />
      ) : (
        <Font
          family="HelveticaNeue"
          size="14px"
          style={{ marginLeft: 8, ...fontStyle }}>
          {title}
        </Font>
      )}

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
  loading,
  leftIcon,
  onPress,
  rightIcon,
  disabled = false,
  loaderColor,
}: ButtonType) => {
  return (
    <PressAbbleDiv
      padd="8px"
      _direction="row"
      onPress={!loading && !disabled ? onPress : null}
      style={!disabled ? [styles.fill, style] : [style, styles.disabled]}>
      {leftIcon && typeof leftIcon === 'string' ? (
        <Icon
          name={leftIcon}
          color={fontStyle.color || constantsColors.black100}
          size={fontStyle.fontSize || 14}
        />
      ) : (
        leftIcon
      )}
      {loading ? (
        <CirleLoader
          style={{ width: 20, height: 20 }}
          name="spinner"
          size={24}
          loaderColor={loaderColor}
        />
      ) : (
        <Font
          family="HelveticaNeue"
          size="14px"
          style={{ marginLeft: 8, ...fontStyle }}>
          {title}
        </Font>
      )}

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
