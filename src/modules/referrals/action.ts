import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { setUserData } from '../user/action'
import dayjs from 'dayjs'

export const ActionType = {
  SET_LOADING: 'referrrals/SET_LOADING',
  SET_ERROR: 'referrrals/SET_ERROR',
  SET_DATA: 'referrrals/SET_DATA',
  SET_ORDER: 'referrrals/SET_ORDER',
  ADD_ORDER: 'referrrals/ADD_ORDER',
  SET_NEW_COUNT: 'referrrals/SET_NEW_COUNT',
  SET_NEW_ORDER: 'referrrals/SET_NEW_ORDER',
  SET_PAGINATION: 'referrrals/SET_PAGINATION',
}

const setLoading = data => ({
  type: ActionType.SET_LOADING,
  payload: data,
})

const setPagination = data => ({
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

const setnewCount = data => {
  return {
    type: ActionType.SET_NEW_COUNT,
    payload: data,
  }
}

const setOrder = data => ({ type: ActionType.SET_ORDER, payload: data })
const setNewOrder = data => ({ type: ActionType.SET_NEW_ORDER, payload: data })

const addOrder = data => ({ type: ActionType.ADD_ORDER, payload: data })

export const referralsUser = params => {
  return {
    type: API,
    payload: {
      url: 'account/referrals',
      schema: [schema.user],
      requestParams: { params },
      startNetwork: () => [setLoading(true)],
      endNetwork: () => [setLoading(false)],
      success: (data, res) => {
        const dispatch = [
          setUserData(data.entities.user),
          setPagination(res.pagination),
        ]
        if (params.offset > 0 && !data.result.length) {
          return setLoading(false)
        }
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

export const newReferal = () => {
  const start_at = dayjs()
    .startOf('day')
    .toISOString()
  const end_at = dayjs().toISOString()
  console.log(start_at, end_at)
  return {
    type: API,
    payload: {
      url: 'account/referrals',
      requestParams: { params: { skip: 0, limit: 5 } },
      schema: [schema.user],
      startNetwork: () => [setLoading(true)],
      endNetwork: () => [setLoading(false)],
      success: (data, { pagination }) => {
        if (!data.result) {
          return setLoading(false)
        }

        const dispatch = [
          setUserData(data.entities.user),
          setNewOrder(data.result),
          setnewCount(pagination.total),
        ]
        return dispatch
      },
    },
  }
}
