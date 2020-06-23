import { API } from '../action-types'
import { setPostData } from '@modules/post/action'
import { schema, normalize } from 'normalizr'

export const searchActionType = {
  FETCH: 'search/FETCH',
  SET_SEARCH_DATA: 'search/SET_SEARCH_DATA',
  SET_SEARCH_ORDER: 'search/SET_SEARCH_ORDER',
  SET_SEARCH_LOADING: 'search/SET_SEARCH_LOADING',
  SET_DEFAULT: 'search/SET_DEFAULT',
  CLEAR_SEARCH: 'search/CLEAR_SEARCH',
  ERROR: 'search/ERROR',
}

export const setSearchData = (data: any) => {
  return {
    type: searchActionType.SET_SEARCH_DATA,
    payload: data,
  }
}

export const setSearchOrder = (data: any) => ({
  type: searchActionType.SET_SEARCH_ORDER,
  payload: data,
})

export const setSearchLoading = (data: any) => ({
  type: searchActionType.SET_SEARCH_LOADING,
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
      return setSearchLoading(true)
    },
    success: (data, { pagination }) => {
      const newPosts = new schema.Entity('search_post')
      const normalizedPost = normalize(data.posts, [newPosts])

      return data
        ? [
            setPostData(normalizedPost.entities.search_post),
            setSearchOrder({
              order: normalizedPost.result,
              pagination: pagination.articles,
            }),
            setSearchLoading(false),
          ]
        : [setSearchLoading(false)]
    },
  },
})
