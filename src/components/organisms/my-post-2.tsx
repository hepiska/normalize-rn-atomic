import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserPosts } from '@modules/user-post/action'
import PostListItem from '@src/components/molecules/post-card'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import { FlatList } from '../atoms/basic'
import { Instagram } from 'react-content-loader/native'

const PostItem = postListData(PostListItem)

class MyPost extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
  }

  limit = 20
  skip = 0
  lastskip = 0

  shouldComponentUpdate(nextProps) {
    const { posts, loading } = this.props
    if (posts && posts.length !== nextProps.posts.length) {
      return true
    }
    if (loading !== nextProps.loading) {
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
    const params: any = {
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
      params.status = selectedStatus
    }

    if (
      selectedStatus === 'instagram' ||
      selectedStatus === 'article' ||
      selectedStatus === 'collection' ||
      selectedStatus === 'youtube'
    ) {
      params.type = selectedStatus
    }

    this.props.getUserPosts(params, this.props.userid)
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

  _emptyState = () => (
    <EmtyState
      title={`No Post`}
      description="You Dont Have Post in this Section"
    />
  )
  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        style={{ width: '100%', marginVertical: 8 }}
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
          height: 300,
          width: '100%',
        }}>
        {loading && <Instagram />}
      </View>
    )
  }

  render() {
    const { header, posts, loading, style } = this.props
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
          data={posts}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          scrollIndicatorInsets={{ right: 1 }}
          ListHeaderComponent={header}
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
    isEndReached: state.userPosts.isEndReached,
    loading: state.userPosts.loading,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyPost)
