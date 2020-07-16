import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const ActionType = {
  SET_LOADING: 'coupons/SET_LOADING',
  SET_ERROR: 'coupons/SET_ERROR',
  SET_DATA: 'coupons/SET_DATA',
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
