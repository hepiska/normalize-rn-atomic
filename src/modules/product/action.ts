import { QueryParams } from '@utils/globalInterface'
import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
// import persistor from './reducer'
import { API } from '../action-types'

import * as schema from '@modules/normalize-schema'

export const productActionType = {
  FETCH: 'product/FETCH',
  SET_PRODUCT_DATA: 'product/SET_PRODUCT_DATA',
  SET_PRODUCT_ORDER: 'product/SET_PRODUCT_ORDER',
  FETCH_START: 'product/FETCH_START',
  SET_PRODUCT_LOADING: 'product/SET_PRODUCT_LOADING',
  ERROR: 'product/ERROR',
}

export const setProductData = (data: any) => ({
  type: productActionType.SET_PRODUCT_DATA,
  payload: data,
})

export const setProductOrder = (data: any) => ({
  type: productActionType.SET_PRODUCT_ORDER,
  payload: data,
})

export const setProductLoading = (data: any) => ({
  type: productActionType.SET_PRODUCT_LOADING,
  payload: data,
})

export const productApi = (params, url) => ({
  type: API,
  payload: {
    url: url || '/products',
    requestParams: { params },
    schema: [schema.product],
    startNetwork: () => {
      return setProductLoading(true)
    },

    success: (data, { pagination }) => {
      return data
        ? [
            setProductData(data.entities.product),
            setProductOrder({ order: data.result, pagination }),
            setProductLoading(false),
            setBrandData(data.entities.brand),
            setCategoryData(data.entities.category),
          ]
        : [setProductOrder({ order: [], pagination }), setProductLoading(false)]
    },
  },
})
