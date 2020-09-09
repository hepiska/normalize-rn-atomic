import React, { Component } from 'react'
import { Text, View, Dimensions, InteractionManager } from 'react-native'
import { productListData } from '@src/hocs/data/product'
import ProductCard from '@components/molecules/product-card-new'
import { productApi } from '@modules/product/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EmptyState from '@components/molecules/order-empty-state'
import List from '@components/layouts/list-header'
import { FlatList } from '../atoms/basic'
import ProductCardLoader from '@components/atoms/loaders/product-card'

const ProductWithCardHoc = productListData(ProductCard)
const { width } = Dimensions.get('screen')

class Product extends React.Component<any, any> {
  state = {
    finishAnimation: false,
  }

  limit = 100
  skip = 0
  lastskip = 0

  shouldComponentUpdate(nextProps) {
    const { products, activity, loading } = this.props
    if (products && products.length !== nextProps.products.length) {
      return true
    }
    if (nextProps.activity !== activity) {
      console.log('trigger by parent', activity)
      this._freshfetch()
    }
    if (loading !== nextProps.loading) {
      return true
    }
    return false
  }

  // componentDidMount() {
  //   InteractionManager.runAfterInteractions(() => {
  //     this.setState({ finishAnimation: true })
  //   )}
  // }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      return this._freshfetch()
    })
  }

  _fetchData = skip => {
    const ProductParams: any = {
      limit: this.limit,
      is_commerce: true,
      offset: this.limit * skip,
    }
    this.props.productApi(ProductParams)
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
    this.setState({
      finishAnimation: true,
    })
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.loading) {
        return
      }
      if (this.props.pagination?.total > this.props.products.length) {
        this._fetchData(this.skip)
      }
    }
  }

  _emptyState = () => {
    return (
      <EmptyState
        title={`No Product`}
        description="You Dont Have Product in this Section"
      />
    )
  }

  _renderItem = ({ item, index }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        key={'product-list' + item + index}
        style={{
          maxWidth: width / 2 - 16,
          minHeight: 220,
          margin: 8,
          flex: 1,
        }}
      />
    )
  }

  // renderFooter = () => {
  //   const { loading, products } = this.props
  //   if (!loading && products.length < 4) {
  //     return null
  //   }
  //   return (
  //     <View style={{ height: 200 }}>
  //       {loading && <ProductCardLoader style={{ margin: 16 }} />}
  //     </View>
  //   )
  // }

  _keyExtractor = (item, index) => 'product-item' + item + index

  render() {
    const { products, style, loading } = this.props
    const { finishAnimation } = this.state

    return (
      <View style={{ ...style }}>
        {finishAnimation && !loading ? (
          <FlatList
            onEndReached={this._fetchMore}
            onEndReachedThreshold={0.97}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment="center"
            data={products}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            contentContainerStyle={{ margin: 8 }}
            // ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this._emptyState}
          />
        ) : (
          <ProductCardLoader style={{ margin: 16 }} />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.order,
    loading: state.products.productsLoading,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ productApi }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Product)
