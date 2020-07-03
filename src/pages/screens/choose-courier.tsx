import React, { Component } from 'react'
import { StyleSheet, View, Text, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { ScrollDiv, Font } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { helveticaBlackFont12, fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { bindActionCreators } from 'redux'
import { getOptionShipment } from '@modules/shipment/action'
import ShipmentCart from '@components/molecules/shipment-cart'
import { shipmentListData } from '@hocs/data/shipment'
import CourierLoader from '@src/components/atoms/loaders/courier-loader'
import EmptyState from '@components/molecules/order-empty-state'

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
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

class ChooseCourierPage extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
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

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })

      getOptionShipment(variantIds, qtys, addressId, warehouseId)
    })
  }
  render() {
    const {
      shipments,
      cartId,
      addressId,
      variantIds,
      warehouseId,
      loading,
      navigation,
    } = this.props
    const { finishAnimation } = this.state

    if (loading) {
      return <CourierLoader style={{ marginHorizontal: 16 }} />
    }
    return (
      <>
        <NavbarTop title="Shipment Courier" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollDiv>
            <View {...styles.container}>
              <View {...styles.shipmentCourier}>
                <Icon name="business-time" size={16} color={colors.black100} />
                <View style={{ marginLeft: 16 }}>
                  <Text
                    style={{ ...styles.helvetica12, color: colors.black100 }}>
                    Shipment duration starts when items have been received by
                    the courier
                  </Text>
                </View>
              </View>

              {shipments[warehouseId]?.length === 0 ? (
                <EmptyState
                  title={`Oops...`}
                  description="Your address doesn't support by any shipment courier"
                />
              ) : (
                shipments[warehouseId]?.map((value, key) => {
                  return (
                    <ShipmentHoc
                      key={`shipment-${key}`}
                      style={{ marginTop: 16 }}
                      shipmentId={value}
                      index={key}
                      variantIds={variantIds}
                      addressId={addressId}
                      warehouseId={warehouseId}
                      navigation={navigation}
                    />
                  )
                })
              )}
            </View>
          </ScrollDiv>
        ) : (
          <CourierLoader style={{ marginHorizontal: 16 }} />
        )}
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
    loading: state.shipments.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourierPage)
