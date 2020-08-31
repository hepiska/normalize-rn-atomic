import { createSelector } from 'reselect'

const getSpecificPagination = state => state.discover.specificPagination || {}

const getSpecificQueryPost = state => state.discover.specificQueryPost || {}

const getSpecificLoading = state => state.discover.specificLoading || {}

const getPostData = state => state.post.data

const getTabname = state => state.discover.tabName

export const makeGetSpecificPagination = () =>
  createSelector([getSpecificPagination, getTabname], (pagination, query) => {
    return pagination[query]
  })

export const makeGetSpecificQueryPost = () =>
  createSelector([getSpecificQueryPost, getTabname], (postQuery, query) => {
    return postQuery[query]
  })

export const makeGetSpecificLoading = () =>
  createSelector([getSpecificLoading, getTabname], (loading, query) => {
    return loading[query]
  })

export const makeGetSpecificPost = () =>
  createSelector(
    [getSpecificQueryPost, getTabname, getPostData],
    (order, query, data) => {
      return order[query] ? order[query].map(id => data[id]) : []
    },
  )
