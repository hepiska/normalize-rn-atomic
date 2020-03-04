import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'

export const categoryActionType = {
  SET_CATEGORY_DATA: 'category/SET_CATEGORY_DATA',
  SET_CATEGORY_ORDER: 'category/SET_CATEGORY_ORDER',
  FETCH_START: 'category/FETCH_START',
  SET_CATEGORY_LOADING: 'category/SET_CATEGORY_LOADING',
  ERROR: 'category/ERROR',
}

export const setCategoryData = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_DATA,
  payload: data,
})

export const setCategoryOrder = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_ORDER,
  payload: data,
})

export const setCategoryLoading = (data: any) => ({
  type: categoryActionType.SET_CATEGORY_LOADING,
  payload: data,
})
