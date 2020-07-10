import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Font, Image, PressAbbleDiv } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '@utils/constants'
import { getNotLoginCart } from '@utils/helpers'
import { connect } from 'react-redux'
import { getAllCart } from '@modules/cart/action'
import { bindActionCreators } from 'redux'
import { synchronizeCart } from '@modules/cart/action'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  rightAction: {
    width: 36,
    height: 52,
    marginRight: 6,
  },
  leftAction: {
    marginRight: 24,
  },
  fontStyle: {
    fontWeight: '500',
    color: 'white',
  },
  indikator: {
    position: 'absolute',
    height: 16,
    width: 16,
    top: 8,
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
})

const CartActionButton = props => {
  const navigation = useNavigation()

  React.useEffect(() => {
    if (props.isAuth) {
      props.getAllCart()
    }
  }, [])

  const _gotoCart = () => {
    navigation.navigate('Screens', {
      screen: 'Cart',
    })
    if (props.isAuth) {
      const notLoginCart = getNotLoginCart()
      props.synchronizeCart(notLoginCart)
    }
  }
  return (
    <PressAbbleDiv onPress={_gotoCart} style={styles.rightAction}>
      <Icon name="shopping-cart" size={20} color={colors.black100} />
      {Boolean(props.totalCart) && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3067E4', '#8131E2']}
          style={styles.indikator}>
          <Font family="HelveticaNeue" size="10px" style={styles.fontStyle}>
            {props.totalCart || 1}
          </Font>
        </LinearGradient>
      )}
    </PressAbbleDiv>
  )
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  totalCart: state.carts.order.length,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllCart, synchronizeCart }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CartActionButton)
