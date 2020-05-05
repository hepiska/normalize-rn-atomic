import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { OutlineButton } from '@src/components/atoms/button'
import ProductCard from '@components/molecules/product-card'
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
          wrappermargin: 16,
          minHeight: null,
        }}
        horizontal
      />
    )
  }

  render() {
    const { products, loading } = this.props
    return (
      <Div _flex={1} _margin="64px 0px" _width="100%" align="flex-start">
        <View style={{ marginLeft: 8, marginRight: 8 }}>
          <Text
            style={{
              ...styles.futuraBold24,
              color: colors.black100,
            }}>
            You Might Also Like
          </Text>
        </View>
        {loading && products.length === 0 ? (
          <YouMightAlsoLikeLoader />
        ) : (
          <Div
            _direction="row"
            _flex={1}
            align="flex-start"
            style={{ flexWrap: 'wrap' }}>
            {products.map(item => (
              <Div key={item} _width="100%">
                {this._renderItem({ item })}
              </Div>
            ))}
          </Div>
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
    loading: state.products.loading,
    error: state.products.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSimilar)
