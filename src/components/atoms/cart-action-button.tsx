import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Font, Image, PressAbbleDiv } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { getAllCart } from '@modules/cart/action'
import { bindActionCreators } from 'redux'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  rightAction: {
    marginLeft: 24,
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
    top: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    right: -6,
  },
})

const CartActionButton = props => {
  const navigation = useNavigation()

  React.useEffect(() => {
    props.getAllCart()
  }, [])

  const _gotoCart = () => {
    navigation.navigate('Cart')
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
  totalCart: state.carts.order.length,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllCart }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CartActionButton)
