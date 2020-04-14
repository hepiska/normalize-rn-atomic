import React, { Component } from 'react'
import { Div } from '@components/atoms/basic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@components/molecules/navbar-top'
import { getAllCart } from '@modules/cart/action'
import { ScrollDiv } from '@components/atoms/basic'
import CartEmptyState from '@components/molecules/cart-empty-state'
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
        <NavbarTop title="Cart" />
        <ScrollDiv>
          <Div
            _flex={1}
            align="flex-start"
            justify="flex-start"
            _padding="0px 16px">
            <CartEmptyState />
            <Wishlist />
            <ProductSimilarList />
          </Div>
        </ScrollDiv>
      </>
    )
  }
}

const mapDispacthToProps = dispatch =>
  bindActionCreators({ getAllCart }, dispatch)

const mapStateToProps = state => ({
  carts: state.carts.order.map(cartId => state.carts.data[cartId]),
})

export default connect(mapStateToProps, mapDispacthToProps)(CartPage)
