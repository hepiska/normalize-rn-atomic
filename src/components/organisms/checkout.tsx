import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Font, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import {
  futuraBlackFont24,
  helveticaBlackFont14,
} from '@components/commont-styles'
import { connect } from 'react-redux'
import AddressCart from '../molecules/address-cart'
import ItemSummaryCart from '../molecules/item-summary-cart'
import { formatRupiah } from '@src/utils/helpers'
import TotalPayCart from '@components/molecules/total-pay-cart'

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

const dummy = [
  {
    type: 'checkout',
    name: 'Doni Kusnandar',
    location: 'Apartment Senopati',
    address:
      'Jl. Senopati Dalam No.8B, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190',
    phone: '082240203541',
    style: styles.checkoutAddress,
  },
  // {
  //   type: 'shipping',
  //   name: 'Doni Kusnandar',
  //   location: 'Apartment Senopati',
  //   address:
  //     'Jl. Senopati Dalam No.8B, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190',
  //   phone: '082240203541',
  //   style: styles.shippingAddress,
  // },
  // {
  //   type: 'shipping',
  //   name: 'Doni Kusnandar',
  //   location: 'Apartment Senopati',
  //   address:
  //     'Jl. Senopati Dalam No.8B, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190',
  //   phone: '082240203541',
  //   style: styles.shippingAddress,
  //   isPrimary: true,
  // },
]

class Checkout extends Component<any, any> {
  state = {
    shippingCost: 10000,
    deliveryProtection: 20000,
  }
  render() {
    const { data, carts, totalPrice } = this.props
    const { shippingCost, deliveryProtection } = this.state

    return (
      <>
        <ScrollDiv>
          <View {...styles.container}>
            {/* shipment */}
            <View>
              <Font {...futuraBlackFont24}>Shipment Address</Font>
              {dummy.map((_dummy, key) => (
                <AddressCart
                  key={`address-${key}`}
                  type={_dummy.type}
                  style={_dummy.style}
                  location={_dummy.location}
                  name={_dummy.name}
                  address={_dummy.address}
                  phone={_dummy.phone}
                  // isPrimary={_dummy.isPrimary}
                  onPress={() => {}}
                />
              ))}
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
          onCheckout={(item, totalPrice) => {
            console.log('total price ---', totalPrice)
          }}
          shippingCost={shippingCost}
          deliveryProtection={deliveryProtection}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const dataCarts = ownProps.carts
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
      }
    }
    return total
  }, {})
  manipulatedData = Object.keys(groupData).map(k => groupData[k])
  return {
    data: manipulatedData,
  }
}

export default connect(mapStateToProps, null)(Checkout)
