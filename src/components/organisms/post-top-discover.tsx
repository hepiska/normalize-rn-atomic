import React from 'react'
import { Text, InteractionManager, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import { makeGetSpecificPost } from '@src/modules/post-discover/selector'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'

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
      { limit: 0, offset: 10, category_id: 1 },
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

  render() {
    const bannerPost = this.props.posts[0]
    return (
      <>
        {bannerPost && (
          <PostItem
            key={`discover-post-top-banner-${bannerPost.id}`}
            fullscreen
            postId={bannerPost.id}
            idx={bannerPost.id}
            type="banner"
          />
        )}
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
