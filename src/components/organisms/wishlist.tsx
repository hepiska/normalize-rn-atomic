import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { OutlineButton } from '@src/components/atoms/button'
import { getProductSaved } from '@modules/product-saved/action'
import ProductCard from '@components/molecules/product-card-new'
// import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import { productApi } from '@modules/product/action'
import { fontStyle } from '../commont-styles'
import WishlistLoader from '@components/atoms/loaders/wishlist'
import { navigate } from '@src/root-navigation'
import { makeSlicedProductSaved } from '@src/modules/product-saved/selector'
// import { addCart } from '@modules/cart/action'

const { width } = Dimensions.get('window')

const ProductWithCardHoc = productListData(ProductCard)

const styles = StyleSheet.create({
  futuraBold24: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 24,
  },
})

class Wishlist extends Component<any, any> {
  state = {
    skip: 0,
    headerName: 'Product',
  }
  limit = 6

  skip = 0
  lastskip = 0

  componentDidMount() {
    this.freshfetch()
  }

  _openCartModal = productId => () => {
    const { navigation, product } = this.props
    navigation.navigate('modals', {
      screen: 'CartModal',
      params: { product: productId },
    })
  }

  freshfetch = async () => {
    try {
      this.props.getProductSaved()
    } catch (err) {
      console.log(err)
    }
  }

  seeAllWishlist = () => {
    navigate('Screens', { screen: 'Wishlist' })
  }

  render() {
    const { products, loading } = this.props

    if (!products || products.length === 0) {
      return null
    }
    return (
      <Div _flex={1} _margin="64px 0px 0px" _width="100%" align="flex-start">
        <View>
          <Text
            style={{
              ...styles.futuraBold24,
              color: colors.black100,
            }}>
            Wishlist
          </Text>
        </View>
        <Div
          _width="100%"
          _direction="row"
          _flex={1}
          justify="space-between"
          align="flex-start"
          style={{ flexWrap: 'wrap' }}>
          {loading || !products ? (
            <WishlistLoader />
          ) : (
            products.map((item, k) => (
              <ProductWithCardHoc
                key={item}
                onAddtoCart={this._openCartModal(item)}
                productId={item}
                style={{
                  // wrappermargin: 8,
                  // paddingHorizontal: 0,
                  marginVertical: 16,
                  width: width / 2 - 24,
                }}
              />
            ))
          )}
        </Div>
        <Div _padding="0px 8px" _width="100%">
          <OutlineButton
            title="See All"
            onPress={this.seeAllWishlist}
            style={{
              width: '100%',
              height: 46,
              borderColor: colors.black60,
            }}
          />
        </Div>
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      productApi,
      getProductSaved,
    },
    dispatch,
  )

const mapStateToProps = () => {
  const getSlicedProduct = makeSlicedProductSaved()
  return state => ({
    products: getSlicedProduct(state),
    pagination: state.products.pagination,
    loading: state.productsSaved.loading,
    error: state.productsSaved.error,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
