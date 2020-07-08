import React, { Component } from 'react'
import { View, Text, StyleSheet, InteractionManager } from 'react-native'
import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { searchBrandListData } from '@hocs/data/brand'
import BrandHorizontalCard from '@components/molecules/brand-horizontal-card'
import List from '@components/layouts/list-header'
import EmptyState from '@components/molecules/order-empty-state'
import { dispatch } from '@src/root-navigation'
import { StackActions } from '@react-navigation/native'
import BrandListLoader from '@components/atoms/loaders/brand-list'
import { setSkip } from '@src/modules/global-search-ui/action'
import { bindActionCreators } from 'redux'

const BrandHoc = searchBrandListData(BrandHorizontalCard)
const brandCardHeight = 73

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
  activeTab?: number
  setSkip: (skip: any) => void
  brand?: any
  skip?: object
}

class SearchBrandResult extends Component<SearchBrandType, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.total !== nextProps.total ||
      this.props.activeTab !== nextProps.activeTab ||
      this.props.loading !== nextProps.loading ||
      this.props.searchKey !== nextProps.searchKey ||
      this.props.brand.length !== nextProps.brand.length ||
      this.state.finishAnimation !== nextState.finishAnimation
    ) {
      return true
    }
    return false
  }
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
    const { loading, skip, activeTab } = this.props
    const newSkip = { ...skip }
    if (!loading) {
      newSkip[activeTab] += 1

      this.props.setSkip(newSkip)
    }
  }

  _handlePress = brandId => () => {
    dispatch(StackActions.replace('BrandProductList', { brandId }))
  }

  renderItem = ({ item, index }) => {
    return (
      <BrandHoc
        brandId={item}
        key={`search-brand-${index}`}
        onPress={this._handlePress(item)}
        idx={index}
      />
    )
  }

  _renderFooterLoader = () => {
    const { loading } = this.props

    return (
      <View
        style={{ height: 200, width: '100%', backgroundColor: 'transparent' }}>
        {loading && <BrandListLoader style={{ marginTop: 16 }} />}
      </View>
    )
  }

  emptyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title =
      searchKey.length > 2 ? 'No Result Found' : 'Please Fill keyword'
    const desc = searchKey.length > 2 ? '' : 'Please Fill keyword'
    return (
      <EmptyState
        title={
          <Text
            style={{
              ...fontStyle.playfairBold,
              fontSize: 24,
              color: colors.black100,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        }
        description={desc}
        img={require('@src/assets/placeholder/theshonet-no-followers.png')}
      />
    )
  }

  _keyExtractor = (item, key) => {
    return 'search-user-item' + item + key
  }

  render() {
    const { style, brand, searchKey, skip, loading } = this.props
    if (!brand) {
      return null
    }

    const data = searchKey.length > 2 ? brand : []
    return (
      <View style={{ ...styles.container, ...style }}>
        {this.state.finishAnimation ? (
          <List
            data={data}
            ListHeaderComponent={this.renderHeader}
            onEndReachedThreshold={0.9}
            onReachedEnd={this.onReachedEnd}
            ListEmptyComponent={this.emptyComponent}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => ({
              length: brandCardHeight,
              offset: brandCardHeight * index,
              index,
            })}
            ListFooterComponent={this._renderFooterLoader}
            renderItem={this.renderItem}
            style={{ paddingHorizontal: 16 }}
          />
        ) : (
          <BrandListLoader style={{ margin: 16 }} />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  // brand: state.brands.order,
  searchKey: state.globalSearchUi.searchKey,
  skip: state.globalSearchUi.skip,
  loading: state.searchBrand.loading,
  total: state.searchBrand.total || state.searchBrand.order.length || 0,
  brand: state.searchBrand.order,
})

const mapDispatchToProps = dispatch => bindActionCreators({ setSkip }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBrandResult)
