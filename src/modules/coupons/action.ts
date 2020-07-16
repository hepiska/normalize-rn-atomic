import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const ActionType = {
  SET_LOADING: 'coupons/SET_LOADING',
  SET_ERROR: 'coupons/SET_ERROR',
  SET_DATA: 'coupons/SET_DATA',
  SET_ORDER: 'coupons/SET_ORDER',
  ADD_ORDER: 'coupons/ADD_ORDER',
  SET_PAGINATION: 'coupons/SET_PAGINATION',
}

const setLoading = data => ({
  type: ActionType.SET_LOADING,
  payload: data,
})

const setPagination = (data: any) => ({
  type: ActionType.SET_PAGINATION,
  payload: data,
})

const setError = data => ({
  type: ActionType.SET_ERROR,
  payload: data,
})

const setData = data => ({
  type: ActionType.SET_DATA,
  payload: data,
})

const setOrder = data => ({ type: ActionType.SET_ORDER, payload: data })
const addOrder = data => ({ type: ActionType.ADD_ORDER, payload: data })

export const getUserCoupons = params => {
  return {
    type: API,
    payload: {
      url: '/account/coupons',
      requestParams: { params },
      schema: [schema.coupon],
      startNetwork: () => [setLoading(true), setError(null)],
      endNetwork: () => setLoading(false),
      success: (data, { pagination }) => {
        const dispatch = [
          setData(data.entities.coupon),
          setPagination(pagination),
        ]

        if (params.offset > 0) {
          dispatch.push(addOrder(data.result))
          return dispatch
        } else {
          dispatch.push(setOrder(data.result))
          return dispatch
        }
      },
    },
  }
}

export const getAvailiableCoupons = params => {
  return {
    type: API,
    payload: {
      url: '/coupons/available',
      requestParams: { params },
      schema: [schema.coupon],
      startNetwork: () => [setLoading(true), setError(null)],
      endNetwork: () => setLoading(false),
      success: (data, { pagination }) => {
        const dispatch = [
          setData(data.entities.coupon),
          setPagination({ total: data.result.length }),
        ]

        if (params.offset > 0) {
          dispatch.push(addOrder(data.result))
          return dispatch
        } else {
          dispatch.push(setOrder(data.result))
          return dispatch
        }
      },
    },
  }
}
