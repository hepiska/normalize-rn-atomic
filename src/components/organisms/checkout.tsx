import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Font, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import {
  futuraBlackFont24,
  helveticaBlackFont14,
  fontStyle,
} from '@components/commont-styles'
import { connect } from 'react-redux'
import { addressListData } from '@hocs/data/address'
import AddressCart from '../molecules/address-cart'
import ItemSummaryCart from '../molecules/item-summary-cart'
import { formatRupiah } from '@src/utils/helpers'
import TotalPayCart from '@components/molecules/total-pay-cart'
import { bindActionCreators } from 'redux'
import { getUserAddressById } from '@modules/address/action'
import { navigate } from '@src/root-navigation'
import { setCheckoutAddressData, payNow } from '@modules/checkout/action'

const AddressHoc = addressListData(AddressCart)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  checkoutAddress: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.black50,
    borderRadius: 8,
  },
  shippingAddress: {
    marginTop: 24,
    padding: 16,
  },
  orderSummaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  futura24: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 24,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
})

class Checkout extends Component<any, any> {
  state = {
    deliveryProtection: 0,
  }

  componentDidMount() {
    const {
      getUserAddressById,
      setCheckoutAddressData,
      userCheckoutAddress,
    } = this.props
    getUserAddressById()
    setCheckoutAddressData(userCheckoutAddress.id)
  }

  onChooseAddress = () => {
    const checkoutList = this.props.data
    navigate('ChooseAddress', {
      checkoutList,
    })
  }

  onPayNow = (item, totalPrice) => async () => {
    const { payNow, userCheckoutAddress } = this.props
    await payNow(item, userCheckoutAddress.id)
  }

  render() {
    const {
      data,
      carts,
      totalPrice,
      userCheckoutAddress,
      shippingCost,
      availablePayNow,
      loadingCheckout,
    } = this.props
    const { deliveryProtection } = this.state

    return (
      userCheckoutAddress && (
        <>
          <ScrollDiv>
            <View {...styles.container}>
              {/* shipment */}
              <View>
                <Text style={{ ...styles.futura24, color: colors.black100 }}>
                  Shipment Address
                </Text>
                <AddressHoc
                  style={{ ...styles.checkoutAddress }}
                  type="checkout"
                  addressId={userCheckoutAddress.id}
                  onPress={this.onChooseAddress}
                />
              </View>

              {/* item summary */}
              <View style={{ marginTop: 40 }}>
                <Text style={{ ...styles.futura24 }}>Item Summary</Text>
                {data.map((item, index) => {
                  return (
                    <ItemSummaryCart
                      item={item}
                      key={`item-summary-${index}`}
                      index={index}
                      address={userCheckoutAddress}
                    />
                  )
                })}
              </View>

              {/* order summary */}
              <View style={{ marginTop: 40 }}>
                <Text style={{ ...styles.futura24 }}>Order Summary</Text>
                <View {...styles.orderSummaryDetail}>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    {`Product Total • ${carts.length} Items`}
                  </Text>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    {formatRupiah(totalPrice)}
                  </Text>
                </View>
                <View {...styles.orderSummaryDetail}>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    {`Shipping Cost`}
                  </Text>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    {formatRupiah(shippingCost)}
                  </Text>
                </View>
                {/* <View {...styles.orderSummaryDetail}>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    Delivery Protection
                  </Text>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    {formatRupiah(deliveryProtection)}
                  </Text>
                </View> */}
              </View>
            </View>
          </ScrollDiv>
          <TotalPayCart
            items={carts}
            buttonText="Pay Now"
            onCheckout={this.onPayNow}
            shippingCost={shippingCost}
            deliveryProtection={deliveryProtection}
            enableButton={availablePayNow}
            loading={loadingCheckout}
          />
        </>
      )
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getUserAddressById, setCheckoutAddressData, payNow },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const dataCarts = ownProps.carts

  /* revisi: pindah ke dalam render sebelum return */
  let manipulatedData = []
  let groupData = dataCarts.reduce((total, currentValue) => {
    let selectedItem = state.carts.data[currentValue]
    let warehouse = selectedItem.variant.product.address
    if (total[warehouse.id]) {
      total[warehouse.id].data.push(currentValue)
    } else {
      total[warehouse.id] = {
        title: warehouse.label + ' - ' + warehouse.city.name,
        data: [currentValue],
        id: warehouse.id,
      }
    }
    return total
  }, {})
  manipulatedData = Object.keys(groupData).map(k => groupData[k])

  const primaryAddress = Object.keys(state.addresses.data).reduce(
    (res, val) => {
      let dat = state.addresses.data[val].is_primary
        ? state.addresses.data[val]
        : res
      return dat
    },
    {},
  )
  const userCheckoutAddress = state.checkout.data.address_id
    ? { id: state.checkout.data.address_id }
    : primaryAddress

  const shippingCost =
    Object.keys(state.checkout.data.warehouse).length > 0
      ? Object.keys(state.checkout.data.warehouse).reduce(
          (total, currentValue) => {
            total +=
              state.checkout.data.warehouse[currentValue].shipping.shipping_cost
            return total
          },
          0,
        )
      : 0

  const availablePayNow =
    Object.keys(state.checkout.data.warehouse).length === manipulatedData.length

  return {
    data: manipulatedData,
    addresses: state.addresses.order,
    userCheckoutAddress,
    shippingCost,
    availablePayNow,
    loadingCheckout: state.checkout.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
