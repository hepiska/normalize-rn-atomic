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
  loading?: boolean
  searchKey?: string
  fetchMore?: () => void
  total?: number
  product?: any
}

class SearchProductResult extends Component<SearchProductType, any> {
  state = {
    isConfirmed: false,
    selectedCategory: [],
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  setfilter = data => {
    if (data) {
      const newSelectedCategory = [...this.state.selectedCategory, data]
      this.setState({
        isConfirmed: true,
        selectedCategory: newSelectedCategory,
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
    const { isConfirmed, selectedCategory } = this.state
    const { searchKey } = this.props

    return !isConfirmed ? (
      <SearchProductResultPart1
        searchKey={searchKey}
        setfilter={this.setfilter}
      />
    ) : (
      <SearchProductResultPart2
        searchKey={searchKey}
        selectedCategory={selectedCategory}
      />
    )
  }
  render() {
    const { searchKey, style } = this.props
    return (
      <View style={{ ...styles.container, ...style }}>
        {this.state.finishAnimation
          ? searchKey !== ''
            ? this.renderComponent()
            : this.emptyComponent()
          : null}
        {}
      </View>
    )
  }
}

export default SearchProductResult
