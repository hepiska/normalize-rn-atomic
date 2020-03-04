import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'

export const brandActionType = {
  SET_BRAND_DATA: 'brand/SET_BRAND_DATA',
  SET_BRAND_ORDER: 'brand/SET_BRAND_ORDER',
  FETCH_START: 'brand/FETCH_START',
  SET_BRAND_LOADING: 'brand/SET_BRAND_LOADING',
  ERROR: 'brand/ERROR',
}

export const setBrandData = (data: any) => ({
  type: brandActionType.SET_BRAND_DATA,
  payload: data,
})

export const setBrandOrder = (data: any) => ({
  type: brandActionType.SET_BRAND_ORDER,
  payload: data,
})

export const setBrandLoading = (data: any) => ({
  type: brandActionType.SET_BRAND_LOADING,
  payload: data,
})
