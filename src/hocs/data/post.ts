import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { navigate } from '@src/root-navigation'
import { bindActionCreators } from 'redux'
import { addLikedPost, removeLikedPost } from '@modules/post-liked/action'
import {
  addBookmarkPost,
  removeBookmarkPost,
} from '@modules/post-bookmarked/action'

const postListMap = (state, ownProps) => {
  const { postId } = ownProps
  const post = state.post.data[postId] || {}
  const user = state.user.data[post.user]
  const isLiked = !!state.postsLiked.data[postId]
  const isBookmarked = !!state.postsBookmarked.data[postId]
  if (!ownProps.onPress) {
    ownProps.onPress = () => {
      if (post.post_type === 'article' || post.post_type === 'collection') {
        navigate('Screens', {
          screen: 'PostDetail',
          params: { postId },
        }) // revisi: navigasi ke post id
      }
      if (post.post_type === 'youtube') {
        Linking.openURL(post.permalink)
      }
    }
  }

  if (!ownProps.onUserPress) {
    ownProps.onUserPress = user => () => {
      navigate('Screens', {
        screen: 'UserDetail',
        params: { userId: user.id },
      })
    }
  }

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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const onLike = stateProps.isLiked
    ? dispatchProps.removeLikedPost
    : dispatchProps.addLikedPost

  const onBookmark = stateProps.isBookmarked
    ? dispatchProps.removeBookmarkPost
    : dispatchProps.addBookmarkPost

  return { ...stateProps, ...ownProps, onLike, onBookmark }
}

export function postListData(WrappedComponent) {
  return connect(postListMap, mapDispatchToProps, mergeProps)(WrappedComponent)
}
