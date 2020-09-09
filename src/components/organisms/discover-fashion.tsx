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
import {
  fetchSpecificPosts,
  fetchSpecificPostsMore,
} from '@src/modules/post-discover/action'
import List from '@components/layouts/list-header'
import {
  makeGetSpecificLoading,
  makeGetSpecificMenu,
  makeGetSpecificPagination,
  makeGetSpecificPost,
} from '@src/modules/post-discover/selector'
import { categoryIds, colors } from '@src/utils/constants'
import PostCardFull from '@components/atoms/loaders/post-card-full'
import EmtyState from '@components/molecules/order-empty-state'
import PostCardCollection from '@src/components/molecules/post-card-collection'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import PostTopDiscover from './post-top-discover'
import Amplitude from 'amplitude-js'
import PostMidDiscover from './post-mid-disover'

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
    Amplitude.getInstance().logEvent('discover fashion')
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshFetch()
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.fashionMenu !== prevProps.fashionMenu) {
      this._freshFetch()
    }
  }

  _freshFetch = () => {
    this.skip = 0
    if (!this.props.loading) {
      const type =
        this.props.fashionMenu === '' || this.props.fashionMenu === 'collection'
          ? 'collection'
          : 'article'
      this._fetchData(
        {
          limit: 10,
          offset: 0,
          post_type: type,
          category_id: categoryIds.fashion,
        },
        'fashion',
      )
    }
  }

  _fetchMore = () => {
    console.log('fetch more')
    if (!this.props.loading) {
      const type =
        this.props.fashionMenu === '' || this.props.fashionMenu === 'collection'
          ? 'collection'
          : 'article'
      this.props.fetchSpecificPostsMore(
        {
          limit: 10,
          offset: this.props.posts.length,
          post_type: type,
          category_id: categoryIds.fashion,
        },
        'fashion',
      )
    }
    this.skip += 1
  }

  _fetchData = (params, key) => {
    this.props.fetchSpecificPosts({ ...params }, key)
  }

  _renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <>
          <PostTopDiscover
            key={`post-top-discover-fashion-${index}`}
            category="fashion"
            uri="post-top-fashion"
          />
          {this.props.fashionMenu !== 'article' &&
            this._renderPostCard(item, index)}
        </>
      )
    } else if (index === 2) {
      return (
        <>
          {this._renderPostCard(item, index)}
          <PostMidDiscover key={`post-mid-discover-fashion-${index}`} />
        </>
      )
    } else {
      return this._renderPostCard(item, index)
    }
  }

  _renderPostCard = (item, index) => {
    if (item.post_type === 'article') {
      return (
        <PostItemJournal
          key={`fashion-post-discover-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
          style={styles.postItem}
          isCard
        />
      )
    } else if (item.post_type === 'collection') {
      return (
        <PostItemCollection
          key={`fashion-post-discover-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
        />
      )
    } else {
      return (
        <PostItemJournal
          key={`fashion-post-discover-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
          style={styles.postItem}
          isCard
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
  bindActionCreators({ fetchSpecificPosts, fetchSpecificPostsMore }, dispatch)

const mapStateToProps = state => {
  const getSpecificLoading = makeGetSpecificLoading()
  const getSpecificPosts = makeGetSpecificPost()
  const getSpecificPagination = makeGetSpecificPagination()
  const getMenuName = makeGetSpecificMenu()
  return {
    loading: getSpecificLoading(state, 'fashion'),
    posts: getSpecificPosts(state, 'fashion'),
    pagination: getSpecificPagination(state, 'fashion'),
    fashionMenu: getMenuName(state, 'fashion'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverFashion)
