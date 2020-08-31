import React from 'react'
import {
  View,
  RefreshControl,
  InteractionManager,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import List from '@components/layouts/list-header'
import {
  makeGetSpecificLoading,
  makeGetSpecificPagination,
  makeGetSpecificPost,
} from '@src/modules/post-discover/selector'
import { colors } from '@src/utils/constants'
import PostCardFull from '@components/atoms/loaders/post-card-full'
import EmtyState from '@components/molecules/order-empty-state'
import PostCardCollection from '@src/components/molecules/post-card-collection'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'

const PostItemCollection = postListData(PostCardCollection)

const PostItemJournal = postListData(PostCardJournal)

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  postItem: {
    marginBottom: 32,
  },
})

class DiscoverFashion extends React.PureComponent<any> {
  state = {
    finishAnimation: false,
  }

  skip = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshFetch()
    })
  }

  _freshFetch = () => {
    this.skip = 0
    if (!this.props.loading) {
      this._fetchData({ limit: 0, offset: 10 }, 'fashion', true)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading && this.skip !== 0) {
      this._fetchData({}, 'fashion', false)
    }
    this.skip += 1
  }

  _fetchData = (params, type, isFresh) => {
    this.props.fetchSpecificPosts(
      { ...params, next_token: this.props.pagination },
      type,
      isFresh,
    )
  }

  _renderItem = ({ item, index }) => {
    return this._renderPostCard(item, index)
  }

  _renderPostCard = (item, index) => {
    if (item.post_type === 'article') {
      return (
        <PostItemJournal
          key={`discover-fashion-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
          style={styles.postItem}
        />
      )
    } else if (item.post_type === 'collection') {
      return (
        <PostItemCollection
          key={`discover-fashion-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
        />
      )
    } else {
      return (
        <PostItemJournal
          key={`discover-fashion-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
          style={styles.postItem}
        />
      )
    }
  }

  _hanleScroll = e => {
    if (e.nativeEvent.contentOffset.y < 2) {
      this.props.disableScroll && this.props.disableScroll()
    }
  }

  _emptyState = () => (
    <EmtyState
      title={`No Post`}
      description="You Dont Have Post in this Section"
    />
  )

  _renderFooterLoader = () => {
    const { loading } = this.props
    return (
      <View
        style={{
          height: 300,
          width: '100%',
        }}>
        {loading && <PostCardFull />}
      </View>
    )
  }

  render() {
    const { posts, loading } = this.props
    const firstLoading = loading && this.skip === 0
    return (
      <>
        <View style={{ width, flex: 1, backgroundColor: colors.white }}>
          {this.state.finishAnimation && firstLoading ? (
            <PostCardFull />
          ) : (
            <>
              <List
                data={posts}
                loading={loading}
                refreshControl={
                  <RefreshControl
                    onRefresh={this._freshFetch}
                    refreshing={loading}
                  />
                }
                onScroll={this._hanleScroll}
                onEndReached={({ distanceFromEnd }) => {
                  if (distanceFromEnd > 0) {
                    this._fetchMore()
                  }
                }}
                ListEmptyComponent={this._emptyState}
                layoutType="list"
                columnStyle={{ flex: 1, marginHorizontal: 8 }}
                numColumns={2}
                ListFooterComponent={this._renderFooterLoader}
                renderItem={this._renderItem}
              />
            </>
          )}
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpecificPosts }, dispatch)

const mapStateToProps = (state, props) => {
  const getSpecificLoading = makeGetSpecificLoading()
  const getSpecificPosts = makeGetSpecificPost()
  const getSpecificPagination = makeGetSpecificPagination()
  return {
    loading: getSpecificLoading(state),
    posts: getSpecificPosts(state),
    pagination: getSpecificPagination(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverFashion)
