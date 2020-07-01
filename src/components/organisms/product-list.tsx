import React, { useState, Component } from 'react'
import {
  Text,
  StyleSheet,
  // ScrollView,
  View,
  FlatList,
  Image,
  ViewStyle,
  RefreshControl,
  TouchableWithoutFeedback,
  InteractionManager,
  Dimensions,
} from 'react-native'
import Animated, { call } from 'react-native-reanimated'
import FilterTriger from '@components/organisms/product-filter-buttons'
import ProductCard from '@components/molecules/product-card-new'
import TwoCollumnCardLoaderSmall from '@components/atoms/loaders/two-column-card-small'
import ProductHeader from '@components/atoms/loaders/product-list-header'
import ErrorOrg from '@src/components/organisms/four-o-four'
import { productListData } from '@hocs/data/product'
import { setImage } from '@utils/helpers'
import ProductCardLoader from '@components/atoms/loaders/product-card'
import { images as defaultImages, colors } from '@utils/constants'
import { OutlineButton } from '@components/atoms/button'
import ProductEmpty from '@components/organisms/product-empty'

import { fontStyle, borderStyle } from '@src/components/commont-styles'

const defaultContentHeight = 136
const tabBarheight = 48
const { width } = Dimensions.get('window')

const { interpolate, Extrapolate, Value } = Animated
const imageHeight = 103

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: 300,
    // paddingTop: 36,
    width: '100%',
    position: 'absolute',
    padding: 16,
  },
  brandTitle: {
    color: 'white',
    fontSize: 24,
    ...fontStyle.playfairBold,
  },
  image: {
    borderRadius: 100,
  },
  headerImageContainer: {
    overflow: 'hidden',
    height: imageHeight,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
  },
  columnWrapper: { paddingHorizontal: 4, backgroundColor: 'white' },
})

const ProductWithCardHoc = productListData(ProductCard)

class ProductList extends Component<any, any> {
  y = new Animated.Value(0)

  renderheader() {
    const { headerContent, headerLoading } = this.props
    const contentHeight = headerContent.image ? defaultContentHeight : 0
    const headerY = interpolate(this.y, {
      inputRange: [0, defaultContentHeight],
      outputRange: [0, -defaultContentHeight],
      extrapolate: Extrapolate.CLAMP,
    })
    if (!headerContent.image) {
      return null
    }
    return (
      <Animated.View
        style={[
          styles.header,
          { height: contentHeight },
          { transform: [{ translateY: headerY }] },
        ]}>
        {headerLoading ? (
          <ProductHeader />
        ) : (
          <View style={styles.headerImageContainer}>
            {headerContent.image && (
              <Image
                style={StyleSheet.absoluteFillObject}
                source={{
                  uri: setImage(headerContent.image, {
                    width,
                    height: imageHeight,
                  }),
                }}
              />
            )}
            <Text style={styles.brandTitle}>{headerContent.title}</Text>
          </View>
        )}
      </Animated.View>
    )
  }

  renderFilterAction = () => (
    <>
      <FilterTriger style={{ paddingHorizontal: 16 }} />
    </>
  )

  renderItem = ({ item, index }) => {
    return (
      <ProductWithCardHoc
        productId={item}
        key={'prod-list' + item + index}
        style={{
          maxWidth: width / 2 - 16,
          minHeight: 220,
          margin: 8,
          flex: 1,
        }}
      />
    )
  }
  _keyExtractor = (item, index) => 'product-list' + item + index

  renderFooter = () => {
    const { loading, products } = this.props
    if (!loading && products.length < 4) {
      return null
    }
    return (
      <View style={{ height: 400 }}>
        {loading && <ProductCardLoader style={{ margin: 16 }} />}
      </View>
    )
  }

  emptyComponent = () => {
    const { loading } = this.props
    if (loading) {
      return null
    }
    return (
      <>
        <ProductEmpty
          title="No Results Found"
          subtitle="We're sorry! We can't find any products available"
        />
      </>
    )
  }

  render() {
    const {
      headerContent,
      products,
      loading,
      headerError,
      freshFetch,
      fetchMore,
    } = this.props
    const contentHeight = headerContent.image ? defaultContentHeight : 0
    return (
      <View style={{ flex: 1 }}>
        {this.renderheader()}

        {!headerError ? (
          <FlatList
            ListHeaderComponent={this.renderFilterAction}
            stickyHeaderIndices={[0]}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            columnWrapperStyle={styles.columnWrapper}
            scrollEventThrottle={16}
            data={products}
            onEndReached={fetchMore}
            onRefresh={freshFetch}
            refreshing={loading}
            ListEmptyComponent={this.emptyComponent}
            ListFooterComponent={this.renderFooter}
            renderItem={this.renderItem}
            contentContainerStyle={{
              paddingTop: contentHeight,
              // backgroundColor: 'white',
            }}
          />
        ) : (
          <ErrorOrg />
        )}
      </View>
    )
  }
}

export default ProductList
