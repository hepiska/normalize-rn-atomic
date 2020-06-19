import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
import { setProductAttributeData } from '@modules/product-attribute/action'
// import persistor from './reducer'
import { dispatchProductEntities } from '@modules/entities-action-dispacer'
import { API } from '../action-types'

import * as schema from '@modules/normalize-schema'

export const productActionType = {
  FETCH: 'product/FETCH',
  SET_PRODUCT_DATA: 'product/SET_PRODUCT_DATA',
  SET_PRODUCT_ORDER: 'product/SET_PRODUCT_ORDER',
  SET_PRODUCT_SEARCH_ORDER: 'product/SET_PRODUCT_SEARCH_ORDER',
  FETCH_START: 'product/FETCH_START',
  ClEAR_PRODUCT: 'product/ClEAR_PRODUCT',
  CLEAR_PRODUCT_SEARCH: 'product/CLEAR_PRODUCT_SEARCH',
  SET_PRODUCTS_LOADING: 'product/SET_PRODUCTS_LOADING',
  CHANGE_VALUE: 'product/CHANGE_VALUE',
  SET_DEFAULT: 'product/SET_DEFAULT',
  SET_SPECIFIC_LOADING: 'product/SET_SPECIFIC_LOADING',
  SET_TRENDING_ORDER: 'product/SET_TRENDING_ORDER',
  SET_SPECIFIC_ORDER: 'product/SET_SPECIFIC_ORDER',
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

const setTrendingOrder = data => {
  return {
    type: productActionType.SET_TRENDING_ORDER,
    payload: data,
  }
}

const setSpecificLoading = data => {
  return {
    type: productActionType.SET_SPECIFIC_LOADING,
    payload: data,
  }
}

const setSepcificOrder = data => {
  return {
    type: productActionType.SET_SPECIFIC_ORDER,
    payload: data,
  }
}

export const setProductOrder = (data: any) => ({
  type: productActionType.SET_PRODUCT_ORDER,
  payload: data,
})

export const setProductSearchOrder = (data: any) => ({
  type: productActionType.SET_PRODUCT_SEARCH_ORDER,
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

export const productSearchApi = (params, url) => ({
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
            // setProductAttributeData(data.entities.attribute),
            setProductSearchOrder({ search: data.result, pagination }),
            setProductsLoading(false),
          ]
        : [
            setProductSearchOrder({ search: [], pagination }),
            setProductsLoading(false),
          ]
    },
  },
})

export const getTrendingProduct = params => {
  return {
    type: API,
    payload: {
      url: '/products/trending',
      requestParams: { params },
      schema: [schema.product],
      startNetwork: () => {
        return setSpecificLoading({ uri: 'trending', value: false })
      },

      success: (data, { pagination }) => {
        return data
          ? [
              ...dispatchProductEntities(data.entities),
              setSepcificOrder({
                uri: 'trending',
                value: data.result,
              }),
              setSpecificLoading({ uri: 'trending', value: false }),
            ]
          : [setSpecificLoading({ uri: 'trending', value: false })]
      },
    },
  }
}

export const clearProductSearch = () => ({
  type: productActionType.CLEAR_PRODUCT_SEARCH,
})
