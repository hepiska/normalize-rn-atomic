import { createSelector } from 'reselect'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen'

const getPostLiked = (state, postId) => {
  return state.postsLiked.data[postId] || {}
}

export const makePostLiked = () =>
  createSelector([getPostLiked], postliked => {
    return !!postliked
  })
