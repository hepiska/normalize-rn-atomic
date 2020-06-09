import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@utils/constants'
import Checkout from '@src/components/organisms/checkout'
import CheckoutLoader from '@src/components/atoms/loaders/checkout'

class CheckoutPage extends Component<any, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  render() {
    const { carts, totalPrice, navigation } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop title="Checkout" leftContent={['back']} />
        {finishAnimation ? (
          <Checkout
            carts={carts}
            totalPrice={totalPrice}
            navigation={navigation}
          />
        ) : (
          <CheckoutLoader style={{ margin: 16 }} />
        )}
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
