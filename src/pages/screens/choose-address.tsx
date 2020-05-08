import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { Div, ScrollDiv } from '@components/atoms/basic'
import { GradientButton } from '@components/atoms/button'
import { addressListData } from '@hocs/data/address'
import AddressCart from '@components/molecules/address-cart'
import { colors } from '@src/utils/constants'
import { getUserAddressById } from '@modules/address/action'
import { getOptionShipment } from '@modules/shipment/action'

import Icon from 'react-native-vector-icons/FontAwesome'
import {
  setCheckoutAddressData,
  addShippingMethodData,
  updateCourier,
} from '@modules/checkout/action'

const AddressHoc = addressListData(AddressCart)

const styles = StyleSheet.create({
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
})

class ChooseAddressPage extends Component<any, any> {
  state = {
    tempSelectedAddress: this.props.selectedAddress,
  }

  componentDidMount() {
    this.props.getUserAddressById()
  }

  componentWillUnmount() {
    const data = this.props.route.params.checkoutList
    const addressId = this.state.tempSelectedAddress

    data.map(v => {
      const warehouseId = v.id
      const cartsId = v.data
      const qty = cartsId.reduce((result, item) => {
        const quantity = this.props.cartState[item].qty
        result.push(quantity)
        return result
      }, [])
      const variantsId = cartsId.map(item => {
        const data = this.props.cartState[item].variant.id
        return data
      })
      this.props.getOptionShipment(variantsId, qty, addressId, warehouseId)
      const shipping = this.props.shipmentState[warehouseId]
      updateCourier({
        warehouseId,
        shipping,
      })
    })
  }
  onBackCheckoutPage = () => {
    this.props.navigation.goBack()
  }

  changeAddress = id => () => {
    this.setState({
      tempSelectedAddress: id,
    })
  }

  setAddress = () => {
    const { setCheckoutAddressData } = this.props
    const { tempSelectedAddress } = this.state
    setCheckoutAddressData(tempSelectedAddress)
    // this.onBackCheckoutPage()
  }

  _addnewaddress = () => {
    this.props.navigation.navigate('AddNewAddressManual')
  }
  render() {
    const { addresses } = this.props
    const { tempSelectedAddress } = this.state
    return (
      <>
        <NavbarTop
          title="Shipping Address"
          leftContent={['back']}
          rightAction={
            <Icon
              name="plus"
              onPress={this._addnewaddress}
              color={colors.black100}
              size={16}
            />
          }
        />
        {/* in the future need change to flatlist */}
        <ScrollDiv>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.black50,
              borderStyle: 'solid',
            }}
          />
          {addresses?.map((value, key) => {
            return (
              <View
                key={`choose-address-${key}`}
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <AddressHoc
                  key={`address-${key}`}
                  index={key}
                  addressId={value}
                  style={{
                    borderTopWidth: key > 0 ? 1 : 0,
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderTopColor: key > 0 && colors.black50,
                  }}
                  onChangeAddress={this.changeAddress}
                  tempSelectedAddress={tempSelectedAddress}
                />
              </View>
            )
          })}
        </ScrollDiv>

        <View style={{ padding: 16 }}>
          <GradientButton
            onPress={this.setAddress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3067E4', '#8131E2']}
            title="Use Address"
            fontStyle={styles.buttonText}
            style={styles.button}
          />
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserAddressById,
      setCheckoutAddressData,
      getOptionShipment,
      updateCourier,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  let addresses = state.addresses.order

  /* revisi: pindah ke dalam render sebelum return */
  const primaryAddress = addresses.reduce((res, value) => {
    res = state.addresses.data[value].is_primary ? value : res
    return res
  }, null)

  const selectedAddress = state.checkout.data.address_id || primaryAddress
  return {
    addresses,
    selectedAddress,
    cartState: state.carts.data,
    shipmentState: state.shipments.data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddressPage)
