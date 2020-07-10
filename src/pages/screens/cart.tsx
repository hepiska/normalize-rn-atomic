import React, { Component } from 'react'
import { Div, ScrollDiv } from '@components/atoms/basic'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@components/molecules/navbar-top'
import { getAllCart, setLoading } from '@modules/cart/action'
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
      if (this.props.isAuth) {
        this.props.getAllCart()
      }
      this.props.setLoading(false)
      this.setState({ finishAnimation: true })
    })
  }

  render() {
    const { navigation, carts, cartsLoading, isAuth } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop title="Cart" leftContent={['back']} />
        {finishAnimation ? (
          <Cart
            carts={carts}
            cartsLoading={cartsLoading}
            footer={
              isAuth && (
                <Div
                  align="flex-start"
                  justify="flex-start"
                  _padding="0px 16px">
                  <Wishlist navigation={navigation} />
                  {/* <ProductSimilarList /> */}
                </Div>
              )
            }
          />
        ) : (
          <CartListLoader style={{ marginHorizontal: 16 }} />
        )}
      </>
    )
  }
}

const mapDispacthToProps = dispatch =>
  bindActionCreators({ getAllCart, setLoading }, dispatch)

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    carts: state.carts.order,
    cartsLoading: state.carts.loading,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(CartPage)
