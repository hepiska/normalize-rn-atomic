import React from 'react'
import { InteractionManager, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import {
  makeGetSpecificPost,
  makeGetSpecificMenu,
} from '@src/modules/post-discover/selector'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import { colors } from '@src/utils/constants'
import PostHorizontalList from './post-horizontal-list'

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

  _fetchData = (params, type, isFresh) => {
    this.props.fetchSpecificPosts({ ...params }, type, isFresh)
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
    const { posts, fashionMenu } = this.props
    const bannerPost = posts[0]
    const postslist = posts.slice(1, posts.length)
    return (
      <>
        {fashionMenu != 'collection' && (
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
          </>
        )}
        {fashionMenu != 'journal' && fashionMenu != 'collection' && (
          <PostHorizontalList data={postslist} renderItem={this._renderItem} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpecificPosts }, dispatch)

const mapStateToProps = state => {
  const getSpecificPosts = makeGetSpecificPost()
  const getMenuName = makeGetSpecificMenu()
  return {
    posts: getSpecificPosts(state, 'discover-post-top'),
    fashionMenu: getMenuName(state, 'fashion'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTopDiscover)
