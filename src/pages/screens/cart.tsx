import React, { Component } from 'react'
import { Div, ScrollDiv } from '@components/atoms/basic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@components/molecules/navbar-top'
import { getAllCart } from '@modules/cart/action'
import Cart from '@src/components/organisms/cart'
import Wishlist from '@src/components/organisms/wishlist'
import ProductSimilarList from '@src/components/organisms/product-similar-list'

class CartPage extends Component<any, any> {
  componentDidMount() {
    this.props.getAllCart()
  }

  render() {
    const { navigation, carts } = this.props
    return (
      <>
        <NavbarTop title="Cart" leftContent={['back']} />
        <Cart
          carts={carts}
          footer={
            <Div
              _flex={1}
              align="flex-start"
              justify="flex-start"
              _padding="0px 16px">
              <Wishlist navigation={navigation} />
              <ProductSimilarList />
            </Div>
          }
        />
      </>
    )
  }
}

const mapDispacthToProps = dispatch =>
  bindActionCreators({ getAllCart }, dispatch)

const mapStateToProps = state => ({
  carts: state.carts.order,
})

export default connect(mapStateToProps, mapDispacthToProps)(CartPage)
