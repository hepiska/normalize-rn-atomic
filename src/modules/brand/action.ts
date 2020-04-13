import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import { setCategoryData } from '../category/action'

import * as schema from '@modules/normalize-schema'

export const brandActionType = {
  SET_BRAND_DATA: 'brand/SET_BRAND_DATA',
  SET_BRAND_ORDER: 'brand/SET_BRAND_ORDER',
  FETCH_START: 'brand/FETCH_START',
  SET_BRAND_LOADING: 'brand/SET_BRAND_LOADING',
  CHANGE_SEARCH: 'brand/CHANGE_SEARCH',
  CLEAR_SEARCH: 'brand/CLEAR_SEARCH',
  RESET_BRAND: 'brand/RESET_BRAND',
  SET_ACTIVE_BRAND: 'brand/SET_ACTIVE',
  ERROR: 'brand/ERROR',
  DEFAULT: 'brand/DEFAULT',
}

export const setBrandData = (data: any) => {
  if (data) {
    return {
      type: brandActionType.SET_BRAND_DATA,
      payload: data,
    }
  }
  return {
    type: brandActionType.DEFAULT,
  }
}

export const setActiveBrand = data => ({
  type: brandActionType.SET_ACTIVE_BRAND,
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

export const changeSearch = (data: string) => ({
  type: brandActionType.CHANGE_SEARCH,
  payload: data,
})

export const clearSearch = () => ({
  type: brandActionType.CLEAR_SEARCH,
})

export const resetBrand = () => ({
  type: brandActionType.RESET_BRAND,
})

export const getBrand = id => ({
  type: API,
  payload: {
    url: '/brands/' + id,
    schema: schema.brandFull,
    startNetwork: () => {
      return setBrandLoading(true)
    },
    success: data => {
      return [
        setCategoryData(data.entities.category),
        setBrandData(data.entities.brand),
        setActiveBrand(data.result),
        setBrandLoading(false),
      ]
    },
  },
})

export const brandApi = (params, url) => ({
  type: API,
  payload: {
    url: url || '/brands',
    requestParams: { params },
    schema: [schema.brand],
    startNetwork: () => {
      return setBrandLoading(true)
    },
    success: (data, { pagination }) => {
      return data
        ? [
            setBrandData(data.entities.brand),
            setBrandOrder({ order: data.result, pagination }),
            setBrandLoading(false),
          ]
        : [setBrandOrder({ order: [], pagination }), setBrandLoading(false)]
    },
  },
})
