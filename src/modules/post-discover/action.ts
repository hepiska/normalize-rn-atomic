import { dispatchPostEntities } from '../entities-action-dispacer'
import { API } from '../action-types'
import * as schema from '../normalize-schema'

export const actionType = {
  FETCH: 'post-discover/FETCH',
  SET_DISCOVER_ORDER: 'post-discover/SET_ORDER',
  FETCH_START: 'post-discover/FETCH_START',
  SET_DISCOVER_LOADING: 'post-discover/SET_USER_LOADING',
  CLEAR_DISCOVER: 'post-discover/CLEAR_POST',
  SET_PAGINATION: 'post-discover/SET_PAGINATION',
  ADD_DISCOVER_ORDER: 'post-discover/ADD_ORDER',
  ERROR: 'post-discover/ERROR',
  DEFAULT: 'post-discover/DEFAULT',
}

export const setDicoverOrder = (data: any) => ({
  type: actionType.SET_DISCOVER_ORDER,
  payload: data,
})

const setPagination = (data: any) => ({
  type: actionType.SET_PAGINATION,
  payload: data,
})

export const addDicoverOrder = (data: any) => ({
  type: actionType.ADD_DISCOVER_ORDER,
  payload: data,
})

export const setDicoverLoading = (data: any) => ({
  type: actionType.SET_DISCOVER_LOADING,
  payload: data,
})

export const fetchDicover = (params: any = {}) => {
  const url = '/posts/v2'

  return {
    type: API,
    payload: {
      url,
      schema: [schema.post],
      requestParams: { params },
      startNetwork: () => {
        return setDicoverLoading(true)
      },
      endNetwork: () => {
        return setDicoverLoading(false)
      },
      success: (data, { pagination }) => {
        const composeAction = [
          ...dispatchPostEntities(data.entities),
          setPagination(pagination),
        ]
        if (!params.offset) {
          composeAction.push(setDicoverOrder(data.result))
        } else {
          composeAction.push(addDicoverOrder(data.result))
        }
        return composeAction
      },
    },
  }
}
