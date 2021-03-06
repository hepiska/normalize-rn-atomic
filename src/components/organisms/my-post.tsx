import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserPosts } from '@modules/user-post/action'
import PostListItem from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import EmptyState from '@components/molecules/order-empty-state'
import List from '@components/layouts/list-header'
import { Instagram } from 'react-content-loader/native'
import TabMenu from '@src/components/layouts/tab-menu-profile'

const PostItem = postListData(PostListItem)

class Post extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
  }
  limit = 3
  skip = 0
  lastskip = 0

  shouldComponentUpdate(nextProps) {
    const { posts, activity } = this.props
    if (posts && posts.length !== nextProps.posts.length) {
      return true
    }
    if (nextProps.activity !== activity) {
      console.log('trigger by parent', activity)
      this._freshfetch()
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
    return (
      <EmptyState
        title={`No Post`}
        description="You Dont Have Post in this Section"
      />
    )
  }

  _renderItem = ({ item, index }) => {
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

  render() {
    const { posts, style } = this.props
    return (
      <View style={{ ...style }}>
        <List
          onEndReached={this._fetchMore}
          onEndReachedThreshold={0.97}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          data={posts}
          numColumns={1}
          nestedScrollEnabled
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._emptyState}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let posts = state.userPosts.order
  if (ownProps.userid) {
    posts = state.userPosts.specificOrder[ownProps.userid]
  }
  return {
    userPostStatus: state.userPosts.status,
    posts,
    products: state.products.order,
    isEndReached: state.userPosts.isEndReached,
    loading: state.userPosts.loading,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post)
