import { QueryParams } from '@utils/globalInterface'

export const orderActionType = {
  FETCH: 'order/FETCH',
  SET_ORDER_DATA: 'order/SET_ORDER_DATA',
  SET_ORDER_ORDER: 'order/SET_ORDER_ORDER',
  SET_ACTIVE_ORDER: 'order/SET_ACTIVE_ORDER',
  FETCH_START: 'order/FETCH_START',
  SET_ORDER_LOADING: 'order/SET_ORDER_LOADING',
  CLEAR_ORDER: 'order/CLEAR_ORDER',
  ERROR: 'order/ERROR',
  DEFAULT: 'order/DEFAULT',
}

export const fetchOrder = (params: QueryParams) => ({
  type: orderActionType.FETCH,
  payload: params,
})

export const setActiveOrder = (data: any) => ({
  type: orderActionType.SET_ACTIVE_ORDER,
  payload: data,
})

export const setOrderData = (data: any) => {
  if (data) {
    return {
      type: orderActionType.SET_ORDER_DATA,
      payload: data,
    }
  }
  return {
    type: orderActionType.DEFAULT,
    payload: data,
  }
}

export const setOrderOrder = (data: any) => ({
  type: orderActionType.SET_ORDER_ORDER,
  payload: data,
})

export const setOrderLoading = (data: any) => ({
  type: orderActionType.SET_ORDER_LOADING,
  payload: data,
})
