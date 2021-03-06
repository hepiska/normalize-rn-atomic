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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div } from '@components/atoms/basic'
import { productSearchApi, clearProductSearch } from '@modules/product/action'
import Field from '@components/atoms/field'
import Icon from 'react-native-vector-icons/FontAwesome'
import { globalDimention, colors } from '@utils/constants'
import NavbarTop from '@components/molecules/navbar-top'
import SearchEmptyState from '@components/molecules/search-empty-state'
import { productListData } from '@hocs/data/product'
// import ProductCard from '@components/molecules/product-card'
import ProductCard from '@components/molecules/product-card-new'
import SearchListLoader from '@src/components/atoms/loaders/search-list'
import TwoCollumnCardLoaderSmall from '@components/atoms/loaders/two-column-card-small'

const { width } = Dimensions.get('screen')

const ProductWithCardHoc = productListData(ProductCard)

class SearchList extends Component<any, any> {
  state = {
    searchKey: '',
    finishAnimation: false,
  }
  limit = 25
  skip = 0
  lastSkip = 0
  startSearch = false
  timer = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  componentWillUnmount() {
    if (this.props.dataSearch) {
      this.props.clearProductSearch()
    }
  }

  _freshFetch = async () => {
    try {
      this._fetchData(0)
      this.skip = 0
      this.lastSkip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchData = skip => {
    const params = {
      limit: this.limit,
      offset: this.limit * skip,
      is_commerce: true,
      name: this.state.searchKey,
    }
    this.props.productSearchApi(params)
  }

  onSearchChange = text => {
    this.setState({ searchKey: text })

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (this.state.searchKey.length > 2) {
        this.skip = 0
        this._fetchData(this.skip)

        this.startSearch = true
      }
    }, 800)
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
      if (this.props.pagination?.total > this.props.dataSearch.length) {
        this._fetchData(this.skip)
      }
    }
  }

  _renderSearch = () => {
    const { searchKey } = this.state
    return (
      <View style={{ backgroundColor: colors.white }}>
        <Field
          style={{ margin: 12 }}
          value={searchKey}
          placeholder="Search in Shonet"
          onChangeText={this.onSearchChange}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="search"
              color={colors.black90}
            />
          }
        />
      </View>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        key={'' + item}
        style={{
          margin: 8,
          flex: 1,
          maxWidth: width / 2 - 16,
        }}
      />
    )
  }

  _keyExtractor = (item, index) => '' + item + index

  _emptyComponent = () => {
    if (!this.startSearch) {
      return (
        <View>
          <SearchEmptyState
            img={require('../../assets/placeholder/searching-for-the-search-result.png')}
            title="Find Something here"
            description="Let???s find out product you love at shop page"
          />
        </View>
      )
    } else {
      return (
        <View>
          <SearchEmptyState
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
    const { dataSearch, loading } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop leftContent={['back']} title="Search" />
        {finishAnimation ? (
          <View style={{ flex: 1 }}>
            <FlatList
              numColumns={2}
              refreshing={loading}
              onRefresh={this._freshFetch}
              keyExtractor={this._keyExtractor}
              ListHeaderComponent={this._renderSearch()}
              data={dataSearch}
              renderItem={this._renderItem}
              onEndReached={this._fetchMore}
              onEndReachedThreshold={0.99}
              ListEmptyComponent={this._emptyComponent}
              ListFooterComponent={this._renderFooter}
              scrollIndicatorInsets={{ right: 1 }}
              stickyHeaderIndices={[0]}
            />
          </View>
        ) : (
          <SearchListLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      productSearchApi,
      clearProductSearch,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    dataSearch: state.products.search,
    loading: state.products.productsLoading,
    pagination: { total: state.products.pagination.total || 0 },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
