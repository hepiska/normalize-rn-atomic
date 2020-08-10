import React, { Component, useCallback } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'
import { makeCartSummary } from '@modules/cart/selector'
import { formatCur } from '@utils/helpers'
import { connect } from 'react-redux'
import { changesRightSideBar } from '@modules/ui-interaction/action'
import { navigate } from '@src/root-navigation'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create({
  total: {
    ...fontStyle.helvetica,
    color: colors.black70,
    fontSize: 18,
  },
  price: {
    ...fontStyle.helveticaBold,
    color: colors.black100,
    fontSize: 18,
  },
  btnBag: {
    width: '100%',
    height: 42,
    borderColor: colors.black60,
    borderWidth: 1,
    marginBottom: 16,
  },
  btnBagTxt: {
    color: colors.black60,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnCheckout: {
    width: '100%',
    backgroundColor: colors.black100,
    height: 42,
  },
  btnCheckoutTxt: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

const ActionGlobalCart = ({ cartSummary, changesRightSideBar, cartsId }) => {
  const _goToShopingCart = useCallback(() => {
    changesRightSideBar(false)
    navigate('Screens', { screen: 'Cart' })
  }, [])
  const _gotoCheckout = useCallback(() => {
    changesRightSideBar(false)
    navigate('Screens', {
      screen: 'Checkout',
      cartsId,
      totalPrice: cartSummary.totalPrice,
    })
  }, [])

  return (
    <View
      style={{
        borderTopColor: colors.black50,
        borderTopWidth: 1,
        marginBottom: 16,
        marginHorizontal: 16,
        marginTop: 24,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
        }}>
        <Text style={styles.total}>TOTAL</Text>
        <Text style={styles.price}>
          IDR {formatCur(cartSummary.total_transactions)}
        </Text>
      </View>
      <Button
        title="View Shopping Bag"
        onPress={_goToShopingCart}
        style={styles.btnBag}
        fontStyle={styles.btnBagTxt}
        loading={null}
        loaderColor={colors.white}
      />
      <Button
        title="Checkout"
        onPress={_gotoCheckout}
        style={styles.btnCheckout}
        fontStyle={styles.btnCheckoutTxt}
        loading={null}
        loaderColor={colors.white}
      />
    </View>
  )
}

const getCartSummary = makeCartSummary()
const mapStateToProps = state => {
  const cartSummary = getCartSummary(state)
  return { cartSummary, cartsId: state.carts.order }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changesRightSideBar }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ActionGlobalCart)
