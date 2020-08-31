import { createSelector } from 'reselect'

const getSpecificPagination = (state, query) =>
  state.discover.specificPagination[query] || ''

const getSpecificQueryPost = (state, query) =>
  state.discover.specificQueryPost[query] || []

const getSpecificLoading = (state, query) =>
  state.discover.specificLoading[query] || false

export const makeGetSpecificPagination = () =>
  createSelector([getSpecificPagination], next_token => {
    return next_token
  })

export const makeGetSpecificQueryPost = () =>
  createSelector([getSpecificQueryPost], order => {
    return order
  })

export const makeGetSpecificLoading = () =>
  createSelector([getSpecificLoading], loading => {
    return loading
  })
