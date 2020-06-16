import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'
import { bindActionCreators } from 'redux'
import { addLikedPost, removeLikedPost } from '@modules/post-liked/action'
import { makeGetPost } from '@modules/post/selector'
import { makeGetUser } from '@modules/user/selector'
import { makePostLiked } from '@modules/post-liked/selector'
import {
  addBookmarkPost,
  removeBookmarkPost,
} from '@modules/post-bookmarked/action'

const postListMap = (state, ownProps) => {
  const getPost = makeGetPost()
  const getUser = makeGetUser()
  const getIsLiked = makePostLiked()

  const { postId } = ownProps
  const post = getPost(state, postId)
  const user = getUser(state, post.user)
  const isLiked = getIsLiked(state, postId)
  const isBookmarked = !!state.postsBookmarked.data[postId]

  return {
    post,
    user,
    isLiked,
    isBookmarked,
    isAuth: state.auth.isAuth,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLikedPost,
      removeLikedPost,
      addBookmarkPost,
      removeBookmarkPost,
    },
    dispatch,
  )
}

export function postListData(WrappedComponent) {
  return connect(postListMap, mapDispatchToProps)(WrappedComponent)
}
