import React, { Component } from 'react'
import { Div } from '@components/atoms/basic'
import NavbarTop from '@components/molecules/navbar-top'
import { ScrollDiv } from '@components/atoms/basic'
import CartEmptyState from '@components/molecules/cart-empty-state'
import Wishlist from '@src/components/organisms/wishlist'
import ProductSimilarList from '@src/components/organisms/product-similar-list'

class CartPage extends Component<any, any> {
  render() {
    const { navigation } = this.props
    navigation.setOptions({
      header: () => {
        return (
          <NavbarTop
            style={{
              borderColor: '#EEE',
              borderWidth: 1,
            }}
            title="Cart"
          />
        )
      },
    })

    return (
      <ScrollDiv>
        <Div
          _flex={1}
          align="flex-start"
          justify="flex-start"
          _padding="0px 16px">
          <CartEmptyState />
          <Wishlist />
          {/* <ProductSimilarList /> */}
        </Div>
      </ScrollDiv>
    )
  }
}

export default CartPage
