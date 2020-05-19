import React, { Component } from 'react'
import { View, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div } from '@components/atoms/basic'
import { getProductSaved } from '@modules/product-saved/action'
import NavbarTop from '@components/molecules/navbar-top'
import { productListData } from '@hocs/data/product'
import ProductCard from '@components/molecules/product-card'
import InviniteLoader from '@src/components/atoms/loaders/invinite'

const { width } = Dimensions.get('screen')

const ProductWithCardHoc = productListData(ProductCard)

class Wishlist extends Component<any, any> {
  limit = 10
  skip = 0
  lastSkip = 0

  componentDidMount() {
    this._freshFetch()
  }

  _freshFetch = async () => {
    try {
      this._fetchData(0)
      this.skip = 0
      this.lastSkip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchData = skip => {
    const params = {
      limit: this.limit,
      offset: this.limit * skip,
    }
    this.props.getProductSaved(params)
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newSkip = this.skip + 1
      if (newSkip > this.lastSkip) {
        this.skip = newSkip
        this.lastSkip = newSkip
      }

      if (this.props.loading) {
        return
      }
      if (30 > this.props.products.length) {
        this._fetchData(this.skip)
      }
    }
  }

  _renderItem = ({ item }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        key={'' + item}
        style={{
          flex: 1 / 2,
          wrappermargin: 4,
          width: width / 2,
        }}
      />
    )
  }

  _keyExtractor = (item, index) => '' + item + index

  render() {
    const { products, loading } = this.props
    return (
      <>
        <NavbarTop leftContent={['back']} title="Wishlist" />
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={2}
            keyExtractor={this._keyExtractor}
            data={products}
            renderItem={this._renderItem}
            onEndReached={this._fetchMore}
            onEndReachedThreshold={0.99}
            scrollIndicatorInsets={{ right: 1 }}
          />
          {loading && (
            <Div
              style={{ position: 'absolute', bottom: 0, left: 0 }}
              justify="center"
              _width="100%"
              _background="rgba(0,0,0,0.3)"
              _height="64px">
              <InviniteLoader />
            </Div>
          )}
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductSaved,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    products: state.productsSaved.order,
    pagination: state.products.pagination,
    loading: state.productsSaved.loading,
    error: state.productsSaved.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
