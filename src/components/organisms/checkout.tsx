import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Font, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import {
  futuraBlackFont24,
  helveticaBlackFont14,
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
    navigate('ChooseAddress', {})
  }

  onPayNow = (item, totalPrice) => () => {
    const { payNow, userCheckoutAddress, loadingCheckout } = this.props
    // payNow(item, userCheckoutAddress.id)

    if (!loadingCheckout) {
      navigate('Screens', {
        screen: 'PaymentMethod',
      })
    }
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
                <Font {...futuraBlackFont24}>Shipment Address</Font>
                <AddressHoc
                  style={{ ...styles.checkoutAddress }}
                  type="checkout"
                  addressId={userCheckoutAddress.id}
                  onPress={this.onChooseAddress}
                />
              </View>

              {/* item summary */}
              <View style={{ marginTop: 40 }}>
                <Font {...futuraBlackFont24}>Item Summary</Font>
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
                <Font {...futuraBlackFont24}>Order Summary</Font>
                <View {...styles.orderSummaryDetail}>
                  <Font
                    {...helveticaBlackFont14}
                    color={
                      colors.black100
                    }>{`Product Total • ${carts.length} Items`}</Font>
                  <Font {...helveticaBlackFont14} color={colors.black100}>
                    {formatRupiah(totalPrice)}
                  </Font>
                </View>
                <View {...styles.orderSummaryDetail}>
                  <Font
                    {...helveticaBlackFont14}
                    color={colors.black100}>{`Shipping Cost`}</Font>
                  <Font {...helveticaBlackFont14} color={colors.black100}>
                    {formatRupiah(shippingCost)}
                  </Font>
                </View>
                <View {...styles.orderSummaryDetail}>
                  <Font
                    {...helveticaBlackFont14}
                    color={colors.black100}>{`Delivery Protection`}</Font>
                  <Font {...helveticaBlackFont14} color={colors.black100}>
                    {formatRupiah(deliveryProtection)}
                  </Font>
                </View>
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
  console.log('state ---', state)
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
        title: warehouse.label,
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
