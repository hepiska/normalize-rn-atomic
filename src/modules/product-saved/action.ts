import { store } from '@src/init-store'
import * as schema from '@modules/normalize-schema'
import { API } from '../action-types'
import { setProductData } from '../product/action'
import { setBrandData } from '../brand/action'
import { setCategoryData } from '../category/action'

const getMe = () => {
  if (store) return store.getState().auth.data.user || {}
  return {}
}

export const productSavedActionType = {
  CLEAR: 'productSaved/CLEAR',
  SET_ORDER_DATA: 'productSaved/SET_ORDER_DATA',
  SET_LOADING: 'productSaved/SET_LOADING',
  ADD_SAVED_PRODUCT: 'productSaved/ADD_SAVED_PRODUCT',
  DELETE_SAVED_PRODUCT: 'productSaved/DELETE_SAVED_PRODUCT',
}

export const productSavedSetLoading = data => ({
  type: productSavedActionType.SET_LOADING,
  payload: data,
})

export const productSavedDeleteSaved = productId => ({
  type: productSavedActionType.DELETE_SAVED_PRODUCT,
  payload: productId,
})

export const productSavedAddSaved = productId => ({
  type: productSavedActionType.ADD_SAVED_PRODUCT,
  payload: productId,
})

// in this we need array repesett as object so it will easy to find
export const productSavedSetOrderData = data => {
  return {
    type: productSavedActionType.SET_ORDER_DATA,
    payload: data,
  }
}

export const productSavedClear = () => ({
  type: productSavedActionType.CLEAR,
})

export const getProductSaved = () => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/saved',
    schema: [schema.product],
    startNetwork: () => productSavedSetLoading(true),
    success: data => {
      return [
        setProductData(data.entities.product),
        setCategoryData(data.entities.category),
        setBrandData(data.entities.brand),
        productSavedSetOrderData(data.result),
        productSavedSetLoading(false),
      ]
    },
    error: () => {
      return [productSavedSetLoading(false)]
    },
  },
})

export const addProductSaved = productId => {
  return {
    type: API,
    payload: {
      url: '/users/' + getMe().id + '/saved',
      requestParams: {
        method: 'POST',
        data: { product_id: productId },
      },
      startNetwork: () => productSavedSetLoading(true),
      success: () => [
        productSavedAddSaved(productId),
        productSavedSetLoading(false),
      ],
      error: () => {
        return [productSavedSetLoading(false)]
      },
    },
  }
}

export const deleteProductSaved = productId => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/saved',
    requestParams: {
      method: 'DELETE',
      data: { product_id: productId },
    },
    startNetwork: () => productSavedSetLoading(true),
    success: () => [
      productSavedDeleteSaved(productId),
      productSavedSetLoading(false),
    ],
    error: () => {
      return [productSavedSetLoading(false)]
    },
  },
})
