import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { colors, images as defaultImages } from '@src/utils/constants'
import { helveticaBlackBold } from '@components/commont-styles'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { setImage as changeImageUri } from '@utils/helpers'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  image: {
    width: 88,
    height: 66,
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  information: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class PaymentMethodCart extends Component<any, any> {
  state = {
    defaultImage: null,
  }

  paymentDetails = () => {
    navigate('Screens', {
      screen: 'PaymentDetails',
      params: {
        details: this.props.paymentMethod,
        orderId: this.props.orderId,
      },
    })
  }

  render() {
    const { paymentMethod, onPress, style, index, orderId } = this.props
    console.log('paymentMethod ---', paymentMethod)
    console.log('orderId ---', orderId)

    const image =
      this.state.defaultImage ||
      (!!paymentMethod.image
        ? changeImageUri(paymentMethod.image, { ...styles.image })
        : defaultImages.product)

    let paymentName = paymentMethod.channel
    if (paymentMethod.name === 'Virtual Account') {
      paymentName = paymentMethod.name + ' ' + paymentName
    } else if (paymentMethod.name === 'Credit Card') {
      paymentName = paymentMethod.name
    }

    return (
      <TouchableWithoutFeedback onPress={this.paymentDetails}>
        <View
          {...style}
          {...styles.container}
          style={{
            borderTopColor: index > 0 ? colors.black50 : colors.white,
            borderTopWidth: index > 0 ? 1 : 0,
            marginTop: index > 0 ? 0 : 32,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <ImageAutoSchale
              source={{ uri: image }}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <View {...styles.information}>
              <Font {...helveticaBlackBold} colors={colors.black80}>
                {paymentName}
              </Font>
            </View>
          </View>
          <View>
            <View>
              <Icon name="chevron-right" size={12} color={colors.black100} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default PaymentMethodCart
