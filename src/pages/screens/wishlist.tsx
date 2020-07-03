import React, { Component } from 'react'
import { View, Dimensions, FlatList, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div } from '@components/atoms/basic'
import { getProductSaved } from '@modules/product-saved/action'
import NavbarTop from '@components/molecules/navbar-top'
import { productListData } from '@hocs/data/product'
import ProductCard from '@components/molecules/product-card-new'
import ProductCardLoader from '@components/atoms/loaders/product-card'
const { width } = Dimensions.get('screen')

const ProductWithCardHoc = productListData(ProductCard)

class Wishlist extends Component<any, any> {
  limit = 10
  skip = 0
  lastSkip = 0

  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshFetch()
    })
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
    this.props.getProductSaved()
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
          width: width / 2 - 16,
          marginHorizontal: 8,
          marginVertical: 16,
          flex: 1,
        }}
      />
    )
  }

  _keyExtractor = (item, index) => '' + item + index

  render() {
    const { products, loading } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop leftContent={['back']} title="Wishlist" />
        {finishAnimation && !loading ? (
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ paddingHorizontal: 8 }}
              numColumns={2}
              onRefresh={this._freshFetch}
              keyExtractor={this._keyExtractor}
              refreshing={loading}
              data={products}
              renderItem={this._renderItem}
              onEndReached={this._fetchMore}
              onEndReachedThreshold={0.99}
              scrollIndicatorInsets={{ right: 1 }}
            />
          </View>
        ) : (
          <ProductCardLoader style={{ marginTop: 16, marginHorizontal: 16 }} />
        )}
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
