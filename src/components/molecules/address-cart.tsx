import React from 'react'
import { StyleSheet, ViewStyle, View, Text } from 'react-native'
import {
  Font,
  TouchableWithoutFeedback,
  PressAbbleDiv,
} from '@components/atoms/basic'
import styled from 'styled-components'
import { fontStyle, helveticaBlackBoldFont10 } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RadioButton } from '../atoms/radio-button'
import { navigate } from '@src/root-navigation'
import Tooltip from 'rn-tooltip'

const AbsDiv = styled(PressAbbleDiv)`
  position: absolute;
  right: ${({ right }) => right || 0};
  top: ${({ top }) => top || 0};
`
interface AddressCartType {
  type?: string
  style?: ViewStyle
  address: any
  removeAddress: (address: any) => void
  editAddress: (addressId, address: any) => void
  onPress?: () => void
  onChangeAddress?: (id: any) => void
  tempSelectedAddress?: string | number
  isPrimary?: boolean
  setCheckoutAddressData?: (id: any) => void
}

const mapaddressValue = addressRes => {
  const selectedLocation = {}
  if (addressRes) {
    Object.keys(addressRes).forEach(key => {
      if (typeof addressRes[key] === 'object') {
        selectedLocation[`${key}_id`] = addressRes[key].id
      } else {
        selectedLocation[key] = addressRes[key]
      }
    })
  }

  return selectedLocation
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryChips: {
    height: 26,
    width: 96,
    backgroundColor: colors.black10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  helveticaBold10: {
    ...fontStyle.helveticaBold,
    fontSize: 10,
  },
  helvetica10: {
    ...fontStyle.helveticaBold,
    fontSize: 10,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  futuraBold18: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 18,
  },
})

class AddressCart extends React.PureComponent<AddressCartType, any> {
  tooltip = null
  changeAddress = () => {
    const {
      setCheckoutAddressData,
      address: { id: address_id },
    } = this.props
    setCheckoutAddressData(address_id)
  }

  _editAddress = () => {
    const {
      address: { id: address_id },
    } = this.props
    if (this.tooltip) {
      this.tooltip.toggleTooltip()
    }
    navigate('AddNewAddressManual', {
      addressId: address_id,
      type: 'edit',
    })
  }

  _deleteAddress = () => {
    const {
      address: { id: address_id },
    } = this.props
    this.props.removeAddress(address_id)
    if (this.tooltip) {
      this.tooltip.toggleTooltip()
    }
  }
  _setPrimary = () => {
    const { address } = this.props
    const newAddress: any = mapaddressValue(address)
    newAddress.is_primary = true
    this.props.editAddress(address.id, newAddress)
    if (this.tooltip) {
      this.tooltip.toggleTooltip()
    }
  }
  render() {
    const {
      style,
      type,
      address,
      onPress,
      onChangeAddress,
      tempSelectedAddress,
      isPrimary,
    } = this.props

    if (!address) {
      return null
    }

    if (type === 'checkout') {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View {...style} {...styles.divider}>
            <View
              style={{ flex: 0.9, width: '100%', alignItems: 'flex-start' }}>
              <Text
                style={{ ...styles.helveticaBold14, color: colors.black100 }}>
                {address.label}
              </Text>
              <View style={{ width: '100%', marginTop: 16 }}>
                <Text
                  style={{ ...styles.helveticaBold12, color: colors.black80 }}>
                  {address.recipient_name}
                </Text>
              </View>
              <View style={{ width: '100%', marginTop: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black70 }}>
                  {address.label +
                    ', ' +
                    address.district.name +
                    ', ' +
                    address.village.name +
                    ', ' +
                    address.city.name +
                    ', ' +
                    address.region.name +
                    ', ' +
                    address.zip_code.code}
                </Text>
              </View>
              <View style={{ width: '100%', marginTop: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black80 }}>
                  {address.phone_number}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
              <Icon name="chevron-right" size={12} color={colors.black100} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={onChangeAddress(address.id)}>
        <View {...style}>
          <AbsDiv
            top="16px"
            right="-2px"
            zIndex="2"
            _width="26px"
            _height="26px"
            _background={colors.black10}
            onPress={() => {}}
            radius="8px">
            <Tooltip
              ref={ref => {
                this.tooltip = ref
              }}
              actionType="press"
              popover={
                <View
                  style={{
                    alignItems: 'center',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                    width: '100%',
                  }}>
                  <PressAbbleDiv onPress={this._setPrimary}>
                    <View
                      style={{
                        width: '100%',
                        height: 42,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.helveticaBold10,
                          color: '#3067E4',
                        }}>
                        Set as Primary Address
                      </Text>
                    </View>
                  </PressAbbleDiv>
                  <PressAbbleDiv onPress={this._editAddress}>
                    <View
                      style={{
                        width: '100%',
                        height: 42,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.helvetica10,
                          color: colors.black60,
                        }}>
                        Edit Address
                      </Text>
                    </View>
                  </PressAbbleDiv>
                  <PressAbbleDiv onPress={this._deleteAddress}>
                    <View
                      style={{
                        width: '100%',
                        height: 42,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.helvetica10,
                          color: colors.black60,
                        }}>
                        Delete Address
                      </Text>
                    </View>
                  </PressAbbleDiv>
                </View>
              }
              withOverlay={false}
              backgroundColor={colors.black10}
              containerStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                position: 'absolute',
              }}
              height={150}
              width={174}>
              <Icon name="ellipsis-h" size={16} color={colors.black60} />
            </Tooltip>
          </AbsDiv>

          {address.is_primary && (
            <AbsDiv top="16px" right="34px" zIndex="2">
              <View {...styles.primaryChips}>
                <Text style={{ ...styles.helveticaBold10, color: '#3067E4' }}>
                  Primary Address
                </Text>
              </View>
            </AbsDiv>
          )}
          <Text style={{ ...styles.futuraBold18, color: colors.black100 }}>
            {address.label}
          </Text>
          <View {...styles.divider}>
            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
              <View style={{ marginTop: 16 }}>
                <Text
                  style={{ ...styles.helveticaBold14, color: colors.black100 }}>
                  {address.recipient_name}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {address.label +
                    ', ' +
                    address.district.name +
                    ', ' +
                    address.village.name +
                    ', ' +
                    address.city.name +
                    ', ' +
                    address.region.name +
                    ', ' +
                    address.zip_code.code}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {address.phone_number}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
              <RadioButton
                isSelected={tempSelectedAddress === address.id}
                onPress={onChangeAddress(address.id)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AddressCart
