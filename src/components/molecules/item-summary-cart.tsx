import React from 'react'
import { StyleSheet, ViewStyle, View, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import Tooltip from 'rn-tooltip'
import { Font } from '@components/atoms/basic'
import {
  helveticaBlackFont12,
  helveticaBlackFont14,
  helveticaBlackTitleBold,
  fontStyle,
} from '@components/commont-styles'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import ProductSummaryCart from './product-summary-cart'
import { cartListData } from '@hocs/data/cart'
import CourierCart from './courier-cart'
import { Checkbox } from '../atoms/checkbox'
import { OutlineButton } from '@components/atoms/button'
import ContentExpandable from '@components/molecules/content-expandable'
import { navigate } from '@src/root-navigation'
import { request } from '@utils/services'
import { bindActionCreators } from 'redux'
import {
  addShippingMethodData,
  removeShippingData,
} from '@modules/checkout/action'
const { width } = Dimensions.get('screen')

const CartHoc = cartListData(ProductSummaryCart)

interface ItemSummaryCartType {
  style?: ViewStyle
  item: any
  index: string | number
  productTotal?: number
  address: any
  choosedCourier?: any
  shippingCost?: number
  subTotal?: number

  qtys?: any
  variantIds?: any
  checkoutWarehouse?: any
  addShippingMethodData?: any
  removeShippingData?: any
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  warehouse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  orderSummaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    width: '100%',
    height: 46,
    borderColor: colors.black60,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 14,
    color: colors.black70,
    marginLeft: 0,
  },
  buttonCourier: {
    width: '100%',
    height: 40,
    borderColor: colors.blue50,
    backgroundColor: colors.white,
    marginTop: 16,
  },
  buttonCourierText: {
    fontSize: 12,
    color: colors.blue50,
    marginLeft: 0,
    fontWeight: '700',
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helveticaBold16: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
})

class ItemSummaryCart extends React.PureComponent<ItemSummaryCartType, any> {
  state = {
    isProtectDelivery: true,
    deliveryProtection: 0,
    isProductExpand: false,
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.address.id !== nextProps.address.id) {
      const params = {
        variant_ids: this.props.variantIds.toString(),
        qtys: this.props.qtys.toString(),
        address_id: nextProps.address.id,
      }
      request
        .request({
          url: '/shipments/cost',
          params,
        })
        .then(res => {
          const result = res.data.data
          const temp = this.props.checkoutWarehouse

          const reduceResult = result.reduce((totalResult, value) => {
            totalResult.push(...value.shipping_methods)
            return totalResult
          }, [])

          let tempFound
          const isFound = reduceResult.reduce((found, value) => {
            let resFound =
              value.id === temp.shipping.id &&
              value.courier.id === temp.shipping.courier.id
            if (resFound) {
              tempFound = value
            }
            return Boolean(found + resFound)
          }, false)

          if (isFound) {
            this.props.addShippingMethodData({
              id: temp.id,
              shipping: tempFound,
            })
          } else {
            this.props.removeShippingData({
              id: temp.id,
            })
          }

          return 'a'
        })
        .catch(err => console.log('err ---', err))
    }
  }

  onProtectDelivery = () => {
    this.setState({
      isProtectDelivery: !this.state.isProtectDelivery,
    })
  }

  onShowProduct = () => {
    this.setState({
      isProductExpand: true,
    })
  }

  onChooseCourier = () => {
    navigate('Screens', {
      screen: 'ChooseCourier',
      params: {
        cartId: this.props.item.data,
        addressId: this.props.address.id,
        warehouseId: this.props.item.id,
      },
    })
  }

  render() {
    const {
      style,
      item,
      index,
      productTotal,
      address,
      choosedCourier,
      shippingCost,
      subTotal,
    } = this.props
    const {
      isProtectDelivery,
      deliveryProtection,
      isProductExpand,
    } = this.state

    const itemToShow = 1
    const showItem = isProductExpand ? item.data.length : itemToShow
    return (
      <View
        {...style}
        {...styles.container}
        style={{ marginTop: index !== 0 ? 40 : 24 }}>
        <View {...styles.warehouse}>
          <Icon name="warehouse" size={14} color={colors.black80} />
          <View style={{ paddingLeft: 8 }}>
            <Text style={{ ...styles.helveticaBold14, color: colors.black100 }}>
              {item.title}
            </Text>
          </View>
        </View>
        {item.data.slice(0, showItem).map((_item, key) => (
          <CartHoc cartId={_item} key={key} index={key} />
        ))}

        {item.data.length > 1 && !isProductExpand && (
          <OutlineButton
            title={`Show ${item.data.length - 1} more items`}
            onPress={this.onShowProduct}
            style={styles.button}
            fontStyle={styles.buttonText}
          />
        )}

        {/* shipment courier */}
        <View style={{ marginTop: 30 }}>
          <Font {...helveticaBlackTitleBold} color={colors.black80}>
            Shipment Courier
          </Font>
          <View {...styles.shipmentCourier}>
            <Icon name="business-time" size={16} color={colors.black100} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ ...styles.helvetica12, color: colors.black100 }}>
                Shipment duration starts when items have been received by the
                courier
              </Text>
            </View>
          </View>
          {choosedCourier ? (
            <CourierCart
              courier={choosedCourier.shipping}
              style={{
                marginTop: 16,
              }}
              onPress={this.onChooseCourier}
            />
          ) : (
            <OutlineButton
              title="Choose Courier"
              onPress={this.onChooseCourier}
              style={styles.buttonCourier}
              fontStyle={styles.buttonCourierText}
            />
          )}
        </View>

        {/* Shipping insurance */}
        <View style={{ marginTop: 32, alignItems: 'flex-start' }}>
          <Font {...helveticaBlackTitleBold} color={colors.black80}>
            Shipping insurance
          </Font>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
            }}>
            <Checkbox
              isChecked={isProtectDelivery}
              onPress={this.onProtectDelivery}
              text="Delivery Protection"
              fontStyle={{
                ...helveticaBlackFont14,
                marginLeft: 8,
              }}
              style={{
                flexDirection: 'row',
              }}
            />
            <View style={{ marginLeft: 8 }}>
              <Tooltip
                actionType="press"
                popover={
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}>
                    <Text
                      style={{ ...styles.helvetica12, color: colors.black100 }}>
                      Sum insured up to Rp 10.000.000 with the rounded-up cost
                      of 0.1% from product price in one shipping
                    </Text>
                    <IconMi name="cancel" size={14} color={colors.black100} />
                  </View>
                }
                height={67}
                withOverlay={false}
                backgroundColor={colors.black10}
                containerStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: 16,
                  flex: 1,
                  position: 'absolute',
                }}
                width={width - 32}>
                <IconMi name="help" size={14} color={colors.black100} />
              </Tooltip>
            </View>
          </View>
        </View>

        {/* Sub Total */}
        <ContentExpandable
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ ...styles.helveticaBold16, color: colors.black80 }}>
                Sub Total
              </Text>
              {isProtectDelivery && (
                <View style={{ marginLeft: 8 }}>
                  <IconMi
                    name="verified-user"
                    size={12}
                    color={colors.blue60}
                  />
                </View>
              )}
            </View>
          }
          rightTitle={
            <View style={{ marginRight: 18 }}>
              <Text
                style={{ ...styles.helveticaBold16, color: colors.black80 }}>
                {formatRupiah(subTotal)}
              </Text>
            </View>
          }
          content={
            <>
              <View {...styles.orderSummaryDetail}>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {`Product Total • ${item.data.length} Items`}
                </Text>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {formatRupiah(productTotal)}
                </Text>
              </View>
              <View {...styles.orderSummaryDetail}>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {`Shipping Cost`}
                </Text>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {formatRupiah(shippingCost)}
                </Text>
              </View>
              <View {...styles.orderSummaryDetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black70 }}>
                    {`Delivery Protection`}
                  </Text>
                  {isProtectDelivery && (
                    <View style={{ marginLeft: 8 }}>
                      <IconMi
                        name="verified-user"
                        size={12}
                        color={colors.blue60}
                      />
                    </View>
                  )}
                </View>
                <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
                  {formatRupiah(deliveryProtection)}
                </Text>
              </View>
            </>
          }
          id={`sub-total-${item.data}`}
          style={{
            borderColor: colors.black50,
            borderBottomWidth: 1,
          }}
          divider={
            <View
              style={{
                borderStyle: 'dashed',
                borderColor: colors.black50,
                borderWidth: 1,
                width: '100%',
              }}
            />
          }
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addShippingMethodData,
      removeShippingData,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const dataCartPerWarehouse = ownProps.item.data

  /* revisi: pindah ke dalam render sebelum return */
  const productTotal = dataCartPerWarehouse.reduce((total, item) => {
    const singleItem = state.carts.data[item]
    const price = singleItem.variant.price
    const quantity = singleItem.qty
    total += price * quantity
    return total
  }, 0)

  const shippingCost =
    state.checkout.data.warehouse[ownProps.item.id]?.shipping.shipping_cost || 0

  const subTotal = productTotal + shippingCost

  const choosedCourier = state.checkout.data.warehouse[ownProps.item.id] || null

  let qtys = []
  let variantIds = []
  dataCartPerWarehouse.forEach(value => {
    qtys.push(state.carts.data[value].qty)
    variantIds.push(state.carts.data[value].variant.id)
  })

  return {
    productTotal,
    shippingCost,
    subTotal,
    choosedCourier,
    qtys,
    variantIds,
    checkoutWarehouse: state.checkout.data.warehouse[ownProps.item.id],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSummaryCart)
