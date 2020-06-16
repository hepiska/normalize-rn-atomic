import { createSelector } from 'reselect'

const getPost = (state, postId) => state.post.data[postId] || {}

export const makeGetPost = () =>
  createSelector([getPost], post => {
    return post
  })
