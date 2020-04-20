import React from 'react'
import { StyleSheet, ViewStyle, View } from 'react-native'
import {
  Div,
  Image,
  Font,
  TouchableWithoutFeedback,
  PressAbbleDiv,
} from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import styled from 'styled-components'
import {
  helveticaBlackBold,
  helveticaBlackFont12,
  futuraTitleFont,
  helveticaBlackFont14,
} from '@components/commont-styles'
import { colors } from '@utils/constants'
import { Button } from '@components/atoms/button'
import InviniteLoader from '@components/atoms/loaders/invinite'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RadioButton } from '../atoms/radio-button'

const AbsDiv = styled(PressAbbleDiv)`
  position: absolute;
  right: ${({ right }) => right || 0};
  top: ${({ top }) => top || 0};
`
interface AddressCartType {
  type: string
  style?: ViewStyle
  location: string
  name: string
  address: string
  phone: string
  onPress: () => void
  isPrimary?: boolean
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryChips: {
    height: 22,
    width: 96,
    backgroundColor: 'rgba(48, 103, 228, 0.05)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
})

class AddressCart extends React.PureComponent<AddressCartType, any> {
  render() {
    const {
      style,
      type,
      location,
      name,
      address,
      phone,
      onPress,
      isPrimary,
    } = this.props

    if (type === 'checkout') {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View {...style} {...styles.divider}>
            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
              <Font {...helveticaBlackBold}>{location}</Font>
              <Font {...helveticaBlackFont12} style={{ marginTop: 16 }}>
                {name}
              </Font>
              <Font
                {...helveticaBlackFont12}
                style={{ marginTop: 8, color: colors.black70 }}>
                {address}
              </Font>
              <Font {...helveticaBlackFont12} style={{ marginTop: 8 }}>
                {phone}
              </Font>
            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
              <Icon name="chevron-right" size={12} color={colors.black100} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View {...style}>
          <AbsDiv
            top={style.padding}
            right={style.padding}
            zIndex="2"
            _width="26px"
            _height="26px"
            _background={colors.black10}
            onPress={() => {}}
            radius="8px">
            <Icon name="ellipsis-h" size={16} color={colors.black60} />
          </AbsDiv>

          {isPrimary && (
            <View {...styles.primaryChips}>
              <Font
                type="HelveticaNeue"
                color="#3067E4"
                weight="bold"
                size="10">
                Primary Address
              </Font>
            </View>
          )}
          <Font {...futuraTitleFont}>{location}</Font>
          <View {...styles.divider}>
            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
              <Font {...helveticaBlackFont14} style={{ marginTop: 16 }}>
                {name}
              </Font>
              <Font
                {...helveticaBlackFont14}
                style={{ marginTop: 8, color: colors.black70 }}>
                {address}
              </Font>
              <Font
                {...helveticaBlackFont14}
                style={{ marginTop: 8, color: colors.black70 }}>
                {phone}
              </Font>
            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
              <RadioButton isSelected={isPrimary} onPress={() => {}} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddressCart
