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
import Amplitude from 'amplitude-js'
import { getCategory } from '@modules/category/action'
import ProductListPageLoader from '@components/atoms/loaders/product-list'

import NavbarTop from '@components/molecules/navbar-top'
import { bindActionCreators } from 'redux'
import { connect, batch } from 'react-redux'

import isEqual from 'lodash/isEqual'

import {
  makeflatenFilter,
  makecloneAppliedFilter,
} from '@modules/product-filter/selector'

class CategoryProductList extends Component<any, any> {
  skip = 0
  lastskip = 0
  limit = 20

  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    const { route, category, getCategory } = this.props

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      Amplitude.getInstance().logEvent('product-list', {
        type: 'category',
        category: route.params.categoriesSlug || category.id,
      })
      return getCategory(route.params.categoriesSlug || category.id)
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.category &&
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
  shouldComponentUpdate(nextProps) {
    const { props } = this

    if (!isEqual(props.category, nextProps.category)) {
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

  _setInitialState() {
    const {
      setFilter,
      category,
      setBrandFilter,

      setActivePage,
    } = this.props

    batch(() => {
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
    })

    this._freshfetch()
  }

  _fetchData = skip => {
    const { appliedFilters, search, sort, category } = this.props
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

    if (!appliedFilters.category_ids && category) {
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

  render() {
    const {
      headerLoading,
      pagination,
      loading,
      headerError,
      products,
      category,
    } = this.props

    const headerData: any = {
      title: '-',
    }

    if (category.name) {
      headerData.title = category.name
    }
    const firsLoading = this.props.loading && this.skip < 1

    return (
      <>
        <NavbarTop
          leftContent={['back']}
          title={headerData.title || ''}
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
      setFilter,
      addFilterData,
      changeSelectedBrand,
      clearFilter,
      changeSelectedCategory,
      clearActivePage,
      setActivePage,
      setSelectedCollection,
      getCategory,
    },
    dispatch,
  )

const mapStateToProps = () => {
  const deepClone = makecloneAppliedFilter()
  const flatenFilter = makeflatenFilter()
  return (state, { route }) => {
    let appliedFilters = deepClone(state)
    appliedFilters = flatenFilter(appliedFilters)
    const categoriesId =
      route.params.categoriesId ||
      route.params.categoryId ||
      state.categories.activeCategory

    const filterProps = {
      sort: state.sort.selected,
      search: state.productFilter.search,
      appliedFilters,
    }
    return {
      category: state.categories.data[categoriesId] || { id: categoriesId },
      headerError: state.categories.error,
      loading: state.products.productsLoading,
      headerLoading: state.categories.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductList)
