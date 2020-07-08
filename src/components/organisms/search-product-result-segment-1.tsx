import React, { Component, useMemo, useCallback } from 'react'
import { Dimensions, ViewStyle, View, Text, StyleSheet } from 'react-native'
import SearchResultCard from '../molecules/search-result-card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { dispatch } from '@src/root-navigation'
import { fontStyle } from '../commont-styles'
import { makeMapCategories } from '@modules/search-product/selector'
import ProductSearchLoader from '@components/atoms/loaders/product-search'
import EmptyState from '@components/molecules/order-empty-state'
import { productSearchListData } from '@hocs/data/product'
import { StackActions } from '@react-navigation/native'
import ProductSearchCard from '@components/molecules/product-search-card'

import List from '@components/layouts/list-header'

const ProductListHoc = productSearchListData(ProductSearchCard)

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  searchResulText: {
    ...fontStyle.helvetica,
    color: colors.black80,
    fontSize: 14,
  },
  searchResulTextBold: {
    ...fontStyle.helveticaBold,
    color: colors.black80,
    fontSize: 14,
  },
  searchResulContainer: {
    borderBottomColor: colors.black50,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  searchResulLeftContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
  },
})

interface SearchProductType {
  style?: any
  skip?: number
  searchKey?: string
}

const dummy = {
  title: 'Search in Categories',
  data: [
    {
      icon: 'search',
      title: 'Skirts',
    },
    {
      icon: 'search',
      title: 'Mini Skirts',
    },
  ],
}

const onPress = productId => () => {
  dispatch(
    StackActions.replace('ProductDetail', {
      productId,
    }),
  )
}

const renderitem = ({ item, index }) => {
  return (
    <ProductListHoc
      horizontal
      productId={item}
      onPress={onPress(item)}
      style={{
        margin: 8,
        marginHorizontal: 16,
        flex: 1,
      }}
      key={'search-product-list' + index + item}
    />
  )
}

const SearchProductResultPart1 = ({
  searchKey,
  categories,
  style,
  products,
  setfilter,
  context,
  loading,
}) => {
  const selectCategory = (category?: any) => () => {
    setfilter(category)
  }

  const renderHeader = useMemo(() => {
    return categories.length > 0 ? (
      <>
        <View style={{ paddingHorizontal: 16 }}>
          <SearchResultCard
            leftContent={
              <Text style={styles.searchResulText}>
                {`Show Results for `}
                <Text style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
              </Text>
            }
            rightContent={
              <Icon
                style={{ marginRight: 8 }}
                name="search"
                color={colors.black70}
              />
            }
            style={styles.searchResulContainer}
            onPress={selectCategory()}
          />
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 24, ...styles.searchResulContainer }}>
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.searchResulTextBold}>{dummy.title}</Text>
            </View>
            {categories?.map((val, key) => (
              <View
                key={`${dummy.title}-${key}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <SearchResultCard
                  style={styles.searchResulLeftContainer}
                  onPress={selectCategory(val)}
                  leftContent={
                    <Icon
                      style={{ marginRight: 8 }}
                      name="search"
                      size={10}
                      color={colors.black70}
                    />
                  }
                  rightContent={
                    <Text style={styles.searchResulText}>{val?.name}</Text>
                  }
                />
              </View>
            ))}
          </View>
          {products.length > 0 && (
            <Text style={[styles.searchResulTextBold]}>Found Products</Text>
          )}
        </View>
      </>
    ) : null
  }, [categories.length, searchKey, products.length, loading])

  const emptyComponent = useMemo(() => {
    if (loading) return <ProductSearchLoader style={{ marginHorizontal: 16 }} />

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
        img={require('@src/assets/placeholder/searching-for-the-search-result.png')}
      />
    )
  }, [searchKey, loading, categories])

  return (
    <View style={{ ...styles.container, ...style }}>
      <List
        data={products}
        ListHeaderComponent={renderHeader}
        onEndReachedThreshold={0.9}
        layoutType="list"
        ListEmptyComponent={emptyComponent}
        renderItem={renderitem}
        keyExtractor={(item, index) =>
          'search-product-list' + index + ':' + item
        }
      />
    </View>
  )
}
const mapCategories = makeMapCategories()

const mapStateToProps = state => {
  return {
    categories: mapCategories(state),
    products: state.searchProduct.productOrder,
    context: state.searchProduct.context,
    loading: state.searchProduct.loading,
  }
}

export default connect(mapStateToProps, null)(SearchProductResultPart1)
