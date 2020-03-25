import React, { Component } from 'react'
import { Dimensions, FlatList, ImageBackground } from 'react-native'
import Animated from 'react-native-reanimated'
import { onScroll } from 'react-native-redash'
import { Div, Font } from '@components/atoms/basic'
import {
  helveticaBlackBold,
  helveticaNormalFont,
} from '@components/commont-styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { productApi } from '@modules/product/action'
import NavbarTop from '@components/molecules/navbar-top'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import FilterTriger from '@components/organisms/product-filter-buttons'
import FilterBottomSheet from '@components/organisms/product-filter'
import { futuraTitleFont } from '@components/commont-styles'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { getCollectionBySlug } from '@modules/collection/action'
import { deepClone } from '@utils/helpers'
import {
  addFilterData,
  clearFilter,
  setBrandFilter,
  setFilter,
  setSelectedCollection,
} from '@modules/product-filter/action'
const { width } = Dimensions.get('window')

const { Value, interpolate, Extrapolate } = Animated

const scrollPos = new Value(0)

const ProductWithCardHoc = productListData(ProductCard)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const imageHeight = 205

const height = interpolate(scrollPos, {
  inputRange: [-1, 0, imageHeight],
  outputRange: [imageHeight, imageHeight, 0],
  extrapolate: Extrapolate.CLAMP,
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
    this.props.getCollectionBySlug('rafie-botakksszzzszszszz')

    if (this.props.collection)
      this.props.getCollectionBySlug('rafie-botakksszzzszszszz')
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.collection &&
      this.props.isCollectionLoading !== prevProps.isCollectionLoading
    ) {
      if (!this.props.isCollectionLoading) this._setInitialState()
    }

    if (this.props.search !== prevProps.search) this._freshfetch()

    if (
      JSON.stringify(this.props.appliedFilters) !==
      JSON.stringify(prevProps.appliedFilters)
    ) {
      if (!this.props.isCollectionLoading) this._freshfetch()
    }
  }

  componentWillUnmount() {
    this.props.clearFilter()
  }

  _setInitialState() {
    const {
      collection,
      setFilter,
      setBrandFilter,
      setSelectedCollection,
    } = this.props
    if (collection) {
      setFilter({
        categories: collection.categories,
        prices: {
          maximum_price: collection.max_price,
          minimum_price: collection.min_price,
        },
      })
      setSelectedCollection(collection.id)
      setBrandFilter(collection.brands)
      this._freshfetch()
    } else {
      this._freshfetch()
    }
  }

  _fetchData = skip => {
    const { collection, appliedFilters, search } = this.props
    const params: any = {
      limit: this.limit,
      offset: skip * this.limit,
      ...appliedFilters,
    }

    if (search) {
      params.name = search
    }

    if (collection) {
      params.collection_ids = collection.id
    }

    this.props.productApi(params)
  }

  _freshfetch = async () => {
    try {
      this._fetchData(0)
      this.lastskip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
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
      this._fetchData(this.skip)
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

  _keyExtractor = (item, index) => '' + item + index

  static navigationOptions = {
    transparent: false,
  }
  render() {
    const { headerName } = this.state
    const { navigation, products, pagination, collection } = this.props
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
      <Div _width="100%" _flex="1" justify="flex-start">
        {collection && (
          <Animated.View
            style={{
              height,
              width: '100%',
              overflow: 'hidden',
            }}>
            <ImageBackground
              style={{
                width: '100%',
                height: imageHeight,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              source={{ uri: collection.landscape_image_url }}>
              <Font {...futuraTitleFont} size="24">
                {collection.title}
              </Font>
            </ImageBackground>
          </Animated.View>
        )}
        {this.props.isCollectionLoading ? (
          <InviniteLoader />
        ) : (
          <AnimatedFlatList
            onEndReached={this._fetchMore}
            onScroll={onScroll({ y: scrollPos })}
            contentContainerStyle={{
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
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
        )}
        {this.props.loading && (
          <Div
            style={{ position: 'absolute', bottom: 0, left: 0 }}
            justify="center"
            _width="100%"
            _background="rgba(0,0,0,0.3)"
            _height="64px">
            <InviniteLoader />
          </Div>
        )}

        <FilterBottomSheet />
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      productApi,
      setBrandFilter,
      setFilter,
      addFilterData,
      getCollectionBySlug,
      clearFilter,
      setSelectedCollection,
    },
    dispatch,
  )

const mapStateToProps = (state, { route }) => {
  let appliedFilters = deepClone(state.productFilter.applied)
  appliedFilters = { ...appliedFilters, ...appliedFilters.prices }
  delete appliedFilters.prices
  if (route.params.collectionId) {
    const collection =
      route.params.collectionId &&
      state.collection.data[route.params.collectionId]
    return {
      collection:
        route.params.collectionId &&
        state.collection.data[route.params.collectionId],
      products: state.products.order,
      search: state.productFilter.search,
      isCollectionLoading: state.collection.loading,
      appliedFilters,
      loading: state.products.loading,
      pagination: { total: collection && collection.products.length },
    }
  }

  return {
    products: state.products.order,
    pagination: state.products.pagination,
    appliedFilters,
    loading: state.products.loading,
    error: state.products.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist)
