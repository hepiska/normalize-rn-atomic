import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@utils/constants'
import Checkout from '@src/components/organisms/checkout'

class CheckoutPage extends Component<any, any> {
  render() {
    const { carts, totalPrice, navigation } = this.props
    return (
      <>
        <NavbarTop title="Checkout" leftContent={['back']} />
        <Checkout
          carts={carts}
          totalPrice={totalPrice}
          navigation={navigation}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const props = ownProps.route.params

  return {
    carts: props.cartsId,
    totalPrice: props.totalPrice,
  }
}

export default connect(mapStateToProps, null)(CheckoutPage)
