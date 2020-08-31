import { createSelector } from 'reselect'

const getSpecificPagination = (state, query) =>
  state.discover.specificPagination[query] || ''

const getSpecificQueryPost = (state, query) =>
  state.discover.specificQueryPost[query] || []

const getSpecificLoading = (state, query) =>
  state.discover.specificLoading[query] || false

const getPostData = state => state.post.data

export const makeGetSpecificPagination = () =>
  createSelector([getSpecificPagination], pagination => {
    return pagination
  })

export const makeGetSpecificLoading = () =>
  createSelector([getSpecificLoading], loading => {
    return loading
  })

export const makeGetSpecificPost = () =>
  createSelector([getSpecificQueryPost, getPostData], (order, data) => {
    return order.map(id => data[id])
  })
