import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { OutlineButton } from '@src/components/atoms/button'
import { getProductSaved } from '@modules/product-saved/action'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import { productApi } from '@modules/product/action'
// import { addCart } from '@modules/cart/action'

const { width } = Dimensions.get('window')

const ProductWithCardHoc = productListData(ProductCard)

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

  render() {
    const { products, loading } = this.props
    return (
      <Div _flex={1} _margin="64px 0px 0px" _width="100%" align="flex-start">
        <Font
          type="Futura"
          size={24}
          color={colors.black100}
          _margin="0px 8px"
          style={{ fontWeight: '500' }}>
          Wishlist
        </Font>
        {/* revisit: need change to flatlist */}
        <Div
          _direction="row"
          _flex={1}
          justify="space-between"
          align="flex-start"
          style={{ flexWrap: 'wrap' }}>
          {loading
            ? null
            : products.map((item, k) => (
                <ProductWithCardHoc
                  key={item}
                  onAddtoCart={this._openCartModal(item)}
                  productId={item}
                  style={{
                    wrappermargin: 8,
                    paddingHorizontal: 0,
                    width: width / 2 - 16,
                  }}
                />
              ))}
        </Div>
        <Div _padding="0px 8px" _width="100%">
          <OutlineButton
            title="See All"
            onPress={null}
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

const mapStateToProps = state => ({
  products: state.productsSaved.order,
  pagination: state.products.pagination,
  loading: state.productsSaved.loading,
  error: state.productsSaved.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
