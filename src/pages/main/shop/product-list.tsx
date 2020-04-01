import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  SectionList,
  View,
} from 'react-native'

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
import { colors } from '@utils/constants'
import {
  addFilterData,
  clearFilter,
  setBrandFilter,
  setFilter,
  setSelectedCollection,
} from '@modules/product-filter/action'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    // paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  itemFont: {
    color: colors.black70,
    fontSize: 14,
  },
  sectionHeader: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
  },
})

const ProductWithCardHoc = productListData(ProductCard)

const imageHeight = 205

class Productlist extends Component<any, any> {
  state = {
    skip: 0,
    headerName: 'Product',
  }
  limit = 15

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
      if (!this.props.isCollectionLoading) {
        this._setInitialState()
        return
      }
    }

    if (this.props.search !== prevProps.search) {
      this._freshfetch()
      return ''
    }
    if (this.props.sort !== prevProps.sort) {
      this._freshfetch()
      return ''
    }

    if (
      JSON.stringify(this.props.appliedFilters) !==
      JSON.stringify(prevProps.appliedFilters)
    ) {
      if (!this.props.isCollectionLoading) this._freshfetch()
      return
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
    const { collection, appliedFilters, search, sort } = this.props
    const params: any = {
      limit: this.limit,
      is_commerce: true,
      offset: skip * this.limit,
      ...sort.value,
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

  _renderHeader = () => (
    <>
      <FilterTriger style={{ paddingHorizontal: 16 }} />
    </>
  )

  _renderItem = ({ item, index }) => {
    const numColumns = 2
    if (index % numColumns !== 0) return null
    const items = []

    for (let i = index; i < index + numColumns; i++) {
      items.push(
        <ProductWithCardHoc
          productId={item}
          key={'' + item + index}
          style={{
            flex: 1,
            wrappermargin: 16,
            width: width / 2,
          }}
        />,
      )
    }

    return (
      <View
        key={'' + item + index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {items}
      </View>
    )
  }

  _keyExtractor = (item, index) => '' + item + index

  static navigationOptions = {
    transparent: false,
  }

  _sectionData = {
    title: 'asa',
    data: this.props.products,
  }
  _header = (
    <ImageBackground
      style={{
        width: '100%',
        height: imageHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      source={
        this.props.collection
          ? { uri: this.props.collection.landscape_image_url }
          : require('../../../assets/placeholder/placeholder-image.png')
      }>
      <Font {...futuraTitleFont} size="24">
        {this.props.collection && this.props.collection.title}
      </Font>
    </ImageBackground>
  )
  render() {
    const { headerName } = this.state
    const { navigation, products, pagination } = this.props
    const sectionData = [
      {
        title: 'asa',
        data: products,
      },
    ]
    // navigation.setOptions({
    //   header: () => {
    //     return (
    //       <NavbarTop>
    //         <Div justify="center" _width="100%">
    //           <Font {...helveticaBlackBold}>{headerName}</Font>
    //           <Font {...{ ...helveticaNormalFont, size: 12 }}>
    //             {pagination.total} Items
    //           </Font>
    //         </Div>
    //       </NavbarTop>
    //     )
    //   },
    // })
    return (
      <>
        <NavbarTop>
          <Div justify="center" _width="100%">
            <Font {...helveticaBlackBold}>{headerName}</Font>
            <Font {...{ ...helveticaNormalFont, size: 12 }}>
              {pagination.total} Items
            </Font>
          </Div>
        </NavbarTop>
        <Div _width="100%" _flex="1" justify="flex-start">
          <SectionList
            ListHeaderComponent={this._header}
            style={styles.sectionContainer}
            onEndReachedThreshold={0.97}
            onEndReached={this._fetchMore}
            keyExtractor={this._keyExtractor}
            renderSectionHeader={this._renderHeader}
            sections={sectionData}
            stickySectionHeadersEnabled
            renderItem={this._renderItem}
          />
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
      </>
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

  if (route.params && route.params.collectionId) {
    const collection =
      route.params.collectionId &&
      state.collection.data[route.params.collectionId]
    return {
      collection:
        route.params.collectionId &&
        state.collection.data[route.params.collectionId],
      products: state.products.order,
      sort: state.sort.selected,
      search: state.productFilter.search,
      isCollectionLoading: state.collection.loading,
      appliedFilters,
      loading: state.products.productsLoading,
      pagination: { total: collection && collection.products.length },
    }
  }

  return {
    products: state.products.order,
    pagination: state.products.pagination,
    appliedFilters,
    sort: state.sort.selected,
    loading: state.products.productsLoading,
    error: state.products.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist)
