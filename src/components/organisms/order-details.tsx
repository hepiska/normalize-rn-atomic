import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Font } from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { formatRupiah, capilEachWord, sendEmail } from '@src/utils/helpers'
import { OutlineButton } from '../atoms/button'
import dayjs from 'dayjs'
import { cartListData } from '@hocs/data/cart'
import ProductSummaryCart from '@components/molecules/product-summary-cart'
import { getOrderById } from '@modules/order/action'
import { fontStyle } from '../commont-styles'
import { navigate } from '@src/root-navigation'

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
  futuraBold24: {
    ...fontStyle.futuraDemi,
    fontSize: 24,
    fontWeight: '500',
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helveticaBold16: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
  },
})

const handleNavigate = (screen, screenName, params = {}) => () => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

class OrderDetails extends Component<any, any> {
  componentDidMount() {
    this.props.getOrderById(this.props.order.id)
  }

  buttonAction = [
    {
      button: {
        style: {
          borderColor: colors.blue60,
          width: '100%',
          height: 46,
          marginTop: 16,
        },
        onPress: handleNavigate('Screens', 'TrackShipment', {
          order: this.props.order,
        }),
        showWhen: ['sent', 'shipping', 'delivered', 'completed'],
      },
      text: {
        style: {
          ...fontStyle.helvetica,
          color: colors.blue60,
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
        showWhen: ['sent', 'shipping', 'delivered'],
      },
      text: {
        style: {
          ...fontStyle.helvetica,
          color: colors.black80,
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
        onPress: sendEmail(this.props.order.id),
        showWhen: ['sent', 'shipping', 'delivered'],
      },
      text: {
        style: {
          ...fontStyle.helvetica,
          color: colors.black80,
          fontSize: 14,
          fontWeight: '500',
        },
        label: 'Return or Exchange',
      },
      showWhen: ['sent', 'delivered', 'refunded'],
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
          console.log('button 4')
        },
        showWhen: ['refunded'],
      },
      text: {
        style: {
          color: colors.black80,
          fontFamily: 'HelveticaNeue',
          fontSize: 14,
          fontWeight: '500',
        },
        label: 'Refund Details',
      },
    },
  ]

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

  renderButton = (item, key) => {
    if (item.button.showWhen.includes(this.props.order.status.toLowerCase())) {
      return (
        <OutlineButton
          key={`button-order-detail-${key}`}
          title={item.text.label}
          onPress={item.button.onPress}
          fontStyle={{ ...item.text.style }}
          style={item.button.style}
        />
      )
    }
    return null
  }
  render() {
    const { order, style, products, dataProducts } = this.props

    let productTotal = 0
    productTotal = products.reduce((total, value) => {
      total += dataProducts.data[value].variant.qty
      return total
    }, 0)

    const getColor = this.orderStatus()
    if (!order) {
      return null
    }
    return (
      <View {...style} {...styles.container}>
        {/* order summary */}
        <View>
          <Text style={{ ...styles.futuraBold24, color: colors.black100 }}>
            Order Summary
          </Text>

          {/* order Status */}
          <View {...styles.row} style={{ marginTop: 24 }}>
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              Order Status
            </Text>
            <Text
              style={{
                ...styles.helveticaBold14,
                color: getColor.textColor,
              }}>
              {capilEachWord(order.status.toLowerCase())}
            </Text>
          </View>

          <View {...styles.row} style={{ marginTop: 16 }}>
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              Purchase Date
            </Text>
            <Text style={{ ...styles.helveticaBold14, color: colors.black80 }}>
              {dayjs(order.created_at).format('DD MMMM YYYY')}
            </Text>
          </View>

          <View {...styles.row} style={{ marginTop: 16 }}>
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              Invoice
            </Text>
            <Text
              style={{
                ...styles.helveticaBold14,
                color: colors.black80,
                lineHeight: 14,
              }}>
              {order.invoice_no}
            </Text>
          </View>
        </View>

        {/* item summary */}
        <View style={{ marginTop: 40 }}>
          <Text style={{ ...styles.futuraBold24, color: colors.black100 }}>
            Item Summary
          </Text>
          <View {...styles.warehouse}>
            <Icon name="warehouse" size={14} color={colors.black80} />
            <View style={{ marginLeft: 8 }}>
              <Text
                style={{
                  ...styles.helvetica14,
                  color: colors.black80,
                  lineHeight: 14,
                }}>
                {`${order.origin.label} - ${order.origin.city}`}
              </Text>
            </View>
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
          <Text style={{ ...styles.futuraBold24, color: colors.black100 }}>
            Shipment Detail
          </Text>

          {/* shipment package */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ ...styles.helveticaBold16, color: colors.black100 }}>
              Shipment Package
            </Text>
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
                <Text
                  style={{
                    ...styles.helveticaBold14,
                    color: colors.black80,
                  }}>
                  Official The Shonet
                </Text>
                <View {...styles.warehouse}>
                  <Icon name="warehouse" size={12} color={colors.black60} />
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        ...styles.helvetica12,
                        color: colors.black60,
                      }}>
                      {`${order.origin.label} - ${order.origin.city}`}
                    </Text>
                  </View>
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
                <Text
                  style={{
                    ...styles.helveticaBold14,
                    color: colors.black80,
                  }}>
                  {order.courier.name}
                </Text>
                <View {...styles.warehouse}>
                  <Icon name="warehouse" size={12} color={colors.black60} />
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        ...styles.helvetica12,
                        color: colors.black60,
                      }}>
                      {order.courier.shipping_method.category.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* shipment address */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ ...styles.helveticaBold14, color: colors.black80 }}>
              Shipment Address
            </Text>
            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  ...styles.helveticaBold12,
                  color: colors.black80,
                }}>
                {order.destination.name}
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  ...styles.helvetica12,
                  color: colors.black70,
                  lineHeight: 19,
                }}>
                {`${order.destination.address}, ${order.destination.district}, ${order.destination.city}, ${order.destination.region}, ${order.destination.zip_code}`}
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={{ ...styles.helvetica12, color: colors.black80 }}>
                {order.destination.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* payment information */}
        <View style={{ marginTop: 40 }}>
          <Text style={{ ...styles.futuraBold24, color: colors.black100 }}>
            Payment Information
          </Text>

          {/* payment method */}
          <View style={{ marginTop: 24 }}>
            {order.provider_payment_method && (
              <>
                <Text
                  style={{
                    ...styles.helveticaBold16,
                    color: colors.black80,
                  }}>
                  Payment Method
                </Text>

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
                  <View style={{ marginLeft: 16 }}>
                    <Text
                      style={{
                        ...styles.helveticaBold14,
                        color: colors.black80,
                      }}>
                      {this.renderPaymentName()}
                    </Text>
                  </View>
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
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black100,
                  }}>
                  {`Product Total • ${productTotal} Items`}
                </Text>
                <Text style={{ ...styles.helvetica14, color: colors.black100 }}>
                  {formatRupiah(order.total_amount)}
                </Text>
              </View>

              <View {...styles.row} style={{ marginTop: 24 }}>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black100,
                  }}>
                  Total Shipping Cost
                </Text>
                <Text style={{ ...styles.helvetica14, color: colors.black100 }}>
                  {formatRupiah(order.shipping_cost)}
                </Text>
              </View>

              <View {...styles.row} style={{ marginTop: 24 }}>
                <View {...styles.row} style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      ...styles.helvetica14,
                      color: colors.black100,
                    }}>
                    Delivery Protection
                  </Text>
                  <View style={{ marginLeft: 8 }}>
                    <IconMi
                      name="verified-user"
                      size={12}
                      color={colors.blue60}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black100,
                  }}>
                  {formatRupiah(order.insurance_cost)}
                </Text>
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
              <Text
                style={{
                  ...styles.helveticaBold14,
                  color: colors.black100,
                }}>
                Total
              </Text>
              <View style={{ marginLeft: 8 }}>
                <IconMi name="verified-user" size={12} color={colors.blue60} />
              </View>
            </View>
            <Text
              style={{
                ...styles.helveticaBold14,
                color: colors.black100,
              }}>
              {formatRupiah(
                order.total_amount + order.shipping_cost + order.insurance_cost,
              )}
            </Text>
          </View>
        </View>

        {/* button action */}
        <View>
          {this.buttonAction.map((item, key) => {
            return this.renderButton(item, key)
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
  const orderId = ownProps.orderId
  const order = state.orders.data[orderId]
  const products = order.product
  const user = state.user.data[order.user]
  const dataProducts = state.products
  return {
    order,
    products,
    user,
    dataProducts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
