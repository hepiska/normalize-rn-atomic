import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Font } from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import {
  formatRupiah,
  capitalEachWord,
  sendEmail,
  setImage as changeImageUri,
} from '@src/utils/helpers'
import { OutlineButton } from '../atoms/button'
import dayjs from 'dayjs'
import { cartListData } from '@hocs/data/cart'
import ProductSummaryCart from '@components/molecules/product-summary-cart'
import { getOrderById } from '@modules/order/action'
import { fontStyle } from '../commont-styles'
import { navigate } from '@src/root-navigation'
import { images as defaultImages } from '@utils/constants'
import FocusContainer from '@components/molecules/focus-container'

const CartHoc = cartListData(ProductSummaryCart)

const Divider = () => (
  <View
    style={{
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(239, 239, 239)',
    }}
  />
)

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
  helveticaLight14: {
    ...fontStyle.helveticaThin,
    fontSize: 13,
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

class OrderDetails extends React.PureComponent<any, any> {
  async componentDidMount() {
    await this.props.getOrderById(this.props.orderId)
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
        showWhen: ['shipping', 'delivered'],
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
        onPress: sendEmail(this.props.orderId),
        showWhen: ['shipping', 'delivered'],
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
    const { order } = this.props
    if (!order) {
      return {
        textColor: colors.black100,
        backgroundColor: 'rgba(26, 26, 26, 0.1)',
      }
    } else {
      switch (order.status.toLowerCase()) {
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
  }

  renderPaymentName = () => {
    const { order } = this.props
    if (!order) {
      return ''
    } else {
      if (
        order.provider_payment_method.channel ===
        order.provider_payment_method.name
      ) {
        return name
      }
      return (
        order.provider_payment_method.channel +
        ' ' +
        order.provider_payment_method.name
      )
    }
  }

  renderButton = (item, key) => {
    if (!this.props.order) {
      return null
    } else if (
      item.button.showWhen.includes(this.props.order.status.toLowerCase())
    ) {
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

  renderOrderStatus = status => {
    let statusString = ''
    let statusColor = ''
    if (status === 'BOOKED') {
      statusString = 'Waiting For Payment'
      statusColor = colors.orange
    } else if (status === 'PAID') {
      statusString = 'Paid'
      statusColor = colors.orange
    } else if (status === 'CONFIRMED') {
      statusString = 'Confirmed'
      statusColor = colors.orange
    } else if (status === 'READY_FOR_DELIVERY') {
      statusString = 'Confirmed'
      statusColor = colors.orange
    } else if (status === 'SHIPPING') {
      statusString = 'Shipping'
      statusColor = colors.orange
    } else if (status === 'DISPUTE') {
      statusString = 'In Complain'
      statusColor = colors.orange
    } else if (status === 'CANCELLED') {
      statusString = 'Cancelled'
      statusColor = colors.orange
    } else if (status === 'DELIVERED') {
      statusString = 'Delivered'
      statusColor = colors.greenAccent
    } else if (status === 'COMPLETED') {
      statusString = 'Completed'
      statusColor = colors.greenAccent
    } else if (status === 'REFUND') {
      statusString = 'Refunded'
      statusColor = colors.greenAccent
    }
    return { statusString, statusColor }
  }

  render() {
    const { order, style, products, dataProducts } = this.props

    let productTotal = 0
    productTotal =
      products &&
      products.reduce((total, value) => {
        total += dataProducts.data[value].variant.qty
        return total
      }, 0)

    const image =
      null ||
      (!!order.courier.image_url
        ? changeImageUri(order.courier.image_url, { width: 54, height: 54 })
        : defaultImages.product)

    const getColor = this.orderStatus()
    if (!order) {
      return null
    }
    return (
      <View {...style} {...styles.container}>
        {/* order summary */}
        <View>
          <View
            style={{
              ...styles.row,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.futuraBold24,
                fontSize: 23,
                color: colors.gray1,
              }}>
              {`Invoice No: `}
            </Text>
            <Text
              style={{
                ...styles.helvetica14,
                fontSize: 15,
                fontWeight: '400',
                color: colors.black80,
                lineHeight: 14,
              }}>
              {order.invoice_no}
            </Text>
          </View>

          <View style={{ ...styles.row, marginTop: 10 }}>
            <Text
              style={{
                ...styles.helvetica14,
                fontWeight: '300',
                color: colors.black80,
              }}>
              Order Status
            </Text>
            <Text
              style={{
                ...styles.helvetica14,
                fontWeight: '300',
                color: this.renderOrderStatus(order.status).statusColor,
              }}>
              {this.renderOrderStatus(order.status).statusString}
            </Text>
          </View>

          <View style={{ ...styles.row, marginTop: 16, marginBottom: 26 }}>
            <Text
              style={{
                ...styles.helvetica14,
                fontWeight: '300',
                color: colors.black80,
              }}>
              Purchase Date
            </Text>
            <Text style={{ ...styles.helveticaBold14, color: colors.black80 }}>
              {dayjs(order.created_at).format('MMMM DD, HH:mm [WIB]')}
            </Text>
          </View>
        </View>
        <Divider />

        {/* item summary */}
        <View style={{ marginTop: 26 }}>
          <Text
            style={{
              ...styles.helvetica14,
              fontSize: 15,
              fontWeight: '500',
              color: colors.black80,
            }}>
            Item Summary
          </Text>
          <View style={{ ...styles.warehouse, marginTop: 12 }}>
            <Icon name="warehouse" size={14} color={colors.black80} />
            <View style={{ marginLeft: 8 }}>
              <Text
                style={{
                  ...styles.helvetica14,
                  fontWeight: '300',
                  fontSize: 13,
                  color: colors.black70,
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
        <Divider />

        {/* shipment detail */}
        <View style={{ marginTop: 26 }}>
          <Text
            style={{
              ...styles.helvetica14,
              fontSize: 15,
              fontWeight: '500',
              color: colors.black80,
            }}>
            Shipment Detail
          </Text>

          {/* shipment package */}
          <View style={{ marginTop: 7 }}>
            {/* card 1 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: colors.black80,
                    opacity: 0.5,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.black80,
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
                    fontWeight: '700',
                    color: colors.black80,
                  }}>
                  Official The Shonet
                </Text>
                <View style={{ ...styles.warehouse }}>
                  <Icon name="warehouse" size={12} color={colors.black60} />
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        ...styles.helvetica12,
                        color: colors.black70,
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
                borderColor: '#ccc',
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
                    backgroundColor: colors.black80,
                    opacity: 0.5,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.black80,
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
              {/* <ImageAutoSchale
                source={{ uri: order.courier.image_url }}
                width={54}
                style={{ borderRadius: 8, marginLeft: 16 }}
              /> */}
              <ImageAutoSchale
                errorStyle={{ width: 54, height: 54 }}
                // thumbnailSource={
                //   typeof thumbnailImage === 'string'
                //     ? { uri: thumbnailImage }
                //     : thumbnailImage
                // }
                showErrorIcon={false}
                source={
                  typeof image === 'string'
                    ? {
                        uri: image,
                      }
                    : image
                }
                width={54}
                style={{ borderRadius: 8, marginLeft: 16 }}
              />
              <View style={{ marginLeft: 16 }}>
                <Text
                  style={{
                    ...styles.helveticaBold14,
                    fontWeight: '700',
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
                        color: colors.black70,
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
            <Text style={{ ...styles.helvetica14, color: colors.black80 }}>
              Shipment Address
            </Text>
            <FocusContainer
              style={{
                marginTop: 16,
                padding: 10,
                shadowColor: 'transparent',
                backgroundColor: '#FAFAFA',
              }}>
              <>
                <View>
                  <Text
                    style={{
                      ...styles.helvetica14,
                      color: colors.gray1,
                      lineHeight: 21,
                    }}>
                    {order.destination.label}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.helveticaBold12,
                      fontWeight: '500',
                      color: colors.black80,
                      lineHeight: 18,
                    }}>
                    {`${order.destination.name} - ${order.destination.phone}`}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.helvetica12,
                      color: colors.black70,
                      lineHeight: 18,
                    }}>
                    {`${order.destination.address}, ${order.destination.district}, ${order.destination.city}, ${order.destination.region}, ${order.destination.zip_code}`}
                  </Text>
                </View>
              </>
            </FocusContainer>
          </View>
        </View>

        {/* payment information */}
        <View style={{ marginTop: 26 }}>
          <Text style={{ ...styles.futuraBold24, color: colors.black100 }}>
            Payment Information
          </Text>

          {/* payment method */}
          <View style={{ marginTop: 24 }}>
            {order.provider_payment_method && (
              <>
                <View
                  style={{
                    marginTop: 12,
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
                        fontWeight: '700',
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
                marginTop: 12,
              }}
            />

            {/* product total, shipping, delivery insurance */}
            <View>
              <View style={{ ...styles.row, marginBottom: 2, marginTop: 24 }}>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
                  }}>
                  {`Product Total ${productTotal} Items`}
                </Text>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
                  }}>
                  {formatRupiah(order.total_amount)}
                </Text>
              </View>

              <View style={{ ...styles.row, marginBottom: 2 }}>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
                  }}>
                  Total Shipping Cost
                </Text>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
                  }}>
                  {formatRupiah(order.shipping_cost)}
                </Text>
              </View>

              <View style={{ ...styles.row, marginBottom: 2 }}>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
                  }}>
                  Total Insurance Fee
                </Text>
                <Text
                  style={{
                    ...styles.helvetica14,
                    color: colors.black80,
                    lineHeight: 21,
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
              marginTop: 24,
            }}
          />

          {/* total */}
          <View style={{ ...styles.row, marginTop: 24, marginBottom: 43 }}>
            <Text
              style={{
                ...styles.helveticaBold14,
                fontSize: 18,
                fontWeight: '700',
                color: colors.black100,
              }}>
              Total
            </Text>
            <Text
              style={{
                ...styles.helveticaBold14,
                fontSize: 18,
                fontWeight: '700',
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
  const order = state.orders?.data[orderId] || null
  let products = null
  let user = null
  let dataProducts = null
  if (order !== null) {
    products = order?.product
    user = order && state.user?.data[order.user]
    dataProducts = state.products
  }
  return {
    order,
    products,
    user,
    dataProducts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
