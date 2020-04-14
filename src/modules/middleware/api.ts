import { normalize } from 'normalizr'
import { request } from '@utils/services'
import { setGlobalError } from '../global/action'

import * as actions from '../action-types'

const api = ({ dispatch, getState }) => next => action => {
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
  } = action.payload

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
      }

      if (endNetwork) {
        dispatch(endNetwork('success'))
      }
    })
    .catch(err => {
      if (error) {
        dispatch(error(err))
      } else {
        dispatch(setGlobalError(err))
      }
      if (endNetwork) {
        dispatch(endNetwork('error', err))
      }
    })
}

export default api
