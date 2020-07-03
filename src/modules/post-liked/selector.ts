import { createSelector } from 'reselect'

const getPostLiked = (state, postId) => {
  return state.postsLiked.data[postId] || null
}

export const makePostLiked = () =>
  createSelector([getPostLiked], postliked => {
    return !!postliked
  })
