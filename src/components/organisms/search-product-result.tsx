import React, { Component } from 'react'
import { Dimensions, ViewStyle, View, Text, StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import ProductCard from '@components/molecules/product-card-new'
import SearchResultCard from '../molecules/search-result-card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import SearchProductResultPart1 from './search-product-result-segment-1'
import SearchProductResultPart2 from './search-product-result-segment-2'

import EmtyState from '@components/molecules/order-empty-state'

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
}

class SearchProductResult extends Component<SearchProductType, any> {
  state = {
    isConfirmed: false,
    selectedCategory: [],
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

  emtyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title = searchKey.length > 2 ? 'No Brand' : 'Please Fill keyword'
    const desc =
      searchKey.length > 2
        ? 'We Dont find any Product for this Keyword'
        : 'Please Fill keyword'
    return <EmtyState title={title} description={desc} />
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
        {searchKey !== '' ? this.renderComponent() : this.emtyComponent()}
      </View>
    )
  }
}

export default SearchProductResult
