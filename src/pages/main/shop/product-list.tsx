import React, { Component } from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  SectionList,
  View,
} from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { productApi } from '@modules/product/action'
import NavbarTop from '@components/molecules/navbar-top'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import { getBrand } from '@modules/brand/action'
import FilterTriger from '@components/organisms/product-filter-buttons'
import { futuraTitleFont } from '@components/commont-styles'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { getCollectionBySlug } from '@modules/collection/action'
import { getCategory } from '@modules/category/action'
import { deepClone } from '@utils/helpers'
import { colors } from '@utils/constants'
import ErrorOrg from '@src/components/organisms/four-o-four'
import ProductEmpty from '@components/organisms/product-empty'
import {
  addFilterData,
  clearFilter,
  setBrandFilter,
  setFilter,
  changeSelectedBrand,
  changeSelectedCategory,
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
  limit = 20

  skip = 0
  lastskip = 0

  navListener = null

  componentDidMount() {
    const { route, brand, category, getCategory } = this.props
    if (route.params.from === 'collections' && route.params.collectionsSlug)
      return this.props.getCollectionBySlug(route.params.collectionsSlug)
    if (route.params.from === 'brands' && (brand || route.params.brandSlug)) {
      return this.props.getBrand(brand.id || route.params.brandsSlug)
    }
    if (
      route.params.from === 'categories' &&
      (category || route.params.categoriesSlug)
    ) {
      getCategory(category.id || route.params.categoriesSlug)
    }
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

    if (
      this.props.brand &&
      this.props.isBrandLoading !== prevProps.isBrandLoading
    ) {
      if (!this.props.isBrandLoading) {
        this._setInitialState()
        return
      }
    }

    if (
      this.props.category &&
      this.props.isCategoryLoading !== prevProps.isCategoryLoading
    ) {
      if (!this.props.isCategoryLoading) {
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
      brand,
      setFilter,
      category,
      setBrandFilter,
      changeSelectedBrand,
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
    } else if (brand) {
      setFilter({
        categories: brand.categories || [],
        prices: {
          maximum_price: brand.price_max,
          minimum_price: brand.price_min,
        },
      })
      changeSelectedBrand(brand.id)
      setBrandFilter(brand.brands || [])

      this._freshfetch()
    } else if (category) {
      setFilter({
        categories: category.categories,
        prices: {
          maximum_price: category.price_max,
          minimum_price: category.price_min,
        },
      })
      changeSelectedCategory(category.id)
      setBrandFilter(category.brands)
      this._freshfetch()
    }
  }

  _fetchData = skip => {
    const {
      collection,
      appliedFilters,
      search,
      sort,
      brand,
      category,
    } = this.props
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
    if (brand) {
      params.brand_ids = brand.id
    }
    if (category) {
      params.category_ids = category.id
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

  _renderItem = ({ section, index }) => {
    const numColumns = 2
    if (index % numColumns !== 0) return null
    const items = []

    for (let i = index; i < index + numColumns; i++) {
      items.push(
        <ProductWithCardHoc
          productId={section.data[i]}
          // product={item}
          key={'' + section.data[i] + index}
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
        key={'' + index}
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

  _header = () => {
    const { collection, brand, route } = this.props

    if (route.params.from === 'categories') {
      return null
    }

    const headerData: any = {
      // image:
      // 'https://shonet.imgix.net/commerce/Loueve/#LJRING14-MAIN.jpg?q=75&auto=compress,format&w=350',
    }
    if (brand) {
      headerData.title = brand.name
      headerData.image = brand.image_url || headerData.image
    } else if (collection) {
      headerData.title = collection.title
      headerData.image = collection.landscape_image_url || headerData.image
    }

    return this.props.headerError ? (
      <ErrorOrg />
    ) : (
      <ImageBackground
        style={{
          width: '100%',
          height: imageHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{
          uri: headerData.image,
        }}>
        <Font {...futuraTitleFont} size="24">
          {headerData.title}
        </Font>
      </ImageBackground>
    )
  }

  emptyComponent = () =>
    !this.props.headerError ? (
      <>
        <FilterTriger style={{ paddingHorizontal: 16 }} />
        <ProductEmpty
          title="No Results Found"
          subtitle="We're sorry! We can't find any products available"
        />
      </>
    ) : null

  render() {
    const { headerName } = this.state
    const { products, pagination, loading } = this.props
    const sectionData = products.length
      ? [
          {
            title: 'mantap',
            data: products,
          },
        ]
      : []
    return (
      <>
        <NavbarTop
          leftContent={['back']}
          title={headerName}
          subtitle={`${pagination.total} Items`}
        />
        <Div _width="100%" _flex="1" justify="flex-start">
          <SectionList
            ListHeaderComponent={this._header}
            style={styles.sectionContainer}
            onEndReachedThreshold={0.97}
            onEndReached={this._fetchMore}
            ListEmptyComponent={this.emptyComponent}
            keyExtractor={this._keyExtractor}
            renderSectionHeader={this._renderHeader}
            sections={sectionData}
            stickySectionHeadersEnabled
            renderItem={this._renderItem}
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
      changeSelectedBrand,
      clearFilter,
      getBrand,
      changeSelectedCategory,
      setSelectedCollection,
      getCategory,
    },
    dispatch,
  )

const mapStateToProps = (state, { route }) => {
  let appliedFilters = deepClone(state.productFilter.applied)
  appliedFilters = { ...appliedFilters, ...appliedFilters.prices }
  delete appliedFilters.prices

  const collectionId =
    route.params.collectionId || state.collection.activeCollection

  const filterProps = {
    sort: state.sort.selected,
    search: state.productFilter.search,
    appliedFilters,
  }

  // const commontErrorProps = {
  //   globalError: state.global.error,
  //   Producterror: state.products.error,
  // }

  // if (state.global.error || state.collection.error || state.products.error) {
  //   return {
  //     globalError: state.global.error,
  //     products: [],
  //     loading: state.products.productsLoading,
  //     collectionError: state.collection.error,
  //     Producterror: state.products.error,
  //     ...filterProps,
  //   }
  // }

  if (
    route.params.from === 'collections' &&
    (collectionId || route.params.collectionsSlug)
  ) {
    return {
      collection: collectionId && state.collection.data[collectionId],
      headerError: state.global.error,
      products: collectionId ? state.products.order : [],
      isCollectionLoading: state.collection.loading,
      loading: state.products.productsLoading,
      pagination: { total: state.products.pagination.total || 0 },
      ...filterProps,
    }
  }

  const brandId = route.params.brandId || route.params.brandsId

  if (route.params.from === 'brands' && (brandId || route.params.brandsSlug)) {
    return {
      brand: state.brands.data[brandId] || { id: brandId },
      headerError: state.global.error,
      loading: state.products.productsLoading,
      isBrandLoading: state.brands.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }

  const categoriesId = route.params.categoriesId || route.params.categoryId

  if (
    route.params.from === 'categories' &&
    (categoriesId || route.params.categoriesSlug)
  ) {
    return {
      category: state.categories.data[categoriesId] || { id: categoriesId },
      headerError: state.global.error,
      loading: state.products.productsLoading,
      isCategoryLoading: state.categories.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }

  return {
    globalError: state.global.error,
    products: [],
    loading: state.products.productsLoading,
    collectionError: state.collection.error,
    Producterror: state.products.error,
    ...filterProps,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist)
