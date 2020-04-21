import { API } from '../action-types'
import { setBrandData } from '../brand/action'
import { setProductData } from '../product/action'
import * as schema from '@modules/normalize-schema'

export const categoryActionType = {
  SET_CATEGORY_DATA: 'category/SET_CATEGORY_DATA',
  SET_CATEGORY_ORDER: 'category/SET_CATEGORY_ORDER',
  SET_ACTIVE_CATEGORY: 'category/SET_ACTIVE_CATEGORY',
  FETCH_START: 'category/FETCH_START',
  SET_FEATURED: 'category/SET_FEATURED',
  SET_LOADING: 'category/SET_CATEGORY_LOADING',
  ERROR: 'category/ERROR',
}

export const setCategoryData = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_DATA,
  payload: data,
})
export const setCategoryError = (data: any) => ({
  type: categoryActionType.ERROR,
  payload: data,
})

export const setActiveCategory = data => ({
  type: categoryActionType.SET_ACTIVE_CATEGORY,
  payload: data,
})

export const setCategoryOrder = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_ORDER,
  payload: data,
})

export const setCategoryLoading = (data: any) => ({
  type: categoryActionType.SET_LOADING,
  payload: data,
})

export const setFeaturedCategories = data => ({
  type: categoryActionType.SET_FEATURED,
  payload: data,
})

export const getFeaturedCategories = () => ({
  type: API,
  payload: {
    url: '/categories/featured',
    schema: [schema.category],
    startNetwork: () => {
      return setCategoryLoading(true)
    },
    endNetwork: (status, error) => {
      if (status === 'error') {
        return [setCategoryLoading(true), setCategoryError(error)]
      }
      return setCategoryLoading(true)
    },
    success: data => {
      return [
        setCategoryData(data.entities.category),
        setFeaturedCategories(data.result),
        setCategoryLoading(true),
      ]
    },
  },
})

export const getCategory = id => {
  const params: any = {}
  if (!Number(id)) {
    params.id_type = 'slug'
  }
  return {
    type: API,
    payload: {
      url: '/categories/' + id,
      requestParams: { params },
      schema: schema.detailCategory,
      startNetwork: () => {
        return setCategoryLoading(true)
      },
      endNetwork: (status, error) => {
        if (status === 'error') {
          return [setCategoryLoading(false), setCategoryError(error)]
        }
        return setCategoryLoading(false)
      },
      success: data => {
        return [
          setBrandData(data.entities.brand),
          setProductData(data.entities.product),
          setCategoryData(data.entities.category),
          setActiveCategory(data.result),
        ]
      },
    },
  }
}
