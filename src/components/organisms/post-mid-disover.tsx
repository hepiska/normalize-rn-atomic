import React from 'react'
import { InteractionManager, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpecificPosts } from '@src/modules/post-discover/action'
import { makeGetSpecificPost } from '@src/modules/post-discover/selector'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import { colors } from '@src/utils/constants'
import PostHorizontalList from './post-horizontal-list'

const PostItem = postListData(PostCardJournal)

class PostMidDiscover extends React.PureComponent<any> {
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
      'discover-post-mid',
      true,
    )
  }

  _fetchData = (params, type, isFresh) => {
    this.props.fetchSpecificPosts({ ...params }, type, isFresh)
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        key={`discover-post-mid-horizontal-${item.id}`}
        fullscreen
        postId={item.id}
        idx={index}
        type="horizontal-list"
        style={{
          width: 300,
          borderWidth: 1,
          borderRadius: 6,
        }}
      />
    )
  }

  onPress = () => {}

  render() {
    const { posts } = this.props
    return (
      <>
        <PostHorizontalList
          data={posts}
          renderItem={this._renderItem}
          title="Trending Fashion Editorial"
          darkMode
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpecificPosts }, dispatch)

const mapStateToProps = state => {
  const getSpecificPosts = makeGetSpecificPost()
  return {
    posts: getSpecificPosts(state, 'discover-post-mid'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostMidDiscover)
