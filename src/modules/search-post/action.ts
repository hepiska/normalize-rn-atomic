import { API } from '../action-types'
import * as newSchema from '@modules/normalize-schema'
import { schema, normalize } from 'normalizr'

export const searchActionType = {
  FETCH: 'search-post/FETCH',
  SET_SEARCH_DATA: 'search-post/SET_SEARCH_DATA',
  SET_SEARCH_TAG_DATA: 'search-post/SET_SEARCH_TAG_DATA',
  SET_TAG_SEARCH: 'search-post/SET_TAG_SEARCH',
  SET_SEARCH_ORDER: 'search-post/SET_SEARCH_ORDER',
  SET_SEARCH_LOADING: 'search-post/SET_SEARCH_LOADING',
  SET_SEARCH_TAG_LOADING: 'search-post/SET_SEARCH_TAG_LOADING',
  SET_PAGINATION: 'search-post/SET_PAGINATION',
  ADD_SEARCH_ORDER: 'search-post/ADD_SEARCH_ORDER',
  SET_DEFAULT: 'search-post/SET_DEFAULT',
  CLEAR_SEARCH: 'search-post/CLEAR_SEARCH',
  ERROR: 'search-post/ERROR',
}

export const setSearchData = (data: any) => {
  return {
    type: searchActionType.SET_SEARCH_DATA,
    payload: data,
  }
}

export const setSearchTagData = (data: any) => ({
  type: searchActionType.SET_SEARCH_TAG_DATA,
  payload: data,
})
export const setSearchOrder = (data: any) => ({
  type: searchActionType.SET_SEARCH_ORDER,
  payload: data,
})

export const addSearchOrder = (data: any) => ({
  type: searchActionType.ADD_SEARCH_ORDER,
  payload: data,
})

export const setSearchLoading = (data: any) => ({
  type: searchActionType.SET_SEARCH_LOADING,
  payload: data,
})

export const setSearchTagLoading = (data: any) => ({
  type: searchActionType.SET_SEARCH_TAG_LOADING,
  payload: data,
})

export const setPagination = (data: any) => ({
  type: searchActionType.SET_PAGINATION,
  payload: data,
})

export const setTagSearch = (data: any) => ({
  type: searchActionType.SET_TAG_SEARCH,
  payload: data,
})

export const clearSearchPost = () => ({
  type: searchActionType.CLEAR_SEARCH,
})

export const getSearchPost = (params, url) => ({
  type: API,
  payload: {
    url: url || '/search',
    requestParams: { params },
    startNetwork: () => {
      if (!params.offset) {
        return [setSearchOrder([]), setSearchLoading(true)]
      }
      return setSearchLoading(true)
    },
    success: (data, { pagination }) => {
      const newPosts = new schema.Entity('search_post')
      const normalizedPost = normalize(data.posts, [newPosts])

      const dispatchers = [
        setSearchData(normalizedPost.entities.search_post),
        setSearchLoading(false),
      ]

      if (params.offset > 0) {
        dispatchers.push(addSearchOrder(normalizedPost.result))
        dispatchers.push(setPagination(pagination.articles))
      } else {
        dispatchers.push(setSearchOrder(normalizedPost.result))
        dispatchers.push(setPagination(pagination.articles))
      }
      return data ? dispatchers : [setSearchLoading(false)]
    },
  },
})

export const getPostByTag = (params, url) => ({
  type: API,
  payload: {
    url: url || '/posts',
    schema: [newSchema.postTag],
    requestParams: { params },
    startNetwork: () => {
      return setSearchLoading(true)
    },
    success: (data, { pagination }) => {
      const dispatchers = [
        setSearchData(data.entities.post_tag),
        setSearchLoading(false),
      ]

      if (params.offset > 0) {
        dispatchers.push(addSearchOrder(data.result))
        dispatchers.push(setPagination(pagination))
      } else {
        dispatchers.push(setSearchOrder(data.result))
        dispatchers.push(setPagination(pagination))
      }
      return data ? dispatchers : [setSearchLoading(false)]
    },
  },
})

export const getSearchTag = () => ({
  type: API,
  payload: {
    url: '/tags/search',
    startNetwork: () => {
      return setSearchTagLoading(true)
    },
    success: data => {
      return data
        ? [setSearchTagData(data), setSearchTagLoading(false)]
        : setSearchTagLoading(false)
    },
  },
})
