import { createSelector } from 'reselect'

const getPostBookmarked = (state, postId) => {
  return state.postsBookmarked.data[postId] || null
}

export const makePostBookmarked = () =>
  createSelector([getPostBookmarked], postBookmarked => {
    return !!postBookmarked
  })
