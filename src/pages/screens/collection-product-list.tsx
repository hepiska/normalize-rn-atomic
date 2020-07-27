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
import { getCollectionBySlug, getSales } from '@modules/collection/action'

import ProductListPageLoader from '@components/atoms/loaders/product-list'

import NavbarTop from '@components/molecules/navbar-top'
import { bindActionCreators } from 'redux'
import { connect, batch } from 'react-redux'

import isEqual from 'lodash/isEqual'

import {
  makeflatenFilter,
  makecloneAppliedFilter,
} from '@modules/product-filter/selector'

class CollectionProductList extends Component<any, any> {
  skip = 0
  lastskip = 0
  limit = 20

  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    const { route, getCollectionBySlug, getSales } = this.props

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      if (route.params.collectionsSlug === 'sales') {
        return getSales()
      }
      Amplitude.getInstance().logEvent('product-list', {
        type: 'collection',
        category: route.params.collectionsSlug,
      })
      return getCollectionBySlug(route.params.collectionsSlug)
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.collection &&
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

    if (!isEqual(props.collection, nextProps.collection)) {
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
      collection,
      setFilter,
      setBrandFilter,
      setSelectedCollection,
      setActivePage,
    } = this.props

    batch(() => {
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
    })

    this._freshfetch()
  }

  _fetchData = skip => {
    const { appliedFilters, search, sort, collection } = this.props
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
      if (collection.id === 'sales') {
        params.is_disc = true
      } else {
        params.collection_ids = collection.id
      }
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

  firsLoading = this.props.loading && this.skip < 1

  render() {
    const {
      headerLoading,
      pagination,
      loading,
      headerError,
      products,
      collection,
    } = this.props

    const headerData: any = {
      title: '-',
    }

    if (collection.title) {
      headerData.title = collection.title
    }
    if (collection.landscape_image_url) {
      headerData.image = collection.landscape_image_url
    }

    return (
      <>
        <NavbarTop
          leftContent={['back']}
          title={headerLoading ? '' : headerData.title}
          subtitle={
            (!headerLoading && !loading) || this.skip > 0
              ? `${headerError ? 0 : pagination.total} Items`
              : 'loading....'
          }
        />
        {this.state.finishAnimation && !headerLoading ? (
          <ProdcutListOrg
            headerContent={headerData}
            products={this.firsLoading ? [] : products}
            loading={loading}
            headerError={headerError}
            firsLoading={this.firsLoading}
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
      getCollectionBySlug,
      setFilter,
      addFilterData,
      changeSelectedBrand,
      clearFilter,
      changeSelectedCategory,
      clearActivePage,
      setActivePage,
      setSelectedCollection,
      getSales,
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

    const collectionId =
      route.params.collectionId || state.collection.activeCollection

    return {
      collection: state.collection.data[collectionId] || { id: collectionId },
      headerError: state.collection.error,
      loading: state.products.productsLoading,
      headerLoading: state.collection.loading,
      products: state.products.order,
      pagination: {
        total: state.products.pagination.total || 0,
      },
      ...filterProps,
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionProductList)
