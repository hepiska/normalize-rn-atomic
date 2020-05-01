import { QueryParams } from '@utils/globalInterface'
import { order } from '../normalize-schema'
import { API } from '../action-types'
import { store } from '@src/init-store'
import { setProductData } from '../product/action'
import { setBrandData } from '../brand/action'
import { setProductAttributeData } from '../product-attribute/action'
import { setCategoryData } from '../category/action'
import { setUserData } from '../user/action'
import { getMe } from '@utils/helpers'

export const orderActionType = {
  FETCH: 'order/FETCH',
  SET_ORDER_DATA: 'order/SET_ORDER_DATA',
  SET_ORDER_ORDER: 'order/SET_ORDER_ORDER',
  SET_ORDER_ORDER_PAGINATION: 'order/SET_ORDER_ORDER_PAGINATION',
  SET_ACTIVE_ORDER: 'order/SET_ACTIVE_ORDER',
  FETCH_START: 'order/FETCH_START',
  CHANGE_SEARCH_KEY: 'order/CHANGE_SEARCH_KEY',
  CHANGE_SELECTED_FILTER: 'order/CHANGE_SELECTED_FILTER',
  SET_ORDER_LOADING: 'order/SET_ORDER_LOADING',
  CLEAR_ORDER: 'order/CLEAR_ORDER',
  ERROR: 'order/ERROR',
  DEFAULT: 'order/DEFAULT',
}

export const changeSearchKey = key => ({
  type: orderActionType.CHANGE_SEARCH_KEY,
  payload: key,
})

export const changeFilter = filter => ({
  type: orderActionType.CHANGE_SELECTED_FILTER,
  payload: filter,
})

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

export const setOrderOrderPage = (data: any) => ({
  type: orderActionType.SET_ORDER_ORDER_PAGINATION,
  payload: data,
})

export const setOrderLoading = (data: any) => ({
  type: orderActionType.SET_ORDER_LOADING,
  payload: data,
})

export const getAllOrder = params => {
  return {
    type: API,
    payload: {
      url: 'users/' + getMe().id + '/orders/',
      requestParams: { params },
      schema: [order],
      startNetwork: () => setOrderLoading(true),
      success: (data, { pagination }) => {
        if (params.offset === 0) {
          return [
            setProductData(data.entities.product),
            setBrandData(data.entities.brand),
            setCategoryData(data.entities.category),
            setUserData(data.entities.user),
            setOrderData(data.entities.order),
            setOrderOrder(data.result),
            setOrderLoading(false),
          ]
        }

        if (data && data.result.length) {
          return [
            setProductData(data.entities.product),
            setBrandData(data.entities.brand),
            setCategoryData(data.entities.category),
            setUserData(data.entities.user),
            setOrderData(data.entities.order),
            setOrderOrderPage({ order: data.result, pagination }),
            setOrderLoading(false),
          ]
        }

        return [setOrderLoading(false)]
      },
      error: err => {
        return [setOrderLoading(false)]
      },
    },
  }
}

export const getOrderById = order_id => ({
  type: API,
  payload: {
    url: 'users/' + getMe().id + '/orders/' + order_id,
    schema: order,
    startNetwork: () => {
      return setOrderLoading(true)
    },
    endNetwork: (status, error) => {
      if (status === 'error') {
        return [setOrderLoading(true)]
      }
      return setOrderLoading(true)
    },
    success: data => {
      return [
        setProductAttributeData(data.entities.attribute),
        setProductData(data.entities.product),
        setBrandData(data.entities.brand),
        setCategoryData(data.entities.category),
        setUserData(data.entities.user),
        setOrderData(data.entities.order),
        setOrderLoading(false),
      ]
    },
  },
})
