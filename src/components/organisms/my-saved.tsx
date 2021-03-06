import React from 'react'
import { View, Text, Dimensions, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
// import { capilEachWord } from '@utils/helpers'
import SearchFilter from '@components/organisms/search-filter'
import { getUserPosts } from '@modules/user-post/action'
import { getPostLiked } from '@modules/post-liked/action'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import { getProductSaved } from '@modules/product-saved/action'
import PostListItem from '@src/components/molecules/post-card'
// import ProductCard from '@src/components/molecules/product-card'
import ProductCard from '@src/components/molecules/product-card-new'

import { postListData } from '@hocs/data/post'
import { productListData } from '@hocs/data/product'
import TwoColumnListLoader from '../atoms/loaders/two-column-card'
import PostLoader from '@components/atoms/loaders/post-card'

import EmtyState from '@components/molecules/order-empty-state'

const PostItem = postListData(PostListItem)
const ProductItem = productListData(ProductCard)

const { width, height } = Dimensions.get('screen')

class MySavedProduct extends React.Component<any, any> {
  state = {
    selectedFilter: ['posts'],
  }
  filterOptions = [
    { value: 'posts', name: 'Posts' },
    { name: 'Product', value: 'products' },
    { name: 'Photos', value: 'photo' },
    { name: 'Jurnals', value: 'jurnal' },
    { name: 'Articles', value: 'article' },
    { name: 'Collections', value: 'collection' },
  ]

  limit = 10
  skip = 0
  lastskip = 0
  listRef = null

  componentDidMount() {
    this._freshfetch()
  }

  _openCartModal = productId => () => {
    const { navigation } = this.props
    navigation.navigate('modals', {
      screen: 'CartModal',
      params: { product: productId },
    })
  }
  // _openCartModal = item => () => {
  //   console.log('=====', item)
  // }

  _fetchData = skip => {
    const { selectedFilter } = this.state
    const selected = selectedFilter[0]

    if (selected === 'products') {
      this.props.getProductSaved({
        limit: this.limit,
        offset: this.limit * skip,
        sort_by: 'date',
        sort_direction: 'desc',
      })
    } else {
      const params: any = {
        limit: this.limit,
        offset: this.limit * skip,
        sort_by: 'date',
        sort_direction: 'desc',
      }
      if (selected !== 'posts') {
        params.type = selected
      }

      this.props.getPostLiked(params)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.transactionLoading) {
        return
      }
      this._fetchData(this.skip)
    }
  }

  _getLayout = () => {
    const { selectedFilter } = this.state
    const selected = selectedFilter[0]

    if (selected === 'products') return 'normal'
    return 'mansory'
  }

  _selectFilter = item => {
    let selectedFilter = [...this.state.selectedFilter]
    if (item.value === 'all') {
      selectedFilter = this.props.userPostStatus
    } else {
      selectedFilter = [item.value]
    }
    this.setState({ selectedFilter }, () => {
      this._freshfetch()
    })
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
  }

  _emptyState = () => (
    <EmtyState title={`Empty`} description="Look like empty down here" />
  )
  _header = () => {
    const { selectedFilter } = this.state

    return (
      <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
        <SearchFilter
          key="my-saved-filter"
          style={{ marginVertical: 8 }}
          itemStyle={{ paddingVertical: 8, paddingHorizontal: 12 }}
          selectedFilter={selectedFilter}
          onfilterSelected={this._selectFilter}
          filterItems={this.filterOptions}
        />
      </View>
    )
  }

  _renderItem = ({ item, index }) => {
    const { selectedFilter } = this.state
    const selected = selectedFilter[0]

    if (selected === 'products') {
      return (
        <ProductItem
          style={
            index % 2 === 0
              ? {
                  flex: 1,
                  marginRight: 8,
                  marginVertical: 8,
                  // width: width / 2 - 16,
                }
              : {
                  flex: 1,
                  marginLeft: 8,
                  marginVertical: 8,
                  // width: width / 2 - 16,
                }
          }
          onAddtoCart={this._openCartModal(item)}
          productId={item}
          key={'producty ' + item + index}
        />
      )
    } else {
      return (
        <PostItem
          style={{ width: '100%', marginVertical: 8 }}
          key={`horizontal-list-post-${index}`}
          postId={item}
          idx={index}
        />
      )
    }
  }

  _getData = () => {
    const { selectedFilter } = this.state
    const selected = selectedFilter[0]
    if (selected === 'products') {
      return this.props.products || []
    } else {
      return this.props.posts || []
    }
    return []
  }
  _hanleScroll = e => {
    if (e.nativeEvent.contentOffset.y < 2) {
      this.props.disableScroll && this.props.disableScroll()
    }
  }

  _renderFooter = () => {
    const { selectedFilter } = this.state
    const selected = selectedFilter[0]

    if (selected === 'products') {
      return <TwoColumnListLoader />
    }
    return <PostLoader />
  }

  render() {
    const {
      scrollEnabled,
      loading,
      style,
      contentHeight,
      y,
      getListRef,
      ...props
    } = this.props
    const { selectedFilter } = this.state
    const data = this._getData()
    const headerPoss = interpolate(y, {
      inputRange: [0, contentHeight],
      outputRange: [contentHeight, 0],
      extrapolate: Extrapolate.CLAMP,
    })
    return (
      <View style={{ width, flex: 1, ...style }}>
        <Animated.View style={{ transform: [{ translateY: headerPoss }] }}>
          {this._header()}
        </Animated.View>
        <List
          data={data}
          y={y}
          loading={loading}
          key={'my-post-list' + selectedFilter[0]}
          style={{ paddingHorizontal: 8, paddingBottom: 240 }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}
          getListRef={ref => {
            this.listRef = ref
            getListRef(ref)
          }}
          onLayout={() => {
            this.listRef.getNode().scrollToOffset({
              offset: contentHeight,
              animated: false,
            })
          }}
          bounces={false}
          onEndReached={this._fetchMore}
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          ListEmptyComponent={this._emptyState}
          layoutType={this._getLayout()}
          columnStyle={{ flex: 1, marginHorizontal: 8 }}
          numColumns={2}
          mansoryLoader={this._renderFooter}
          {...props}
          ListFooterComponent={<View style={{ height: 200 }} />}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.productsSaved.loading || state.postsLiked.loading,
  products: state.productsSaved.order,
  posts: state.postsLiked.order,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts, getProductSaved, getPostLiked }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MySavedProduct)
