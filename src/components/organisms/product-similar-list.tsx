import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { OutlineButton } from '@src/components/atoms/button'
import ProductCard from '@components/molecules/product-card-new'
// import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import { productApi } from '@modules/product/action'
import { fontStyle } from '../commont-styles'
import YouMightAlsoLikeLoader from '../atoms/loaders/you-might-also-like'

const { width } = Dimensions.get('window')

const ProductWithCardHoc = productListData(ProductCard)

const styles = StyleSheet.create({
  futuraBold24: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 24,
  },
})

class ProductSimilar extends Component<any, any> {
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
          width: width / 2 - 24,
          marginVertical: 16,
          // flex: 1,
        }}
      />
    )
  }

  render() {
    const { products, loading } = this.props
    return (
      <Div _margin="32px 0px" align="stretch">
        <View style={{ marginLeft: 0, marginRight: 0 }}>
          <Text
            style={{
              ...fontStyle.playfairBold,
              fontSize: 24,
              color: colors.black100,
            }}>
            You Might Also Like
          </Text>
        </View>
        {loading ? (
          <YouMightAlsoLikeLoader />
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {products.map(item => this._renderItem({ item }))}
          </View>
        )}
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

const mapStateToProps = state => {
  return {
    products: state.products.order,
    pagination: state.products.pagination,
    loading: state.products.productsLoading,
    error: state.products.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSimilar)
