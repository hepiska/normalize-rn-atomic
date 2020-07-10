import React, { Component, useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  FlatList,
  InteractionManager,
} from 'react-native'
import { connect, batch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div } from '@components/atoms/basic'
import { productSearchApi, clearProductSearch } from '@modules/product/action'

import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { makeMapCategories } from '@modules/search-product/selector'
import { navigate } from '@src/root-navigation'
import { dispatch } from '@src/root-navigation'
import { StackActions } from '@react-navigation/native'
import {
  setInitialFilter as globalSetInitialFilter,
  updateSelected as globalUpdateSelected,
  changeSelectedCategory as globalChangeSelectedCategory,
  changeContext as globalChangeContext,
  applyFilter,
} from '@modules/global-search-product-filter/action'
import { contextMaping } from '@utils/constants'

import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { OutlineButton } from '@components/atoms/button'
import isEqual from 'lodash/isEqual'
import EmptyState from '@components/molecules/order-empty-state'
import SearchResultCard from '../molecules/search-result-card'
import SelectAblePill from '@components/organisms/selectable-pill'
import { request } from '@utils/services'
import ProductCard from '@components/molecules/product-card-new'
import SearchListLoader from '@src/components/atoms/loaders/search-list'
import TwoCollumnCardLoaderSmall from '@components/atoms/loaders/two-column-card-small'
import { productSearchListData } from '@hocs/data/product'
import { findProductSearch } from '@modules/search-product/action'
import { makeMapAppliedFilters } from '@modules/global-search-product-filter/selector'

const getcontex = async params => {
  const newParams = { ...params }
  return request({ url: '/products/search', params: newParams }).then(res => {
    return res.data.meta.context
  })
}

const { width } = Dimensions.get('screen')

const ProductWithCardHoc = productSearchListData(ProductCard)

class SearchList extends Component<any, any> {
  state = {
    finishAnimation: false,
    selectedCategory: [],
  }
  limit = 20
  skip = 0
  lastSkip = 0
  startSearch = false
  timer = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshFetch()
    })
  }

  componentWillUnmount() {
    if (this.props.dataSearch) {
      this.props.clearProductSearch()
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.sort, prevProps.sort)) {
      this._freshFetch()
      return ''
    }
    if (this.props.activeTab !== prevProps.activeTab) {
      getcontex({ query: this.props.searchKey }).then(async ctx => {
        const context = ctx.reduce((acc, _ctx) => {
          const newAcc = { ...acc }
          if (newAcc[contextMaping[_ctx.type]]) {
            newAcc[contextMaping[_ctx.type]] += `,${_ctx.id}`
          } else {
            newAcc[contextMaping[_ctx.type]] = '' + _ctx.id
          }
          return newAcc
        }, {})

        await batch(() => {
          this.props.globalSetInitialFilter(context)
          this.props.globalUpdateSelected(context)
        })
        this.props.applyFilter()

        // this._freshFetch(ctx)
      })
    }

    if (!isEqual(prevProps.appliedFilter, this.props.appliedFilter)) {
      this._freshFetch()
    }
  }

  _openSort = () => {
    navigate('modals', { screen: 'ProductSort' })
  }

  _openFiler = () => {
    navigate('modals', { screen: 'GlobalSearchProductFilter' })
  }

  _freshFetch = async (ctx?: any) => {
    try {
      this._fetchData(0, ctx)
      this.skip = 0
      this.lastSkip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchData = (skip, localCtx?: any) => {
    const { searchKey, appliedFilter } = this.props
    const {} = this.state

    const params: any = {
      limit: this.limit,
      offset: this.limit * skip,
      query: searchKey,
      ...this.props.sort.value,
      ...appliedFilter,
      is_commerce: true,
    }
    this.props.findProductSearch(params)
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
      this._fetchData(this.skip)
    }
  }

  handleSelectedContext = context => {
    this.props.globalChangeContext(context)
  }

  _renderSearch = () => {
    const { searchKey, total, context } = this.props

    if (!searchKey) return null

    const mappedContex = context.map(ctx => ({
      ...ctx,
      title: ctx.value,
      isSelected: !ctx.suggestion,
    }))

    return (
      <>
        <SearchResultCard
          leftContent={
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black80,
              }}>
              {`Results for `}
              <Text style={fontStyle.helveticaBold}>{`"${searchKey}"`}</Text>
            </Text>
          }
          rightContent={
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black70,
              }}>
              {`${total} items`}
            </Text>
          }
          style={{
            backgroundColor: colors.black50,
            marginHorizontal: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 8,
            marginVertical: 16,
          }}>
          <OutlineButton
            title={`Filters (${0})`}
            style={{ borderColor: colors.black50 }}
            onPress={this._openFiler}
            leftIcon={
              <Icon5
                // style={{ marginRight: 8 }}
                name="filter"
                color={colors.black100}
              />
            }
          />
          <OutlineButton
            title="Sort"
            style={{ borderColor: colors.black50 }}
            onPress={this._openSort}
            leftIcon={
              <Icon5
                // style={{ marginRight: 8 }}
                name="sort-amount-down"
                color={colors.black100}
              />
            }
          />
        </View>
        <SelectAblePill
          data={mappedContex}
          style={{ marginHorizontal: 8, marginBottom: 12 }}
          onPress={this.handleSelectedContext}
        />
      </>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        onPress={this._onPress(item)}
        key={'' + item}
        style={{
          margin: 8,
          flex: 1,
          maxWidth: width / 2 - 16,
        }}
      />
    )
  }

  _onPress = productId => () => {
    dispatch(
      StackActions.replace('ProductDetail', {
        productId,
      }),
    )
  }

  _keyExtractor = (item, index) => '' + item + index

  _emptyComponent = () => {
    if (!this.startSearch) {
      return (
        <View>
          <EmptyState
            img={require('../../assets/placeholder/searching-for-the-search-result.png')}
            title={
              <Text
                style={{
                  ...fontStyle.playfairBold,
                  fontSize: 24,
                  color: colors.black100,
                  fontWeight: '700',
                }}>
                Find product you love
              </Text>
            }
            description="You can type brand, product tittle to find something that you will love"
          />
        </View>
      )
    } else {
      return (
        <View>
          <EmptyState
            img={require('../../assets/placeholder/theshonet-not-found.png')}
            title="No result found..."
          />
        </View>
      )
    }
    return null
  }

  _renderFooter = () => {
    const { loading } = this.props

    return (
      <View style={{ height: 200 }}>
        {loading && this.skip !== 0 && (
          <TwoCollumnCardLoaderSmall style={{ margin: 16 }} />
        )}
      </View>
    )
  }

  render() {
    const { products, loading, context } = this.props
    const { finishAnimation } = this.state
    const firstLoading = loading && this.skip < 1

    return (
      <>
        {!finishAnimation || firstLoading ? (
          <SearchListLoader style={{ margin: 16 }} />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              numColumns={2}
              refreshing={loading}
              onRefresh={this._freshFetch}
              keyExtractor={this._keyExtractor}
              ListHeaderComponent={this._renderSearch()}
              // style={{ marginHorizontal: 8 }}
              contentContainerStyle={{ marginHorizontal: 8 }}
              data={products}
              renderItem={this._renderItem}
              onEndReached={this._fetchMore}
              onEndReachedThreshold={0.99}
              ListEmptyComponent={this._emptyComponent}
              ListFooterComponent={this._renderFooter}
              scrollIndicatorInsets={{ right: 1 }}
              // stickyHeaderIndices={[0]}
            />
          </View>
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findProductSearch,
      applyFilter,
      globalUpdateSelected,
      globalSetInitialFilter,
      globalChangeSelectedCategory,
      globalChangeContext,
      // clearProductSearch,
    },
    dispatch,
  )
const mapStateToProps = () => {
  const mapCategories = makeMapCategories()
  const mapAppliedFilters = makeMapAppliedFilters()

  return state => {
    return {
      searchKey: state.globalSearchUi.searchKey,
      activeTab: state.globalSearchUi.activeTab,
      products: state.searchProduct.productFindOrder,
      sort: state.sort.selected,
      categories: mapCategories(state),
      appliedFilter: mapAppliedFilters(state),
      context: state.searchProduct.context,
      total: state.searchProduct.findPagination?.total || 0,
      loading: state.searchProduct.findLoading,
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
