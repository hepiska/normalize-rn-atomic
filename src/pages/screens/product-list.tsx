import React, { Component } from 'react'
import {
  Dimensions,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  SectionList,
  View,
  Image,
} from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { productApi } from '@modules/product/action'
import NavbarTop from '@components/molecules/navbar-top'
// import ProductCard from '@components/molecules/product-card'
import ProductCard from '@components/molecules/product-card-new'
import { productListData } from '@hocs/data/product'
import { getBrand } from '@modules/brand/action'
import FilterTriger from '@components/organisms/product-filter-buttons'
import { futuraTitleFont, fontStyle } from '@components/commont-styles'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { getCollectionBySlug } from '@modules/collection/action'
import { getCategory } from '@modules/category/action'
import { deepClone } from '@utils/helpers'
import { colors } from '@utils/constants'
import { setImage } from '@utils/helpers'
import ErrorOrg from '@src/components/organisms/four-o-four'
import ProductEmpty from '@components/organisms/product-empty'
import ProductListLoader from '@components/atoms/loaders/two-column-card'
import ProductHeader from '@components/atoms/loaders/product-list-header'
import ProductListPageLoader from '@components/atoms/loaders/product-list'
import {
  addFilterData,
  clearFilter,
  setBrandFilter,
  setFilter,
  clearActivePage,
  setActivePage,
  changeSelectedBrand,
  changeSelectedCategory,
  setSelectedCollection,
  resetSelectedCollection,
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
  brandTitle: {
    ...fontStyle.playfairBold,
  },
  sectionHeader: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
  },
})

const ProductWithCardHoc = productListData(ProductCard)

const imageHeight = 103

class Productlist extends Component<any, any> {
  state = {
    skip: 0,
    headerName: 'Product',
    finishAnimation: false,
  }
  limit = 20

  skip = 0
  lastskip = 0

  navListener = null

  componentDidMount() {
    const { route, brand, category, getCategory } = this.props

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })

      if (route.params.from === 'collections' && route.params.collectionsSlug)
        return this.props.getCollectionBySlug(route.params.collectionsSlug)
      if (route.params.from === 'brands' && (brand || route.params.brandSlug)) {
        return this.props.getBrand(route.params.brandsSlug || brand.id)
      }
      if (
        route.params.from === 'categories' &&
        (category || route.params.categoriesSlug)
      ) {
        return getCategory(route.params.categoriesSlug || category.id)
      }
    })
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
    this.props.resetSelectedCollection()
    this.props.clearActivePage()
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
      setActivePage,
      changeSelectedCategory,
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
      setActivePage({ type: 'collection_ids', ids: [collection.id] })

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
      setActivePage({ type: 'brand_ids', ids: [brand.id] })

      this._freshfetch()
    } else if (category) {
      setFilter({
        categories: category.categories,
        prices: {
          maximum_price: category.price_max,
          minimum_price: category.price_min,
        },
      })
      // changeSelectedCategory(category.id)
      setActivePage({ type: 'category_ids', ids: [category.id] })
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
      route,
      category,
    } = this.props
    const params: any = {
      limit: this.limit,
      is_commerce: true,
      offset: skip * this.limit,
      ...sort.value,
      ...appliedFilters,
    }

    const { from } = route.params

    if (search) {
      params.name = search
    }

    if (collection) {
      params.collection_ids = collection.id
    }
    if (brand) {
      params.brand_ids = brand.id
    }
    if (!appliedFilters.category_ids) {
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
      if (this.props.pagination?.total > this.props.products.length) {
        this._fetchData(this.skip)
      }
    }
  }

  _renderHeader = () => (
    <>
      <FilterTriger style={{ paddingHorizontal: 16 }} />
    </>
  )

  _renderItem = ({ section, index }) => {
    const {
      isCategoryLoading,
      isBrandLoading,
      isCollectionLoading,
    } = this.props

    const headerLoading =
      isCategoryLoading || isBrandLoading || isCollectionLoading

    if ((this.props.loading && this.skip === 0) || headerLoading) {
      return <ProductListLoader style={{ marginLeft: 16 }} />
    }

    const numColumns = 2
    if (index % numColumns !== 0) return null
    const items = []

    for (let i = index; i < index + numColumns; i++) {
      if (section.data[i]) {
        items.push(
          <ProductWithCardHoc
            productId={section.data[i]}
            // product={item}
            key={'' + section.data[i] + index}
            style={{
              // flex: 1,
              // wrappermargin: 8,
              // width: width / 2,
              margin: 8,
              flex: 1,
            }}
          />,
        )
      }
    }

    return (
      <View
        key={'' + index}
        style={{
          paddingHorizontal: 8,
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
    const {
      collection,
      brand,
      route,
      isCategoryLoading,
      isBrandLoading,
      isCollectionLoading,
    } = this.props

    if (route.params.from === 'categories') {
      return null
    }

    const headerData: any = {
      // image:
      // 'https://shonet.imgix.net/commerce/Loueve/#LJRING14-MAIN.jpg?q=75&auto=compress,format&w=350',
    }
    if (brand) {
      headerData.title = brand?.name
      headerData.image = brand?.image_url || headerData.image
    } else if (collection) {
      headerData.title = collection.title
      headerData.image = collection.landscape_image_url || headerData.image
    }
    const loading = isCategoryLoading || isBrandLoading || isCollectionLoading
    return this.props.headerError ? (
      <ErrorOrg />
    ) : (
      <View style={{ padding: 16 }}>
        {loading ? (
          <ProductHeader />
        ) : (
          <View
            style={{
              height: imageHeight,
              alignItems: 'center',
              backgroundColor: colors.black100,
              borderRadius: 8,
              justifyContent: 'center',
            }}>
            {headerData.image && (
              <Image
                style={StyleSheet.absoluteFillObject}
                source={{
                  uri: setImage(headerData.image, {
                    width,
                    height: imageHeight,
                  }),
                }}
              />
            )}
            <Font style={styles.brandTitle} color="white" size="24">
              {headerData.title}
            </Font>
          </View>
        )}
      </View>
    )
  }

  emptyComponent = () => {
    const { headerError, loading } = this.props
    if (loading && this.skip === 0) {
      return <ProductListLoader style={{ margin: 16 }} />
    }
    return (
      <>
        <FilterTriger style={{ paddingHorizontal: 16 }} />
        <ProductEmpty
          title="No Results Found"
          subtitle="We're sorry! We can't find any products available"
        />
      </>
    )
  }

  render() {
    const {
      products,
      pagination,
      loading,
      brand,
      collection,
      selectedFilter,
      category,
      headerError,
    } = this.props
    const headerData: any = {
      // image:
      // 'https://shonet.imgix.net/commerce/Loueve/#LJRING14-MAIN.jpg?q=75&auto=compress,format&w=350',
    }

    if (brand) {
      headerData.title = brand?.name
      headerData.image = brand?.image_url || headerData.image
    } else if (collection) {
      headerData.title = collection.title
      headerData.image = collection.landscape_image_url || headerData.image
    } else if (category) {
      headerData.title = category.name
    }

    if (loading) {
      pagination.total
    }

    const sectionData = !headerError
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
          title={headerData.title || ''}
          subtitle={
            loading
              ? 'loading....'
              : `${headerError ? 0 : pagination.total} Items`
          }
        />

        {this.state.finishAnimation ? (
          <Div _width="100%" _flex="1" justify="flex-start">
            <SectionList
              onRefresh={this._freshfetch}
              refreshing={loading}
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
              scrollIndicatorInsets={{ right: 1 }}
            />
          </Div>
        ) : (
          <ProductListPageLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      productApi,
      setBrandFilter,
      resetSelectedCollection,
      setFilter,
      addFilterData,
      getCollectionBySlug,
      changeSelectedBrand,
      clearFilter,
      getBrand,
      changeSelectedCategory,
      clearActivePage,
      setActivePage,
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
    (route.params.from === 'collections' ||
      route.params.from === 'collection') &&
    (collectionId || route.params.collectionsSlug)
  ) {
    return {
      collection: collectionId && state.collection.data[collectionId],
      headerError: state.collection.error,
      products: collectionId ? state.products.order : [],
      isCollectionLoading: state.collection.loading,
      loading: state.products.productsLoading,
      pagination: { total: state.products.pagination.total || 0 },
      ...filterProps,
    }
  }

  const brandId =
    route.params.brandId || route.params.brandsId || state.brands.activeBrand

  if (
    (route.params.from === 'brands' || route.params.from === 'brand') &&
    (brandId || route.params.brandsSlug)
  ) {
    return {
      brand: state.brands.data[brandId] || { id: brandId },
      headerError: state.brands.error,
      loading: state.products.productsLoading,
      isBrandLoading: state.brands.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }

  const categoriesId =
    route.params.categoriesId ||
    route.params.categoryId ||
    state.categories.activeCategory

  if (
    (route.params.from === 'categories' || route.params.from === 'category') &&
    (categoriesId || route.params.categoriesSlug)
  ) {
    return {
      category: state.categories.data[categoriesId] || { id: categoriesId },
      headerError: state.categories.error,
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
