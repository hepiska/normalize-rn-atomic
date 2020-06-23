import { API } from '../action-types'
import { setPostData } from '@modules/post/action'
import * as schema from '@modules/normalize-schema'
import { setBrandData } from '@modules/brand/action'
export const searchActionType = {
  FETCH: 'search-brand/FETCH',
  SET_SEARCH_DATA: 'search-brand/SET_SEARCH_DATA',
  SET_SEARCH_ORDER: 'search-brand/SET_SEARCH_ORDER',
  ADD_SEARCH_ORDER: 'search-brand/ADD_SEARCH_ORDER',
  SET_SEARCH_LOADING: 'search-brand/SET_SEARCH_LOADING',
  SET_PAGINATION: 'search-brand/SET_PAGINATION',
  SET_DEFAULT: 'search-brand/SET_DEFAULT',
  CLEAR_SEARCH: 'search-brand/CLEAR_SEARCH',
  ERROR: 'search-brand/ERROR',
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

export const clearSearchBrand = () => ({
  type: searchActionType.CLEAR_SEARCH,
})

export const getSearchBrand = (params, url) => ({
  type: API,
  payload: {
    url: url || '/brands/search',
    schema: [schema.brand],
    requestParams: {
      params: { sort_by: 'name', sort_direction: 'asc', ...params },
    },
    startNetwork: () => {
      if (!params.offset) {
        return [setSearchLoading(true), setSearchOrder([])]
      }

      return setSearchLoading(true)
    },
    success: (data, { pagination }) => {
      const dispacers = [
        setBrandData(data.entities.brand),
        setSearchLoading(false),
      ]
      if (params.offset > 0) {
        dispacers.push(addSearchOrder(data.result))
        dispacers.push(setPagination(pagination))
      } else {
        dispacers.push(setSearchOrder(data.result))
      }
      return data ? dispacers : [setSearchLoading(false)]
    },
  },
})
