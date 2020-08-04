import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { ExternalStorageDirectoryPath } from 'react-native-fs'

export const ActionType = {
  SET_LOADING: 'coupons/SET_LOADING',
  SET_ERROR: 'coupons/SET_ERROR',
  SET_DATA: 'coupons/SET_DATA',
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

export const getAppConfig = () => {
  return {
    type: API,
    payload: {
      url: '/app',
      startNetwork: () => {
        return [setLoading(true)]
      },
      endNetwork: () => {
        return setLoading(false)
      },
      success: (data, {}) => {
        return [setData(data)]
      },
    },
  }
}
