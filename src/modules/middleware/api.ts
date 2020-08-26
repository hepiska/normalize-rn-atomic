import { normalize } from 'normalizr'
import { request } from '@utils/services'
import { Alert } from 'react-native'
import { setGlobalError } from '../global/action'

import * as actions from '../action-types'

interface PayloadInterface {
  url: string
  startNetwork?: (label?: any) => void
  label?: string
  error?: (error: Error) => void
  endNetwork?: (status?: string, err?: Error) => void
  schema: any
  requestParams: any
  success: (normalizeData?: any, res?: any) => void
  callback?: (data: any) => void
}

interface ActionType {
  type: string
  payload: PayloadInterface
}

const api = ({ dispatch, getState }) => next => (action: ActionType) => {
  if (action.type !== actions.API) {
    return next(action)
  }

  const {
    url,
    requestParams,
    success,
    schema,
    label,
    error,
    startNetwork,
    endNetwork,
    callback,
  } = action.payload
  if (callback) {
    callback({ loading: true, status: 'pending' })
  }
  if (startNetwork) {
    dispatch(startNetwork(label))
  }
  dispatch(setGlobalError(null))

  return request
    .request({ url, ...requestParams })
    .then(res => {
      let normalizeData = res.data.data
      if (schema && normalizeData) {
        normalizeData = normalize(res.data.data, schema)
      }

      if (success) {
        dispatch(success(normalizeData, res.data))
        if (callback) {
          callback({
            loading: false,
            status: 'success',
            data: normalizeData,
            rawData: res.data,
          })
        }
      }

      if (endNetwork) {
        dispatch(endNetwork('success'))
      }
    })
    .catch(err => {
      if (error) {
        dispatch(error(err))
      } else {
        if (
          requestParams &&
          requestParams.method &&
          requestParams.method !== 'GET'
        ) {
          Alert.alert('Error', err.message)
        } else {
          dispatch(setGlobalError(err))
        }
      }
      if (callback) {
        callback({
          loading: false,
          status: 'error',
          error: err,
        })
      }
      if (endNetwork) {
        dispatch(endNetwork('error', err))
      }
    })
}

export default api
