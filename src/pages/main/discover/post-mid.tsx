import React from 'react'
import { InteractionManager, View } from 'react-native'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'
import PostHorizontalList from '@components/organisms/post-horizontal-list'

interface PostMidType {
  item: any
}

const PostItem = postListData(PostCardJournal)

class PostMid extends React.PureComponent<PostMidType> {
  state = {
    finishAnimation: false,
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        key={`discover-post-mid-horizontal-${item}`}
        fullscreen
        postId={item}
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
    const { item } = this.props
    console.log('item', item.posts)
    return (
      <>
        <PostHorizontalList
          data={item.posts}
          renderItem={this._renderItem}
          title={item.title}
          darkMode
        />
      </>
    )
  }
}

export default PostMid
