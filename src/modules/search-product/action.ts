import { API } from '../action-types'
import { setPostData } from '@modules/post/action'
import { request } from '@utils/services'
import * as schema from '@modules/normalize-schema'
import {
  setInitialFilter,
  updateSelected as globalUpdateSelected,
} from '../global-search-product-filter/action'
import { contextMaping } from '@utils/constants'
import { normalize } from 'normalizr'
export const searchActionType = {
  FETCH: 'search-product/FETCH',
  SET_SEARCH_PRODUCT_DATA: 'search-product/SET_SEARCH_PRODUCT_DATA',
  SET_SEARCH_PRODUCT_ORDER: 'search-product/SET_SEARCH_PRODUCT_ORDER',
  ADD_SEARCH_PRODUCT_ORDER: 'search-product/ADD_SEARCH_PRODUCT_ORDER',
  SET_SEARCH_CATEGORY_DATA: 'search-product/SET_SEARCH_CATEGORY_DATA',
  SET_SEARCH_CATEGORY_ORDER: 'search-product/SET_SEARCH_CATEGORY_ORDER',
  ADD_SEARCH_CATEGORY_ORDER: 'search-product/ADD_SEARCH_CATEGORY_ORDER',
  SET_SEARCH_LOADING: 'search-product/SET_SEARCH_LOADING',
  SET_FIND_PRODUCT_ORDER: 'search-product/SET_FIND_PRODUCT_ORDER',
  ADD_FIND_PRODUCT_ORDER: 'search-product/ADD_FIND_PRODUCT_ORDER',
  SET_FIND_SEARCH_LOADING: 'search-product/SET_FIND_SEARCH_LOADING',
  SET_FIND_PAGiNATION: 'search-product/SET_FIND_PAGiNATION',
  SET_CONTEXT: 'search-product/SET_CONTEXT',
  SET_PAGINATION: 'search-product/SET_PAGINATION',
  SET_DEFAULT: 'search-product/SET_DEFAULT',
  CLEAR_SEARCH: 'search-product/CLEAR_SEARCH',
  ERROR: 'search-product/ERROR',
}

export const setSearchProdutData = (data: any) => {
  return {
    type: searchActionType.SET_SEARCH_PRODUCT_DATA,
    payload: data,
  }
}

export const setSearchCategoryData = (data: any) => {
  return {
    type: searchActionType.SET_SEARCH_CATEGORY_DATA,
    payload: data,
  }
}

export const setSearchProductOrder = (data: any) => ({
  type: searchActionType.SET_SEARCH_PRODUCT_ORDER,
  payload: data,
})

export const addSearchProductOrder = (data: any) => ({
  type: searchActionType.ADD_SEARCH_CATEGORY_ORDER,
  payload: data,
})

export const setFindProductOrder = (data: any) => ({
  type: searchActionType.SET_FIND_PRODUCT_ORDER,
  payload: data,
})

export const addFindProductOrder = (data: any) => ({
  type: searchActionType.ADD_FIND_PRODUCT_ORDER,
  payload: data,
})

export const setSearchCategoryOrder = (data: any) => ({
  type: searchActionType.SET_SEARCH_CATEGORY_ORDER,
  payload: data,
})

export const addSearchCategoryOrder = (data: any) => ({
  type: searchActionType.ADD_SEARCH_CATEGORY_ORDER,
  payload: data,
})

export const setContext = (data: any) => ({
  type: searchActionType.SET_CONTEXT,
  payload: data,
})

export const setSearchLoading = (data: any) => ({
  type: searchActionType.SET_SEARCH_LOADING,
  payload: data,
})

export const setFindSearchLoading = (data: any) => ({
  type: searchActionType.SET_FIND_SEARCH_LOADING,
  payload: data,
})

export const setPagination = (data: any) => ({
  type: searchActionType.SET_PAGINATION,
  payload: data,
})

export const setFindPagination = (data: any) => ({
  type: searchActionType.SET_FIND_PAGiNATION,
  payload: data,
})

export const clearSearchProduct = () => ({
  type: searchActionType.CLEAR_SEARCH,
})

export const getSearchProduct = (params, url) => ({
  type: API,
  payload: {
    url: url || '/products/search',
    requestParams: {
      params: { sort_by: 'name', sort_direction: 'asc', ...params },
    },
    startNetwork: () => {
      if (!params.offset) {
        return [
          setSearchLoading(true),
          setSearchProductOrder([]),
          setSearchCategoryOrder([]),
        ]
      }

      return setSearchLoading(true)
    },
    success: (data, { pagination, meta }) => {
      const normalizeProduct = normalize(data.products, [schema.searchProduct])
      const normalizeCategory = normalize(data.categories, [schema.category])

      const context = meta.context.reduce((acc, ctx) => {
        const newAcc = { ...acc }
        if (newAcc[contextMaping[ctx.type]]) {
          newAcc[contextMaping[ctx.type]] += `,${ctx.id}`
        } else {
          newAcc[contextMaping[ctx.type]] = '' + ctx.id
        }
        return newAcc
      }, {})

      const dispacers = [
        setSearchProdutData(normalizeProduct.entities.product || {}),
        setSearchCategoryData(normalizeCategory.entities.category || {}),
        setInitialFilter(context),
        globalUpdateSelected(context),
        setContext(meta.context),
        setSearchLoading(false),
      ]
      if (params.offset > 0) {
        dispacers.push(addSearchProductOrder(normalizeProduct.result))
        dispacers.push(addSearchCategoryOrder(normalizeCategory.result))
        dispacers.push(setPagination(pagination))
        return dispacers
      } else {
        dispacers.push(setSearchProductOrder(normalizeProduct.result))
        dispacers.push(setSearchCategoryOrder(normalizeCategory.result))
        dispacers.push(setPagination(pagination))
        return dispacers
      }
      return [setSearchLoading(false)]
    },
  },
})

export const findProductSearch = (params, url) => ({
  type: API,
  payload: {
    url: url || '/products',
    requestParams: { params },
    schema: [schema.searchProduct],
    startNetwork: () => {
      return setFindSearchLoading(true)
    },

    success: (data, { pagination, meta }) => {
      const dispacers = [
        setFindSearchLoading(false),
        setSearchProdutData(data.entities.product || {}),
        setFindPagination(pagination || {}),
        setContext(meta.context),
      ]

      if (params.offset > 0 && !data.result.length) {
        return setFindSearchLoading(false)
      }

      if (params.offset > 0) {
        dispacers.push(addFindProductOrder(data.result))
      } else {
        dispacers.push(setFindProductOrder(data.result))
      }
      return dispacers
    },
  },
})
