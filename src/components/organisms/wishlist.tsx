import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { OutlineButton } from '@src/components/atoms/button'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import { productApi } from '@modules/product/action'

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

  freshfetch = async () => {
    try {
      await this.props.productApi({
        limit: this.limit,
        offset: 0,
      })
      this.lastskip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _renderItem = ({ item }) => {
    return (
      <ProductWithCardHoc
        key={item}
        productId={item}
        style={{
          flex: 1,
          wrappermargin: 16,
          width: width / 2,
        }}
      />
    )
  }

  render() {
    const { products } = this.props
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
        <Div
          _direction="row"
          _flex={1}
          align="flex-start"
          style={{ flexWrap: 'wrap' }}>
          {products.map(item => (
            <Div key={item} _width="50%" _height={430}>
              {this._renderItem({ item })}
            </Div>
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
    },
    dispatch,
  )

const mapStateToProps = state => ({
  products: state.products.order,
  pagination: state.products.pagination,
  loading: state.products.loading,
  error: state.products.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)