import React, { Component } from 'react'
import ProdcutListOrg from '@components/organisms/product-list'
import { InteractionManager } from 'react-native'
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
import { productApi } from '@modules/product/action'
import { getBrand } from '@modules/brand/action'

import ProductListPageLoader from '@components/atoms/loaders/product-list'

import NavbarTop from '@components/molecules/navbar-top'
import { bindActionCreators } from 'redux'
import { connect, batch } from 'react-redux'

import isEqual from 'lodash/isEqual'

import {
  makeflatenFilter,
  makecloneAppliedFilter,
} from '@modules/product-filter/selector'

class BrandProductList extends Component<any, any> {
  skip = 0
  lastskip = 0
  limit = 20

  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    const { route, getBrand, brand } = this.props

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      return getBrand(route.params.brandsSlug || brand.id)
    })
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    if (!isEqual(props.brand, nextProps.brand)) {
      return true
    }

    if (!isEqual(props.headerError, nextProps.headerError)) {
      return true
    }
    if (props.headerLoading !== nextProps.headerLoading.headerLoading) {
      return true
    }

    if (
      !isEqual(props.appliedFilters, nextProps.appliedFilters) ||
      !isEqual(nextProps.search, props.search) ||
      !isEqual(nextProps.sort, props.sort)
    ) {
      return true
    }

    if (props.products.length !== nextProps.products.length) {
      return true
    }
    if (props.loading !== nextProps.loading) {
      return true
    }
    return false
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.brand &&
      this.props.headerLoading !== prevProps.headerLoading
    ) {
      if (!this.props.headerLoading) {
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

    if (!isEqual(this.props.appliedFilters, prevProps.appliedFilters)) {
      if (!this.props.isCollectionLoading) this._freshfetch()
      return
    }
  }

  componentWillUnmount() {
    batch(() => {
      this.props.resetSelectedCollection()
      this.props.clearActivePage()
      this.props.clearFilter()
    })
  }

  _setInitialState() {
    const {
      brand,
      setFilter,
      setBrandFilter,
      setSelectedCollection,
      setActivePage,
    } = this.props

    batch(() => {
      setFilter({
        categories: brand.categories,
        prices: {
          maximum_price: brand.max_price,
          minimum_price: brand.min_price,
        },
      })
      setSelectedCollection(brand.id)
      setBrandFilter(brand.brands || [])
      setActivePage({ type: 'brand_ids', ids: [brand.id] })
    })

    this._freshfetch()
  }

  _fetchData = skip => {
    const { appliedFilters, search, sort, brand } = this.props
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

    if (brand) {
      params.brand_ids = brand.id
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

  render() {
    const {
      headerLoading,
      pagination,
      loading,
      headerError,
      products,
      brand,
    } = this.props

    const headerData: any = {
      title: '-',
    }
    const firsLoading = this.props.loading && this.skip < 1

    if (!headerError && brand.name) {
      headerData.title = brand.name
    }
    if (!headerError && brand.image_url) {
      headerData.image = brand.image_url
    }
    return (
      <>
        <NavbarTop
          leftContent={['back']}
          title={!headerLoading ? headerData.title : ''}
          subtitle={
            (!headerLoading && !loading) || this.skip > 0
              ? `${headerError ? 0 : pagination.total} Items`
              : 'loading....'
          }
        />
        {this.state.finishAnimation && !headerLoading ? (
          <ProdcutListOrg
            headerContent={headerData}
            products={firsLoading ? [] : products}
            loading={loading}
            headerError={headerError}
            firsLoading={firsLoading}
            freshfetch={this._freshfetch}
            fetchMore={this._fetchMore}
          />
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
      getBrand,
      setFilter,
      addFilterData,
      changeSelectedBrand,
      clearFilter,
      changeSelectedCategory,
      clearActivePage,
      setActivePage,
      setSelectedCollection,
    },
    dispatch,
  )

const mapStateToProps = () => {
  const deepClone = makecloneAppliedFilter()
  const flatenFilter = makeflatenFilter()
  return (state, { route }) => {
    let appliedFilters = deepClone(state)
    appliedFilters = flatenFilter(appliedFilters)

    const filterProps = {
      sort: state.sort.selected,
      search: state.productFilter.search,
      appliedFilters,
    }
    const brandId =
      route.params.brandId || route.params.brandsId || state.brands.activeBrand

    return {
      brand: state.brands.data[brandId] || { id: brandId },
      headerError: state.brands.error,
      loading: state.products.productsLoading,
      headerLoading: state.brands.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProductList)
