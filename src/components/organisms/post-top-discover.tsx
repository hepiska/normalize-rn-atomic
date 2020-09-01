import React from 'react'
import {
  InteractionManager,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import { makeGetSpecificPost } from '@src/modules/post-discover/selector'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'

const PostItem = postListData(PostCardJournal)

class PostTopDiscover extends React.PureComponent<any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshFetch()
    })
  }

  _freshFetch = () => {
    this._fetchData(
      { limit: 0, offset: 10, category_id: 1, type: 'journal' },
      'discover-post-top',
      true,
    )
  }

  _fetchMore = () => {
    this._fetchData({}, 'discover-post-top', false)
  }

  _fetchData = (params, type, isFresh) => {
    this.props.fetchSpecificPosts({ ...params }, type, isFresh)
  }

  _separator = () => {
    return <View style={{ width: 16 }} />
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        key={`discover-post-top-horizontal-${item.id}`}
        fullscreen
        postId={item.id}
        idx={index}
        type="horizontal-list"
        style={{
          width: 300,
          borderWidth: 1,
          borderColor: colors.black50,
          borderRadius: 6,
        }}
      />
    )
  }

  onPress = () => {}

  render() {
    const { posts } = this.props
    const bannerPost = posts[0]
    const postslist = posts.slice(1, posts.length)
    return (
      <>
        {bannerPost && (
          <PostItem
            key={`discover-post-top-banner-${bannerPost.id}`}
            fullscreen
            postId={bannerPost.id}
            idx={bannerPost.id}
            type="banner"
            style={{ marginBottom: 20 }}
          />
        )}
        <FlatList
          data={postslist}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 30 }}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: colors.black80,
              fontSize: 16,
              ...fontStyle.helveticaThin,
              color: colors.black100,
              textAlign: 'center',
              marginBottom: 40,
            }}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpecificPosts }, dispatch)

const mapStateToProps = state => {
  const getSpecificPosts = makeGetSpecificPost()
  return {
    posts: getSpecificPosts(state, 'discover-post-top'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTopDiscover)
