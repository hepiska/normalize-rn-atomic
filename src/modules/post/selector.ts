import { createSelector } from 'reselect'

const getPost = (state, postId) => state.post.data[postId] || {}
const getFeeds = state => state.post.data
const getFeedOrder = state => state.feed.order

export const makeGetPost = () =>
  createSelector([getPost], post => {
    return post
  })

export const makeGetFeedPosts = () =>
  createSelector([getFeeds, getFeedOrder], (posts, order) => {
    const feedPosts = order.map(id => posts[id])
    return feedPosts
  })
