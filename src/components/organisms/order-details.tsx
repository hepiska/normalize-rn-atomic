import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Font } from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { formatRupiah, capilEachWord } from '@src/utils/helpers'
import { OutlineButton } from '../atoms/button'
import dayjs from 'dayjs'
import { cartListData } from '@hocs/data/cart'
import ProductSummaryCart from '@components/molecules/product-summary-cart'
import { getOrderById } from '@modules/order/action'

const CartHoc = cartListData(ProductSummaryCart)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warehouse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
})

const buttonAction = [
  {
    button: {
      style: {
        borderColor: colors.blue60,
        width: '100%',
        height: 46,
        marginTop: 16,
      },
      onPress: () => {
        console.log('button')
      },
    },
    text: {
      style: {
        color: colors.blue60,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '500',
      },
      label: 'Track Shipment',
    },
  },
  {
    button: {
      style: {
        borderColor: colors.black60,
        width: '100%',
        height: 46,
        marginTop: 16,
      },
      onPress: () => {
        console.log('button 2')
      },
    },
    text: {
      style: {
        color: colors.black80,
        fontFamily: 'HelveticaNeue',
        fontSize: 14,
        fontWeight: '500',
      },
      label: 'Complete Order',
    },
  },
  {
    button: {
      style: {
        borderColor: colors.black60,
        width: '100%',
        height: 46,
        marginTop: 16,
      },
      onPress: () => {
        console.log('button 3')
      },
    },
    text: {
      style: {
        color: colors.black80,
        fontFamily: 'HelveticaNeue',
        fontSize: 14,
        fontWeight: '500',
      },
      label: 'Return or Exchange',
    },
  },
]

class OrderDetails extends Component<any, any> {
  componentDidMount() {
    this.props.getOrderById(this.props.order.id)
  }

  orderStatus = () => {
    const {
      order: { status },
    } = this.props
    switch (status.toLowerCase()) {
      case 'waiting for payment':
      case 'paid':
      case 'waiting for confirmation':
      case 'confirmed':
      case 'in process':
      case 'shipping':
      case 'sent':
        return {
          textColor: '#FFA010',
          backgroundColor: 'rgba(255, 160, 16, 0.05)',
        }
      case 'delivered':
      case 'complete':
      case 'completed':
      case 'returned':
        return {
          textColor: colors.greenAccent,
          backgroundColor: 'rgba(0, 184, 0, 0.1)',
        }
      default:
        return {
          textColor: colors.black100,
          backgroundColor: 'rgba(26, 26, 26, 0.1)',
        }
    }
  }

  renderPaymentName = () => {
    const {
      order: {
        provider_payment_method: { channel, name },
      },
    } = this.props
    if (channel === name) {
      return name
    } else {
      return channel + ' ' + name
    }
  }
  render() {
    const { order, style, products } = this.props

    const getColor = this.orderStatus()
    if (!order) {
      return null
    }
    return (
      <View {...style} {...styles.container}>
        {/* order summary */}
        <View>
          <Font
            type="Futura"
            size={24}
            style={{ fontWeight: '500' }}
            color={colors.black100}>
            Order Summary
          </Font>

          {/* order Status */}
          <View {...styles.row} style={{ marginTop: 24 }}>
            <Font type="HelveticaNeue" size={14} color={colors.black70}>
              Order Status
            </Font>
            <Font
              type="HelveticaNeue"
              size={14}
              style={{ fontWeight: '500' }}
              color={getColor.textColor}>
              {capilEachWord(order.status.toLowerCase())}
            </Font>
          </View>

          <View {...styles.row} style={{ marginTop: 16 }}>
            <Font type="HelveticaNeue" size={14} color={colors.black70}>
              Purchase Date
            </Font>
            <Font
              type="HelveticaNeue"
              size={14}
              style={{ fontWeight: '500' }}
              color={colors.black80}>
              {dayjs(order.created_at).format('DD MMMM YYYY')}
            </Font>
          </View>

          <View {...styles.row} style={{ marginTop: 16 }}>
            <Font type="HelveticaNeue" size={14} color={colors.black70}>
              Invoice
            </Font>
            <Font
              type="HelveticaNeue"
              size={14}
              style={{ fontWeight: '500', lineHeight: 14 }}
              color={colors.black80}>
              {order.invoice_no}
            </Font>
          </View>
        </View>

        {/* item summary */}
        <View style={{ marginTop: 40 }}>
          <Font
            type="Futura"
            color={colors.black100}
            size={24}
            style={{ fontWeight: '500' }}>
            Item Summary
          </Font>
          <View {...styles.warehouse}>
            <Icon name="warehouse" size={14} color={colors.black80} />
            <Font
              size={14}
              type="HelveticaNeue"
              color={colors.black80}
              style={{ paddingLeft: 8 }}>
              {`${order.origin.label} - ${order.origin.city}`}
            </Font>
          </View>
          {products &&
            products.map((_item, key) => {
              return (
                <CartHoc
                  productId={_item}
                  key={`order-detail-product-${key}`}
                  index={key}
                />
              )
            })}
        </View>

        {/* shipment detail */}
        <View style={{ marginTop: 40 }}>
          <Font
            type="Futura"
            color={colors.black100}
            size={24}
            style={{ fontWeight: '500' }}>
            Shipment Detail
          </Font>

          {/* shipment package */}
          <View style={{ marginTop: 24 }}>
            <Font
              type="HelveticaNeue"
              color={colors.black80}
              size={16}
              style={{ fontWeight: 'bold' }}>
              Shipment Package
            </Font>
            {/* card 1 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: colors.black60,
                    opacity: 0.2,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.black60,
                    opacity: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 100,
                    zIndex: 2,
                    position: 'absolute',
                    left: 5,
                    top: 5,
                  }}
                />
              </View>
              <ImageAutoSchale
                source={require('@src/assets/icons/the-shonet-logo-black.png')}
                width={54}
                style={{ borderRadius: 8, marginLeft: 16 }}
              />
              <View style={{ marginLeft: 16 }}>
                <Font
                  type="HelveticaNeue"
                  size={14}
                  color={colors.black80}
                  style={{ fontWeight: '500' }}>
                  Official The Shonet
                </Font>
                <View {...styles.warehouse}>
                  <Icon name="warehouse" size={12} color={colors.black60} />
                  <Font
                    type="HelveticaNeue"
                    size={12}
                    color={colors.black60}
                    style={{ marginLeft: 8 }}>
                    {`${order.origin.label} - ${order.origin.city}`}
                  </Font>
                </View>
              </View>
            </View>

            {/* connection line */}
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: colors.black50,
                width: 1,
                height: 30,
                left: 9.5,
              }}
            />

            {/* card 2 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: colors.black60,
                    opacity: 0.2,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.black60,
                    opacity: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 100,
                    zIndex: 2,
                    position: 'absolute',
                    left: 5,
                    top: 5,
                  }}
                />
              </View>
              <ImageAutoSchale
                source={{ uri: order.courier.image_url }}
                width={54}
                style={{ borderRadius: 8, marginLeft: 16 }}
              />
              <View style={{ marginLeft: 16 }}>
                <Font
                  type="HelveticaNeue"
                  size={14}
                  color={colors.black80}
                  style={{ fontWeight: '500' }}>
                  {order.courier.name}
                </Font>
                <View {...styles.warehouse}>
                  <Font type="HelveticaNeue" size={12} color={colors.black60}>
                    {order.courier.shipping_method.category.name}
                  </Font>
                </View>
              </View>
            </View>
          </View>

          {/* shipment address */}
          <View style={{ marginTop: 24 }}>
            <Font
              type="HelveticaNeue"
              color={colors.black80}
              size={14}
              style={{ fontWeight: 'bold' }}>
              Shipment Address
            </Font>
            <Font
              type="HelveticaNeue"
              color={colors.black80}
              size={12}
              style={{ fontWeight: 'bold', marginTop: 16 }}>
              {order.destination.name}
            </Font>
            <Font
              type="HelveticaNeue"
              color={colors.black70}
              size={12}
              style={{ lineHeight: 19, marginTop: 8 }}>
              {`${order.destination.address}, ${order.destination.district}, ${order.destination.city}, ${order.destination.region}, ${order.destination.zip_code}`}
            </Font>
            <Font
              type="HelveticaNeue"
              color={colors.black80}
              size={12}
              style={{ marginTop: 8 }}>
              {order.destination.phone}
            </Font>
          </View>
        </View>

        {/* payment information */}
        <View style={{ marginTop: 40 }}>
          <Font
            type="Futura"
            color={colors.black100}
            size={24}
            style={{ fontWeight: '500' }}>
            Payment Information
          </Font>

          {/* payment method */}
          <View style={{ marginTop: 24 }}>
            {order.provider_payment_method && (
              <>
                <Font
                  type="HelveticaNeue"
                  color={colors.black80}
                  size={16}
                  style={{ fontWeight: 'bold' }}>
                  Payment Method
                </Font>

                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ImageAutoSchale
                    source={{ uri: order.provider_payment_method.image }}
                    width={88}
                    style={{ borderRadius: 8 }}
                  />
                  <Font
                    type="HelveticaNeue"
                    color={colors.black80}
                    size={14}
                    style={{ fontWeight: 'bold', marginLeft: 16 }}>
                    {this.renderPaymentName()}
                  </Font>
                </View>
              </>
            )}

            {/* divider */}
            <View
              style={{
                borderColor: colors.black50,
                borderStyle: 'dashed',
                borderWidth: 1,
                width: '100%',
                marginTop: 8,
              }}
            />

            {/* product total, shipping, delivery insurance */}
            <View>
              <View {...styles.row} style={{ marginTop: 24 }}>
                <Font
                  type="HelveticaNeue"
                  size={14}
                  color={colors.black100}>{`Product Total • 3 Items`}</Font>
                <Font type="HelveticaNeue" size={14} color={colors.black100}>
                  {formatRupiah(order.total_amount)}
                </Font>
              </View>

              <View {...styles.row} style={{ marginTop: 24 }}>
                <Font type="HelveticaNeue" size={14} color={colors.black100}>
                  Total Shipping Cost
                </Font>
                <Font type="HelveticaNeue" size={14} color={colors.black100}>
                  {formatRupiah(order.shipping_cost)}
                </Font>
              </View>

              <View {...styles.row} style={{ marginTop: 24 }}>
                <View {...styles.row} style={{ alignItems: 'center' }}>
                  <Font type="HelveticaNeue" size={14} color={colors.black100}>
                    Delivery Protection
                  </Font>
                  <View style={{ marginLeft: 8 }}>
                    <IconMi
                      name="verified-user"
                      size={12}
                      color={colors.blue60}
                    />
                  </View>
                </View>
                <Font type="HelveticaNeue" size={14} color={colors.black100}>
                  {formatRupiah(order.insurance_cost)}
                </Font>
              </View>
            </View>
          </View>

          {/* divider */}
          <View
            style={{
              borderColor: colors.black50,
              borderStyle: 'dashed',
              borderWidth: 1,
              width: '100%',
              marginTop: 19,
            }}
          />

          {/* total */}
          <View {...styles.row} style={{ marginTop: 24, marginBottom: 43 }}>
            <View {...styles.row} style={{ alignItems: 'center' }}>
              <Font
                type="HelveticaNeue"
                size={14}
                color={colors.black100}
                style={{ fontWeight: 'bold' }}>
                Total
              </Font>
              <View style={{ marginLeft: 8 }}>
                <IconMi name="verified-user" size={12} color={colors.blue60} />
              </View>
            </View>
            <Font
              type="HelveticaNeue"
              size={14}
              color={colors.black100}
              style={{ fontWeight: 'bold' }}>
              {formatRupiah(
                order.total_amount + order.shipping_cost + order.insurance_cost,
              )}
            </Font>
          </View>
        </View>

        {/* button action */}
        <View>
          {buttonAction.map((item, key) => {
            return (
              <OutlineButton
                key={`button-order-detail-${key}`}
                title={item.text.label}
                onPress={item.button.onPress}
                fontStyle={item.text.style}
                style={item.button.style}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderById,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  console.log('state enu ---', state)
  const orderId = ownProps.orderId
  console.log('enu ---', orderId)
  const order = state.orders.data[orderId]
  console.log('order enu ---', order)
  const products = order.product
  // console.log('products ---', products)
  const user = state.user.data[order.user]
  // const brands = state.brands.data[]
  return {
    order,
    products,
    user,
    // products: state.products.order,
    // brands: state.brands.order,
    // categories: state.categories.order,
    // user: state.user.order,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
