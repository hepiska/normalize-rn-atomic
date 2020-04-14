import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'
import { bindActionCreators } from 'redux'
import { addLikedPost, removeLikedPost } from '@modules/post-liked/action'

const postListMap = (state, ownProps) => {
  const { postId } = ownProps
  const post = state.post.data[postId] || {}
  const user = state.user.data[post.user]
  const isLiked = !!state.postsLiked.data[postId]
  ownProps.onPress = () => {
    navigate('PostDetail', { postId }) // revisi: navigasi ke post id
  }
  return {
    post,
    user,
    isLiked,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLikedPost,
      removeLikedPost,
    },
    dispatch,
  )
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const onLike = stateProps.isLiked
    ? dispatchProps.removeLikedPost
    : dispatchProps.addLikedPost

  return { ...stateProps, ...ownProps, onLike }
}

export function postListData(WrappedComponent) {
  return connect(postListMap, mapDispatchToProps, mergeProps)(WrappedComponent)
}
