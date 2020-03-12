import React, { Component } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { onScroll } from 'react-native-redash'
import { Div, Font } from '@components/atoms/basic'
import {
  helveticaBlackBold,
  helveticaNormalFont,
} from '@components/commont-styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ProductApi } from '@modules/product/action'
import NavbarTop from '@components/molecules/navbar-top'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import FilterTriger from '@components/organisms/product-filter-buttons'
import FilterBottomSheet from '@components/organisms/product-filter'
const { width } = Dimensions.get('window')

const { Value, interpolate } = Animated

const scrollPos = new Value(0)

const ProductWithCardHoc = productListData(ProductCard)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const imageHeight = 205

const height = interpolate(scrollPos, {
  inputRange: [-1, 0, imageHeight],
  outputRange: [imageHeight, imageHeight, 0],
})
class Productlist extends Component<any, any> {
  state = {
    skip: 0,
    headerName: 'Product',
  }
  limit = 20

  skip = 0
  lastskip = 0

  componentDidMount() {
    this.freshfetch()
  }

  fetchData = skip => {
    this.props.ProductApi({ limit: this.limit, offset: skip * this.limit })
    // this.setState({ skip: this.state.skip + 1 })
  }

  freshfetch = async () => {
    try {
      await this.props.ProductApi({
        limit: this.limit,
        offset: 0,
      })
      this.lastskip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }
  fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.loading) {
        return
      }
      this.fetchData(this.skip)
    }
  }

  _renderHeader = (
    <>
      <FilterTriger />
    </>
  )

  _renderItem = ({ item }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        style={{
          flex: 1,
          wrappermargin: 16,
          width: width / 2,
        }}
      />
    )
  }

  _keyExtractor = item => item

  static navigationOptions = {
    transparent: false,
  }
  render() {
    const { headerName } = this.state
    const { navigation, products, pagination } = this.props
    navigation.setOptions({
      header: () => {
        return (
          <NavbarTop>
            <Div justify="center" _width="100%">
              <Font {...helveticaBlackBold}>{headerName}</Font>
              <Font {...{ ...helveticaNormalFont, size: 12 }}>
                {pagination.total} Items
              </Font>
            </Div>
          </NavbarTop>
        )
      },
    })
    return (
      <Div _width="100%" _flex="1">
        {this.props.brand && (
          <Animated.View
            style={{
              height,
              width: '100%',
              backgroundColor: 'black',
            }}
          />
        )}
        <AnimatedFlatList
          onEndReached={this.fetchMore}
          onScroll={onScroll({ y: scrollPos })}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            marginHorizontal: 16,
          }}
          stickyHeaderIndices={[0]}
          onEndReachedThreshold={0.97}
          ListHeaderComponent={this._renderHeader}
          style={{ width: '100%' }}
          data={products}
          numColumns={2}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <FilterBottomSheet />
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ProductApi,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  products: state.products.order,
  pagination: state.products.pagination,
  loading: state.products.loading,
  error: state.products.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Productlist)
