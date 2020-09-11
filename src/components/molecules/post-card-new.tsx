import React from 'react'
import { Dimensions } from 'react-native'
import PostCardCollection from '@src/components/molecules/post-card-collection'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import { postListData } from '@hocs/data/post'

interface PostCardNewType {
  post: any
  style: any
  displayComment?: boolean
}

const PostItemCollection = postListData(PostCardCollection)

const PostItemJournal = postListData(PostCardJournal)

class PostCardNew extends React.PureComponent<PostCardNewType> {
  render() {
    const { post, style, displayComment } = this.props
    return (
      <>
        {post.post_type === 'article' ? (
          <PostItemJournal
            key={`post-card-new-${post.id}`}
            postId={post.id}
            style={style}
            idx={post.id}
            displayComment={displayComment}
          />
        ) : (
          <PostItemCollection
            key={`post-card-new-${post.id}`}
            postId={post.id}
            style={{ ...style }}
            idx={post.id}
            displayComment={displayComment}
          />
        )}
      </>
    )
  }
}

export default PostCardNew
