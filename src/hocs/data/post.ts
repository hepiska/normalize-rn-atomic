import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'

const postListMap = (state, ownProps) => {
  const { postId } = ownProps
  const post = state.post.data[postId]
  const user = state.user.data[post.user_id]

  ownProps.onPress = () => {
    navigate('PostDetail', { postId }) // revisi: navigasi ke post id
  }
  return {
    post,
    user
  }
}
export function postListData(WrappedComponent) {
  return connect(postListMap, null)(WrappedComponent)
}
