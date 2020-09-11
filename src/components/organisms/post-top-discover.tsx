import React from 'react'
import { InteractionManager, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import {
  makeGetSpecificPost,
  makeGetSpecificMenu,
} from '@src/modules/post-discover/selector'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import { categoryIds, colors } from '@src/utils/constants'
import PostHorizontalList from './post-horizontal-list'
import ImageAutoSchale from '../atoms/image-autoschale'

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
      {
        limit: 7,
        offset: 0,
        post_type: 'article',
        category_id:
          this.props.category === 'fashion'
            ? categoryIds.fashion
            : categoryIds.beauty,
      },
      this.props.uri,
    )
  }

  _fetchData = (params, type) => {
    this.props.fetchSpecificPosts({ ...params }, type)
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        key={`post-top-horizontal-discover-${item.id}`}
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
    const { posts, menu } = this.props
    const bannerPost = posts[0]
    const postslist = posts.slice(1, posts.length)
    return (
      <>
        {menu === 'article' && (
          <ImageAutoSchale
            source={require('@assets/placeholder/editorial.png')}
            style={{
              backgroundColor: colors.white,
              marginTop: 20,
              marginBottom: 25,
            }}
          />
        )}
        {menu != 'collection' && (
          <>
            {bannerPost && (
              <PostItem
                key={`post-top-banner-discover-${bannerPost.id}`}
                fullscreen
                postId={bannerPost.id}
                idx={bannerPost.id}
                type="banner"
                style={{ marginBottom: 20 }}
              />
            )}
          </>
        )}
        {menu != 'article' && menu != 'collection' && (
          <PostHorizontalList
            key={`post-horizontal-discover`}
            data={postslist}
            renderItem={this._renderItem}
          />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpecificPosts }, dispatch)

const mapStateToProps = (state, props) => {
  const getSpecificPosts = makeGetSpecificPost()
  const getMenuName = makeGetSpecificMenu()
  return {
    posts: getSpecificPosts(state, props.uri),
    menu: getMenuName(state, props.category),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTopDiscover)
