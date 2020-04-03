import { normalize } from 'normalizr'
import { request } from '@utils/services'

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
      dispatch(endNetwork(label))
    })
    .catch(err => {
      if (error) {
        dispatch(error(err))
      }
    })
}

export default api
