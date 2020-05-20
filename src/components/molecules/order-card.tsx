import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { colors, images as defaultImages } from '@src/utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import StatusAlert from '@components/atoms/status-alert'
import {
  setImage as changeImageUri,
  formatRupiah,
  capitalEachWord,
} from '@utils/helpers'
import { navigate } from '@src/root-navigation'
import dayjs from 'dayjs'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.black50,
    width: '100%',
  },
  statusOrder: {
    width: '100%',
    flexDirection: 'row',
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helveticaBold10: {
    ...fontStyle.helveticaBold,
    fontSize: 10,
  },
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
})

class OrderCard extends Component<any, any> {
  state = {
    defaultImage: null,
  }
  orderDetail = () => {
    navigate('Screens', {
      screen: 'OrderDetails',
      params: {
        orderId: this.props.order.id,
      },
    })
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
  render() {
    const { style, order, oneProduct, products, brand } = this.props
    const { defaultImage } = this.state
    const getColor = this.orderStatus()

    const images = oneProduct.image_urls
    let image = defaultImages.product

    if (images !== undefined) {
      const random = Math.floor(Math.random() * images.length)
      image =
        defaultImage ||
        (!!oneProduct.image_urls[random]
          ? changeImageUri(images[random], { ...styles.image })
          : defaultImages.product)
    }

    return (
      <TouchableWithoutFeedback onPress={this.orderDetail}>
        <View style={{ ...styles.container, ...style }}>
          <StatusAlert
            status={order.status}
            text={order.status}
            icon="stopwatch"
          />
          {/* date of transaction */}
          <View style={{ marginTop: 16 }}>
            <Text style={{ ...styles.helvetica12, color: colors.black70 }}>
              {dayjs(order.created_at).format('DD MMMM YYYY')}
            </Text>
          </View>
          {/* invoice */}
          <View style={{ marginTop: 8 }}>
            <Text style={{ ...styles.helvetica12, color: colors.black80 }}>
              {order.invoice_no}
            </Text>
          </View>

          {/* card */}
          <View style={{ marginTop: 16, flexDirection: 'row' }}>
            {/* left side */}
            <ImageAutoSchale
              source={
                typeof image === 'string'
                  ? { uri: image }
                  : require('@src/assets/placeholder/placeholder2.jpg')
              }
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              width={60}
              height={80}
              style={styles.image}
            />
            {/* right side */}
            <View style={{ marginLeft: 16, justifyContent: 'flex-start' }}>
              <View>
                <Text
                  style={{ ...styles.helveticaBold12, color: colors.black80 }}>
                  {brand.name}
                </Text>
              </View>

              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black80 }}>
                  {oneProduct.name}
                </Text>
              </View>

              <View style={{ marginTop: 16 }}>
                <Text
                  style={{ ...styles.helveticaBold10, color: colors.black100 }}>
                  {products.length - 1 > 0 &&
                    `+ ${products.length - 1} other products`}
                </Text>
              </View>
            </View>
          </View>

          {/* divider */}
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: colors.black50,
              borderStyle: 'dashed',
              marginTop: 16,
            }}
          />

          {/* payment total */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              Payment total
            </Text>
            <Text style={{ ...styles.helveticaBold14, color: colors.black100 }}>
              {formatRupiah(
                order.total_amount + order.shipping_cost + order.insurance_cost,
              )}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default OrderCard
