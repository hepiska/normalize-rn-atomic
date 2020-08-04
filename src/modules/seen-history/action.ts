import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getMe } from '@utils/helpers'
import { request } from '@utils/services'

export const ActionType = {
  SET_LOADING: 'coupons/SET_LOADING',
  SET_ERROR: 'coupons/SET_ERROR',
  SET_DATA: 'coupons/SET_DATA',
  ADD_PRODUCT: 'coupons/ADD_PRODUCT',
  SET_ORDER: 'coupons/SET_ORDER',
  ADD_ORDER: 'coupons/ADD_ORDER',
}

const setLoading = data => ({
  type: ActionType.SET_LOADING,
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

const setOrder = data => ({ type: ActionType.SET_ORDER })
const addOrder = data => ({ type: ActionType.ADD_ORDER })

export const addProduct = data => {
  return {
    type: ActionType.ADD_PRODUCT,
    payload: data,
  }
}

export const sendSeenData = data => {
  const me = getMe().id
  return request({
    url: '/users/' + me + '/history/products',
    data,
    method: 'PUT',
  })
}
