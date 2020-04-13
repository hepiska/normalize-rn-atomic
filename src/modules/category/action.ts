import { API } from '../action-types'
import { setBrandData } from '../brand/action'
import { setProductData } from '../product/action'
import * as schema from '@modules/normalize-schema'

export const categoryActionType = {
  SET_CATEGORY_DATA: 'category/SET_CATEGORY_DATA',
  SET_CATEGORY_ORDER: 'category/SET_CATEGORY_ORDER',
  FETCH_START: 'category/FETCH_START',
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

export const setCategoryOrder = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_ORDER,
  payload: data,
})

export const setCategoryLoading = (data: any) => ({
  type: categoryActionType.SET_LOADING,
  payload: data,
})

export const getCategory = id => ({
  type: API,
  payload: {
    url: '/categories/' + id,
    schema: schema.detailCategory,
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
        setBrandData(data.entities.brand),
        setProductData(data.entities.product),
        setCategoryData(data.entities.category),
      ]
    },
  },
})
