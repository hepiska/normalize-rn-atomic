import React, { Component } from 'react'
import { Div, ScrollDiv } from '@components/atoms/basic'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@components/molecules/navbar-top'
import { getAllCart } from '@modules/cart/action'
import Cart from '@src/components/organisms/cart'
import Wishlist from '@src/components/organisms/wishlist'
import CartListLoader from '@components/atoms/loaders/cart-list'
import ProductSimilarList from '@src/components/organisms/product-similar-list'

class CartPage extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.getAllCart()
      this.setState({ finishAnimation: true })
    })
  }

  render() {
    const { navigation, carts, cartsLoading } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop title="Cart" leftContent={['back']} />
        {finishAnimation ? (
          <Cart
            carts={carts}
            cartsLoading={cartsLoading}
            footer={
              <Div align="flex-start" justify="flex-start" _padding="0px 16px">
                <Wishlist navigation={navigation} />
                {/* <ProductSimilarList /> */}
              </Div>
            }
          />
        ) : (
          <CartListLoader />
        )}
      </>
    )
  }
}

const mapDispacthToProps = dispatch =>
  bindActionCreators({ getAllCart }, dispatch)

const mapStateToProps = state => ({
  carts: state.carts.order,
  cartsLoading: state.carts.loading,
})

export default connect(mapStateToProps, mapDispacthToProps)(CartPage)
