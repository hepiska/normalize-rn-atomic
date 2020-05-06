import React from 'react'
import { StyleSheet, ViewStyle, View, Text } from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { formatRupiah } from '@utils/helpers'
import { fontStyle } from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { RadioButton } from '@components/atoms/radio-button'
import { setImage as changeImageUri } from '@utils/helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeOptionShipment } from '@modules/shipment/action'
import { addShippingMethodData } from '@modules/checkout/action'

interface CourierCartType {
  style?: ViewStyle
  name?: string
  isPreffered?: boolean
  price?: string | number
  onPress?: () => void
  changeOptionShipment?: (
    variantId: any,
    shippingMethodId: any,
    addressid: any,
  ) => void
  addShippingMethodData?: (data: any) => void
  type?: string
  courier?: any
  variantIds?: any
  addressId?: any
  shippingMethodId?: any
  courierId?: any
  warehouseId?: any
  isSelected?: boolean
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: colors.black50,
    borderWidth: 1,
    padding: 16,
  },
  containerChooseCourier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  image: {
    width: 88,
    height: 66,
    borderRadius: 8,
  },
  information: {
    marginLeft: 16,
  },
  preffered: {
    backgroundColor: colors.black10,
    borderRadius: 100,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
})

class CourierCart extends React.PureComponent<CourierCartType, any> {
  state = {
    defaultImage: null,
  }

  changeCourier = () => {
    const {
      changeOptionShipment,
      variantIds,
      addressId,
      shippingMethodId,
      warehouseId,
      courier,
      addShippingMethodData,
    } = this.props

    changeOptionShipment(variantIds, shippingMethodId, addressId)

    addShippingMethodData({
      id: warehouseId,
      shipping: courier,
    })
  }

  render() {
    const {
      style,
      name,
      isPreffered,
      price,
      onPress,
      type,
      courier,
      shippingMethodId,
      courierId,
      isSelected,
    } = this.props

    const image =
      this.state.defaultImage ||
      (!!courier.courier.image_url
        ? changeImageUri(courier.courier.image_url, { ...styles.image })
        : defaultImages.product)

    if (type === 'choose-courier') {
      return (
        <TouchableWithoutFeedback
          onPress={courier.is_available ? this.changeCourier : () => {}}>
          <View>
            <View
              {...style}
              {...styles.containerChooseCourier}
              accessibilityState={{ disabled: Boolean(courier.is_available) }}>
              <View style={{ flexDirection: 'row' }}>
                <ImageAutoSchale
                  source={typeof image === 'string' ? { uri: image } : image}
                  onError={() => {
                    this.setState({ defaultImage: defaultImages.product })
                  }}
                  style={styles.image}
                />
                <View {...styles.information}>
                  {/* {isPreffered && (
                <View {...styles.preffered}>
                  <Icon name="check-circle" size={10} color={colors.black100} />
                  <Font {...helveticaBlackBoldFont10} style={{ marginLeft: 6 }}>
                    The Shonet Preffered
                  </Font>
                </View>
              )} */}
                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={{ ...styles.helvetica12, color: colors.black60 }}>
                      {courier.courier.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.helveticaBold14,
                      color: colors.black100,
                    }}>
                    {formatRupiah(courier.shipping_cost)}
                  </Text>
                </View>
              </View>
              <RadioButton
                isSelected={isSelected}
                onPress={courier.is_available ? this.changeCourier : () => {}}
              />
            </View>
            {!courier.is_available && (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: 'rgba(255,255,255, 0.5)' },
                ]}
              />
            )}
            {!courier.is_available && (
              <View
                style={{
                  marginTop: 16,
                  backgroundColor: 'rgba(26, 26, 26, 0.04)',
                  borderRadius: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <Text style={{ ...styles.helvetica12, color: colors.black100 }}>
                  Courier doesn’t support delivery into your address
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View {...style} {...styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <ImageAutoSchale
              source={{ uri: image }}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <View {...styles.information}>
              {/* {isPreffered && (
                <View {...styles.preffered}>
                  <Icon name="check-circle" size={10} color={colors.black100} />
                  <Font {...helveticaBlackBoldFont10} style={{ marginLeft: 6 }}>
                    The Shonet Preffered
                  </Font>
                </View>
              )} */}
              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black60 }}>
                  {courier.courier.name}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    ...styles.helveticaBold14,
                    color: colors.black100,
                  }}>
                  {formatRupiah(courier.shipping_cost)}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View>
              <Icon name="chevron-right" size={12} color={colors.black100} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeOptionShipment,
      addShippingMethodData,
    },
    dispatch,
  )
const mapStateToProps = (state, ownProps) => {
  const shippingMethodId = ownProps.courier.id
  const courierId = ownProps.courier.courier.id
  const _warehouseId = ownProps.warehouseId

  /* revisi: pindah ke dalam render sebelum return */
  const storeWarehouse = state.checkout.data.warehouse[_warehouseId]
  const selectedShippingMethodId = storeWarehouse?.shipping.id || null
  const selectedCourierId = storeWarehouse?.shipping.courier.id || null

  return {
    isSelected:
      shippingMethodId === selectedShippingMethodId &&
      courierId === selectedCourierId,
    shippingMethodId,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourierCart)
