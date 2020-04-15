import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
import { setProductAttributeData } from '@modules/product-attribute/action'
// import persistor from './reducer'
import { API } from '../action-types'

import * as schema from '@modules/normalize-schema'

export const productActionType = {
  FETCH: 'product/FETCH',
  SET_PRODUCT_DATA: 'product/SET_PRODUCT_DATA',
  SET_PRODUCT_ORDER: 'product/SET_PRODUCT_ORDER',
  FETCH_START: 'product/FETCH_START',
  ClEAR_PRODUCT: 'product/ClEAR_PRODUCT',
  SET_PRODUCTS_LOADING: 'product/SET_PRODUCTS_LOADING',
  CHANGE_VALUE: 'product/CHANGE_VALUE',
  SET_DEFAULT: 'product/SET_DEFAULT',
  ERROR: 'product/ERROR',
}

export const setProductData = (data: any) => {
  if (data) {
    return {
      type: productActionType.SET_PRODUCT_DATA,
      payload: data,
    }
  }
  return {
    type: productActionType.SET_DEFAULT,
  }
}

export const setProductOrder = (data: any) => ({
  type: productActionType.SET_PRODUCT_ORDER,
  payload: data,
})

export const clearProduct = (data: any) => ({
  type: productActionType.ClEAR_PRODUCT,
  payload: data,
})

const changeValue = (data = { key: 'productLoading', value: false }) => ({
  type: productActionType.CHANGE_VALUE,
  payload: data,
})
export const setProductsLoading = (data: any) => ({
  type: productActionType.SET_PRODUCTS_LOADING,
  payload: data,
})

export const getProductById = id => ({
  type: API,
  payload: {
    url: '/products/' + id,
    schema: schema.product,
    startNetwork: () => changeValue({ key: 'productLoading', value: true }),
    success: data => [
      setBrandData(data.entities.brand),
      setCategoryData(data.entities.category),
      setProductData(data.entities.product),
      setProductAttributeData(data.entities.attribute),
      changeValue({ key: 'productLoading', value: false }),
    ],
  },
})

export const productApi = (params, url) => ({
  type: API,
  payload: {
    url: url || '/products',
    requestParams: { params },
    schema: [schema.product],
    startNetwork: () => {
      return setProductsLoading(true)
    },

    success: (data, { pagination }) => {
      return data
        ? [
            setBrandData(data.entities.brand),
            setCategoryData(data.entities.category),
            setProductData(data.entities.product),
            setProductAttributeData(data.entities.attribute),
            setProductOrder({ order: data.result, pagination }),
            setProductsLoading(false),
          ]
        : [
            setProductOrder({ order: [], pagination }),
            setProductsLoading(false),
          ]
    },
  },
})
