import { API } from '../action-types'
import { setPostData } from '@modules/post/action'
import * as schema from '@modules/normalize-schema'
import { normalize } from 'normalizr'

export const searchActionType = {
  FETCH: 'search-user/FETCH',
  SET_SEARCH_DATA: 'search-user/SET_SEARCH_DATA',
  SET_SEARCH_ORDER: 'search-user/SET_SEARCH_ORDER',
  ADD_SEARCH_ORDER: 'search-user/ADD_SEARCH_ORDER',
  SET_SEARCH_LOADING: 'search-user/SET_SEARCH_LOADING',
  SET_PAGINATION: 'search-user/SET_PAGINATION',
  SET_DEFAULT: 'search-user/SET_DEFAULT',
  CLEAR_SEARCH: 'search-user/CLEAR_SEARCH',
  ERROR: 'search-user/ERROR',
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

export const addSearchOrder = (data: any) => ({
  type: searchActionType.ADD_SEARCH_ORDER,
  payload: data,
})

export const setSearchLoading = (data: any) => ({
  type: searchActionType.SET_SEARCH_LOADING,
  payload: data,
})

export const setPagination = (data: any) => ({
  type: searchActionType.SET_PAGINATION,
  payload: data,
})

export const clearSearchUser = () => ({
  type: searchActionType.CLEAR_SEARCH,
})

export const getSearchUser = (params, url) => ({
  type: API,
  payload: {
    url: url || '/search',
    requestParams: {
      params: { sort_by: 'name', sort_direction: 'asc', ...params },
    },
    startNetwork: () => {
      if (!params.offset) {
        return [setSearchOrder([]), setSearchLoading(true)]
      }

      return setSearchLoading(true)
    },
    success: (data, { pagination }) => {
      const normalizedUser = normalize(data.users, [schema.user])
      const dispacers = [
        setSearchData(normalizedUser.entities.user),
        setSearchLoading(false),
      ]
      if (params.offset > 0) {
        dispacers.push(addSearchOrder(normalizedUser.result))
        dispacers.push(setPagination(pagination.users))
      } else {
        dispacers.push(setSearchOrder(normalizedUser.result))
        dispacers.push(setPagination(pagination.users))
      }
      return data ? dispacers : [setSearchLoading(false)]
    },
  },
})
