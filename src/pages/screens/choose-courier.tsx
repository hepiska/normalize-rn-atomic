import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { ScrollDiv, Font } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { helveticaBlackFont12 } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { bindActionCreators } from 'redux'
import { getOptionShipment } from '@modules/shipment/action'
import ShipmentCart from '@components/molecules/shipment-cart'
import { shipmentListData } from '@hocs/data/shipment'

const ShipmentHoc = shipmentListData(ShipmentCart)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  shipmentCourier: {
    marginTop: 24,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'rgba(26, 26, 26, 0.04);',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

class ChooseCourierPage extends Component<any, any> {
  componentDidMount() {
    const {
      getOptionShipment,
      cartId,
      qtys,
      addressId,
      variantIds,
      test,
      warehouseId,
    } = this.props
    getOptionShipment(variantIds, qtys, addressId, warehouseId)
  }
  render() {
    const { shipments, cartId, addressId, variantIds, warehouseId } = this.props

    return (
      <>
        <NavbarTop title="Shipment Courier" leftContent={['back']} />
        <ScrollDiv>
          <View {...styles.container}>
            <View {...styles.shipmentCourier}>
              <Icon name="business-time" size={16} color={colors.black100} />
              <Font {...helveticaBlackFont12} _margin="0 0 0 16px">
                Shipment duration starts when items have been received by the
                courier
              </Font>
            </View>

            <View
              {...styles.shipmentCourier}
              style={{
                backgroundColor: 'rgba(0, 184, 0, 0.05)',
                marginTop: 8,
              }}>
              <Icon
                name="star-and-crescent"
                size={16}
                color={colors.greenAccent}
              />
              <Font
                {...helveticaBlackFont12}
                color={colors.greenAccent}
                _margin="0 0 0 16px">
                Ramadhan content courier will be write here so let’s make space
              </Font>
            </View>

            {shipments[warehouseId]?.map((value, key) => {
              return (
                <ShipmentHoc
                  key={`shipment-${key}`}
                  style={{ marginTop: 16 }}
                  shipmentId={value}
                  index={key}
                  variantIds={variantIds}
                  addressId={addressId}
                  warehouseId={warehouseId}
                />
              )
            })}
          </View>
        </ScrollDiv>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOptionShipment }, dispatch)

const mapStateToProps = (state, ownProps) => {
  const props = ownProps.route.params
  const cartId = props.cartId

  /* revisi: pindah ke dalam render sebelum return */
  const qtys = cartId.reduce((result, item) => {
    const quantity = state.carts.data[item].qty
    result.push(quantity)
    return result
  }, [])
  const variantIds = cartId.map(item => {
    const data = state.carts.data[item].variant.id
    return data
  })
  return {
    cartId,
    qtys,
    variantIds,
    addressId: props.addressId,
    shipments: state.shipments.order,
    warehouseId: props.warehouseId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourierPage)
