import React, { ReactElement, memo } from 'react'
import {
  ViewStyle,
  TextStyle,
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Font, PressAbbleDiv, Div } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { helveticaBlackFont12, fontStyle } from '@components/commont-styles'
import Icon from 'react-native-vector-icons/FontAwesome5'

interface FieldType {
  placeholder?: string
  onChangeQty(text: string): void
  onIncrease(text: String | number): void
  onDecrease(text: String | number): void
  qty: string | number
  inputProps?: any
  style?: any
  incDisable?: Boolean
}

const styles = StyleSheet.create({
  div: {
    height: 24,
    flexDirection: 'row',
  },
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0,
  },
  leftButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  button: {
    backgroundColor: colors.black10,
    borderWidth: 1,
    borderColor: colors.black50,
    width: 24,
    height: 24,
  },
  input: {
    borderColor: colors.black50,
    borderWidth: 1,
    height: 24,
    width: 32,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

const FieldQuantity = ({
  onChangeQty,
  qty,
  placeholder,
  onIncrease,
  onDecrease,
  style,
  inputProps,
  incDisable = true,
}: FieldType) => {
  const _onInc = () => {
    onIncrease(Number(qty) + 1)
  }
  const _onDec = () => {
    onDecrease(Number(qty) - 1)
  }
  return (
    <Div style={style} {...styles.div}>
      <PressAbbleDiv onPress={qty > 1 ? _onDec : null}>
        <Div {...styles.leftButton} {...styles.button}>
          <Icon name="minus" size={8} color={colors.black60} />
        </Div>
        {qty <= 1 && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(255,255,255, 0.5)' },
            ]}
          />
        )}
      </PressAbbleDiv>
      <Div {...styles.input}>
        <Text style={{ ...styles.helvetica12, color: colors.black80 }}>
          {qty}
        </Text>
      </Div>
      <PressAbbleDiv onPress={incDisable ? null : _onInc}>
        <Div {...styles.rightButton} {...styles.button}>
          <Icon name="plus" size={8} color={colors.black60} />
        </Div>
        {incDisable && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(255,255,255, 0.5)' },
            ]}
          />
        )}
      </PressAbbleDiv>
    </Div>
  )
}

export default memo(FieldQuantity)
