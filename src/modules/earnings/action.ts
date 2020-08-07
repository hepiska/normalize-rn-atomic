import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { normalize } from 'normalizr'
import { getMe } from '@src/utils/helpers'

export const ActionType = {
  SET_LOADINGS: 'earning/SET_LOADING',
  SET_ERROR: 'earning/SET_ERROR',
  SET_DATA: 'earning/SET_DATA',
  SET_ORDER: 'earning/SET_ORDER',
  ADD_ORDER: 'earning/ADD_ORDER',
  SET_SUMMARY: 'earning/SET_SUMMARY',
  SET_PENDING_SUMMARY: 'earning/SET_PENDING_SUMMARY',
  SET_PENDING_ORDER: 'earning/SET_PENDING_ORDER',
  ADD_PENDING_ORDER: 'earning/ADD_PENDING_ORDER',
  SET_PAGINATION: 'earning/SET_PAGINATION',
  SET_PENDING_PAGINATION: 'earning/SET_PENDING_PAGINATION',
}

const setLoading = data => ({
  type: ActionType.SET_LOADINGS,
  payload: data,
})

const setSummary = data => ({
  type: ActionType.SET_SUMMARY,
  payload: data,
})

const setPendingSummary = data => ({
  type: ActionType.SET_PENDING_SUMMARY,
  payload: data,
})

const setError = data => ({
  type: ActionType.SET_ERROR,
  payload: data,
})

const setPagination = data => ({
  type: ActionType.SET_PAGINATION,
  payload: data,
})

const setPendingPagination = data => ({
  type: ActionType.SET_PENDING_PAGINATION,
  payload: data,
})

const setData = data => ({
  type: ActionType.SET_DATA,
  payload: data,
})

const setOrder = data => ({ type: ActionType.SET_ORDER, payload: data })
const addOrder = data => ({ type: ActionType.ADD_ORDER, payload: data })

const setPendingOrder = data => ({
  type: ActionType.SET_PENDING_ORDER,
  payload: data,
})
const addPendingOrder = data => ({
  type: ActionType.ADD_PENDING_ORDER,
  payload: data,
})

export const getEarningHistory = params => {
  const meId = getMe().id
  return {
    type: API,
    payload: {
      url: '/users/' + meId + '/earnings',
      startNetwork: () => setLoading({ type: 'general', value: true }),
      endNetwork: () => setLoading({ type: 'general', value: false }),
      success: (data, { pagination }) => {
        const normData = normalize(data.histories, [schema.earning])
        const dispacers = [
          setSummary(data.summary),
          setData(normData.entities.earning),
          setPagination(pagination),
          setLoading({ type: 'general', value: false }),
        ]

        if (!normData.result.length) {
          return setLoading(false)
        }

        if (params.offset > 0) {
          dispacers.push(addOrder(normData.result))
          return dispacers
        } else {
          dispacers.push(setOrder(normData.result))
          return dispacers
        }
      },
    },
  }
}

export const getPendingHistory = params => {
  const meId = getMe().id
  return {
    type: API,
    payload: {
      url: '/users/' + meId + '/earnings/pending',
      startNetwork: () => setLoading({ type: 'pending', value: true }),
      endNetwork: () => setLoading({ type: 'pending', value: false }),
      success: (data, { pagination }) => {
        const normData = normalize(data.histories, [schema.earning])
        const dispacers = [
          setPendingSummary(data.summary),
          setData(normData.entities.earning),
          setPendingPagination(pagination),
          setLoading({ type: 'pending', value: false }),
        ]

        if (!normData.result.length) {
          return setLoading(false)
        }

        if (params.offset > 0) {
          dispacers.push(addPendingOrder(normData.result))
          return dispacers
        } else {
          dispacers.push(setPendingOrder(normData.result))
          return dispacers
        }
      },
    },
  }
}
