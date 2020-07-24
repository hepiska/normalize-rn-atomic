import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import {
  helveticaBlackFont12,
  helveticaBlackTitleBold,
  fontStyle,
} from '@components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeCart } from '@modules/cart/action'
import { formatRupiah } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import DiscountTag from '@components/atoms/discount-tag'
import { coupon } from '@src/modules/normalize-schema'

const styles = StyleSheet.create({
  totalText: {
    justifyContent: 'center',
    flex: 0.5,
  },
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
  oldPrice: {
    ...fontStyle.helvetica,
    color: colors.black60,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    height: 78,
    borderWidth: 1,
    borderColor: colors.black50,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

class TotalPayCart extends Component<any, any> {
  render() {
    const {
      totalPrice,
      buttonText,
      onCheckout,
      items,
      enableButton = true,
      oldPrice,
      loading,
    } = this.props

    return (
      <View {...styles.container}>
        <View {...styles.totalText}>
          <Text
            style={{
              ...styles.helvetica12,
              fontWeight: '300',
              color: colors.black80,
            }}>
            Total
          </Text>
          {oldPrice && (
            <Text style={styles.oldPrice}>{formatRupiah(oldPrice)}</Text>
          )}
          <View style={styles.rowContainer}>
            <Font {...helveticaBlackTitleBold} size="18">
              {formatRupiah(totalPrice)}
            </Font>
            {oldPrice && (
              <DiscountTag
                value={(oldPrice - totalPrice) / oldPrice}
                style={{ marginTop: 8, marginLeft: 8 }}
              />
            )}
          </View>
        </View>
        <View {...styles.buttonContainer}>
          <GradientButton
            leftIcon={
              !loading && (
                <View style={{ marginRight: 8 }}>
                  <Icon name="lock" color={colors.white} size={14} />
                </View>
              )
            }
            onPress={onCheckout(items, totalPrice)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3067E4', '#8131E2']}
            title={buttonText}
            fontStyle={styles.buttonText}
            style={styles.button}
            disabled={totalPrice > 0 && enableButton ? false : true}
            loading={loading}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeCart }, dispatch)

const mapStateToProps = (state, ownProps) => {
  const cartsId = ownProps.items

  /* revisi: pindah ke dalam render sebelum return */
  const shippingCost = ownProps.shippingCost || 0
  const deliveryProtection = ownProps.deliveryProtection || 0
  let totalPrice = 0
  let discountedPrice = null
  if (cartsId) {
    totalPrice = cartsId.reduce((_total, item) => {
      const singleItem = state.carts.data[item]
      const price = singleItem.variant.price
      const quantity = singleItem.qty
      _total += price * quantity
      return _total
    }, 0)
  }
  totalPrice += shippingCost + deliveryProtection
  // console.log(state.coupons.data)
  const appliedCoupon = state.coupons.data[state.carts.appliedCoupon]
  if (appliedCoupon?.is_valid) {
    discountedPrice = totalPrice - appliedCoupon.discount
  }
  if (discountedPrice) {
    return {
      totalItems: cartsId.length,
      totalPrice: Math.max(discountedPrice, 0),
      oldPrice: totalPrice,
    }
  }

  return {
    totalItems: cartsId.length,
    totalPrice: totalPrice,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalPayCart)
