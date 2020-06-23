import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { followUser, unfollowUser } from '@modules/user/action'

const userListMap = (state, ownProps) => {
  const { userId } = ownProps
  const user = state.user.data[userId]
  const isFollowed =
    state.user.data[userId].is_followed !== undefined
      ? state.user.data[userId].is_followed
      : false
  return {
    user,
    isFollowed,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      unfollowUser,
      followUser,
    },
    dispatch,
  )
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const onFollow = stateProps.isFollowed
    ? dispatchProps.unfollowUser
    : dispatchProps.followUser

  return { ...stateProps, ...ownProps, onFollow }
}

export function userListData(WrappedComponent) {
  return connect(userListMap, mapDispatchToProps, mergeProps)(WrappedComponent)
}
