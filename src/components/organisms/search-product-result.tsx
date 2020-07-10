import React, { Component } from 'react'
import {
  Dimensions,
  ViewStyle,
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import ProductCard from '@components/molecules/product-card-new'
import SearchResultCard from '../molecules/search-result-card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import SearchProductResultPart1 from './search-product-result-segment-1'
import SearchProductResultPart2 from './search-product-result-segment-2'
import isEqual from 'lodash/isEqual'
import { connect, batch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updateSelected,
  setInitialFilter,
  applyFilter,
  changeSelectedCategory,
  clearFilter,
  setInitialCategory,
} from '@modules/global-search-product-filter/action'

import EmptyState from '@components/molecules/order-empty-state'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchProductType {
  style?: any
  skip?: number
  isActive?: boolean
  loading?: boolean
  changeSelectedCategory?: (id: number) => void
  setInitialCategory?: (id: number) => void
  clearFilter?: () => void
  applyFilter?: () => void
  searchKey?: string
  fetchMore?: () => void
}

class SearchProductResult extends Component<SearchProductType, any> {
  state = {
    isConfirmed: false,
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchKey !== this.props.searchKey && this.props.isActive) {
      this.setState({ isConfirmed: false })
      this.props.clearFilter()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this

    if (!isEqual(state, nextState)) {
      return true
    }
    if (
      nextProps.isActive !== props.isActive ||
      props.searchKey !== nextProps.searchKey ||
      props.loading !== nextProps.loading
    ) {
      return true
    }

    return false
  }

  setfilter = data => {
    if (data) {
      batch(() => {
        this.props.setInitialCategory(data.id)
        this.props.changeSelectedCategory(data.id)
        this.props.applyFilter()
      })
    }
    this.setState({
      isConfirmed: true,
    })
  }

  emptyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title =
      searchKey.length > 2 ? 'No Result Found' : 'Find product you love'
    const desc =
      searchKey.length > 2
        ? ''
        : 'You can type brand, product tittle to find something that you will love'
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
        img={require('@src/assets/placeholder/searching-for-the-search-result.png')}
      />
    )
  }

  renderComponent = () => {
    const { isConfirmed } = this.state
    const { searchKey } = this.props

    return !isConfirmed ? (
      <SearchProductResultPart1
        searchKey={searchKey}
        setfilter={this.setfilter}
      />
    ) : (
      <SearchProductResultPart2 searchKey={searchKey} />
    )
  }
  render() {
    const { searchKey, style, isActive } = this.props

    return (
      <View style={{ ...styles.container, ...style }}>
        {this.state.finishAnimation
          ? searchKey === '' && isActive
            ? this.emptyComponent()
            : this.renderComponent()
          : null}
        {}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  searchKey: state.globalSearchUi.searchKey,
  isActive: state.globalSearchUi.activeTab === 0,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSelected,
      clearFilter,
      setInitialFilter,
      changeSelectedCategory,
      applyFilter,
      setInitialCategory,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductResult)
