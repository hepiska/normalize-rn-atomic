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
import { makePostBookmarked } from '@src/modules/post-bookmarked/selector'
import { comment } from '@src/modules/normalize-schema'

const postListMap = () => {
  const getPost = makeGetPost()
  const getUser = makeGetUser()
  const getIsLiked = makePostLiked()
  const getIsBookmarked = makePostBookmarked()

  return (state, ownProps) => {
    const { postId } = ownProps
    const post = getPost(state, postId)
    const user = getUser(state, post.user)
    const isLiked = getIsLiked(state, postId)
    const isBookmarked = getIsBookmarked(state, postId)
    let userAuth = null
    if (state.auth.data.user) {
      userAuth = getUser(state, state.auth.data.user.id) || state.auth.data.user
    }
    return {
      post,
      user,
      isLiked,
      isBookmarked,
      isAuth: state.auth.isAuth,
      userAuth,
    }
  }
}

const searchPostListMap = () => {
  const getPost = makeGetPost()
  const getUser = makeGetUser()
  const getIsLiked = makePostLiked()

  return (state, ownProps) => {
    const { postId } = ownProps
    const post = state.searchPost.data[postId]
    const user = post.user
    const isLiked = getIsLiked(state, postId)
    const isBookmarked = !!state.postsBookmarked.data[postId]
    let userAuth = null
    if (state.auth.data.user) {
      userAuth =
        getUser(state, state.auth.data?.user.id) || state.auth.data.user
    }

    return {
      post,
      user,
      isLiked,
      isBookmarked,
      isAuth: state.auth.isAuth,
      userAuth: userAuth,
    }
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

export function searchPostListData(WrappedComponent) {
  return connect(searchPostListMap, mapDispatchToProps)(WrappedComponent)
}

const mapCommentData = (state, ownProps) => {
  console.log('state.comments.data', ownProps.commentId, state.comments.data)
  const comment = state.comments.data[ownProps.commentId]
  return { comment }
}

export function commentsData(WrappedComponent) {
  return connect(mapCommentData, null)(WrappedComponent)
}
