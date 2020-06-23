import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { brandListData } from '@hocs/data/brand'
import BrandHorizontalCard from '@components/molecules/brand-horizontal-card'
import List from '@components/layouts/list-header'
import EmtyState from '@components/molecules/order-empty-state'
import FollowitemLoader from '@components/atoms/loaders/follow-item'

const BrandHoc = brandListData(BrandHorizontalCard)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchBrandType {
  style?: any
  fetchMore?: () => void
  searchKey?: string
  loading?: boolean
  total?: number
  brand?: any
  skip?: number
}

class SearchBrandResult extends Component<SearchBrandType, any> {
  renderHeader = () => {
    const { searchKey, total } = this.props

    if (!searchKey) return null

    return (
      <View>
        <SearchResultCard
          leftContent={
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black80,
              }}>
              {`Results for `}
              <Text style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
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
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        />
      </View>
    )
  }

  onReachedEnd = () => {
    const { loading, fetchMore } = this.props
    if (!loading) {
      fetchMore()
    }
  }

  renderItem = ({ item, index }) => {
    return <BrandHoc brandId={item} key={`search-brand-${index}`} idx={index} />
  }

  _renderFooterLoader = () => {
    const { loading } = this.props

    return (
      <View
        style={{ height: 100, width: '100%', backgroundColor: 'transparent' }}>
        {loading && <FollowitemLoader style={{ margin: 16 }} />}
      </View>
    )
  }

  emtyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title = searchKey.length > 2 ? 'No Brand' : 'Please Fill keyword'
    const desc =
      searchKey.length > 2
        ? 'You Dont Have Brand for this Keyword'
        : 'Please Fill keyword'
    return <EmtyState title={title} description={desc} />
  }

  render() {
    const { style, brand, searchKey, skip, loading } = this.props
    if (!brand) {
      return null
    }

    const data = searchKey.length > 2 ? brand : []
    return (
      <View style={{ ...styles.container, ...style }}>
        <List
          data={data}
          ListHeaderComponent={this.renderHeader}
          onEndReachedThreshold={0.9}
          onReachedEnd={this.onReachedEnd}
          ListEmptyComponent={this.emtyComponent}
          ListFooterComponent={this._renderFooterLoader}
          renderItem={this.renderItem}
          style={{ paddingHorizontal: 16 }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  // brand: state.brands.order,
  loading: state.searchBrand.loading,
  total: state.searchBrand.total || state.searchBrand.order.length || 0,
  brand: state.searchBrand.order,
})
export default connect(mapStateToProps, null)(SearchBrandResult)
