import { store } from '@src/init-store'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const shippingMethodsActionType = {
  FETCH: 'post/FETCH',
  SET_SHIPPING_METHODS_DATA: 'shipping_methods/SET_SHIPPING_METHODS_DATA',
  SET_SHIPPING_METHODS_ORDER: 'shipping_methods/SET_SHIPPING_METHODS_ORDER',
  FETCH_START: 'shipping_methods/FETCH_START',
  SET_SHIPPING_METHODS_LOADING: 'shipping_methods/SET_SHIPPING_METHODS_LOADING',
  ERROR: 'shipping_methods/ERROR',
  SET_DEFAULT: 'shipping_methods/DEFAULT',
}

export const setShippingMethodsData = (data: any) => {
  if (data) {
    return {
      type: shippingMethodsActionType.SET_SHIPPING_METHODS_DATA,
      payload: data,
    }
  }
  return {
    type: shippingMethodsActionType.SET_DEFAULT,
  }
}

export const setShippingMethodsOrder = (data: any) => ({
  type: shippingMethodsActionType.SET_SHIPPING_METHODS_ORDER,
  payload: data,
})

export const setShippingMethodsLoading = (data: any) => ({
  type: shippingMethodsActionType.SET_SHIPPING_METHODS_LOADING,
  payload: data,
})
