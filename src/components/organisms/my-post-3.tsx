import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserPosts } from '@modules/user-post/action'
import PostListItem from '@src/components/molecules/post-card'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import { FlatList } from '../atoms/basic'
import { Instagram } from 'react-content-loader/native'
import TabMenu from '@src/components/layouts/tab-menu-profile'
import { productListData } from '@src/hocs/data/product'
import ProductCard from '@components/molecules/product-card-new'
import { productApi } from '@modules/product/action'

const PostItem = postListData(PostListItem)
const ProductWithCardHoc = productListData(ProductCard)

const initialActiveTab = 'Post'
const { width } = Dimensions.get('screen')

class MyPost extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
    activeTab: initialActiveTab,
  }

  limit = 30
  skip = 0
  lastskip = 0

  shouldComponentUpdate(nextProps) {
    const { posts, products, loading } = this.props
    if (posts && posts.length !== nextProps.posts.length) {
      return true
    }
    if (loading !== nextProps.loading) {
      return true
    }
    if (this.state.activeTab) {
      return true
    }
    if (products && products.length !== nextProps.products.length) {
      return true
    }
    return false
  }

  componentDidMount() {
    this._freshfetch()
  }

  _fetchData = skip => {
    const { selectedFilter } = this.state
    let selectedStatus = selectedFilter[0]
    const PostParams: any = {
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
    }

    if (
      selectedStatus === 'published' ||
      selectedStatus === 'draft' ||
      selectedStatus === 'archived'
    ) {
      PostParams.status = selectedStatus
    }

    if (
      selectedStatus === 'instagram' ||
      selectedStatus === 'article' ||
      selectedStatus === 'collection' ||
      selectedStatus === 'youtube'
    ) {
      PostParams.type = selectedStatus
    }

    this.props.getUserPosts(PostParams, this.props.userid)
    this.props.productApi()
  }

  _fetchMore = () => {
    if (!this.props.loading && !this.props.isEndReached) {
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

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
  }

  _emptyState = () => {
    if (this.state.activeTab === 'Post') {
      return (
        <EmtyState
          title={`No Post`}
          description="You Dont Have Post in this Section"
        />
      )
    }
    return (
      <EmtyState
        title={`No Product`}
        description="You Dont Have Product in this Section"
      />
    )
  }
  _renderItme
  _renderItem = ({ item, index }) => {
    if (this.state.activeTab === 'Post') {
      return (
        <PostItem
          style={{ width: '100%', marginBottom: 16 }}
          key={`horizontal-list-post-${index}`}
          postId={item}
          idx={index}
          fullscreen
        />
      )
    }
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
  _keyExtractor = (item, index) => '' + item + index
  _renderFooter = () => {
    const { loading } = this.props
    return (
      <View
        style={{
          height: 200,
          width: '100%',
        }}>
        {loading && <Instagram />}
      </View>
    )
  }
  _items = () => {
    return [
      {
        name: 'Post',
        title: `Posts`,
      },
      {
        name: 'Product',
        title: `Products`,
      },
    ]
  }

  onChangeTab = item => {
    this.setState({
      activeTab: item.name,
    })
  }

  _header = () => {
    const { header } = this.props
    return (
      <>
        {header}
        <TabMenu
          items={this._items()}
          selectedItem={this.state.activeTab}
          onChangeTab={this.onChangeTab}
          textMenuAlign="center"
          isScrollEnabled={true}
          isLazyload
        />
      </>
    )
  }

  render() {
    const { posts, products, loading, style } = this.props
    const data = this.state.activeTab === 'Post' ? posts : products
    return (
      <View style={{ ...style }}>
        <FlatList
          onEndReached={this._fetchMore}
          refreshing={loading}
          onRefresh={this._freshfetch}
          onEndReachedThreshold={0.97}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          data={data}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          scrollIndicatorInsets={{ right: 1 }}
          ListHeaderComponent={this._header}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._emptyState}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('state redux ====> ', state)

  let posts = state.userPosts.order
  let products = state.products.order

  if (ownProps.userid) {
    posts = state.userPosts.specificOrder[ownProps.userid]
    products = state.products.order[ownProps.userid]
  }

  console.log('----products-----', state)

  return {
    userPostStatus: state.userPosts.status,
    posts,
    products,
    isEndReached: state.userPosts.isEndReached,
    loading: state.userPosts.loading,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts, productApi }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyPost)
