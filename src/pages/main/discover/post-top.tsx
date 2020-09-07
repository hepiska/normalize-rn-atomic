import React from 'react'
import { InteractionManager, View } from 'react-native'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'

const PostItem = postListData(PostCardJournal)

interface PostTopType {
  posts?: any
}

class PostTop extends React.PureComponent<PostTopType> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  render() {
    const { posts } = this.props
    return (
      <>
        {posts &&
          posts.map(id => {
            return (
              <PostItem
                key={`discover-post-top-banner-${id}`}
                fullscreen
                postId={id}
                idx={id}
                type="banner"
                style={{ marginBottom: 20 }}
              />
            )
          })}
        {/* {fashionMenu != 'collection' && (
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
        )} */}
      </>
    )
  }
}

export default PostTop
