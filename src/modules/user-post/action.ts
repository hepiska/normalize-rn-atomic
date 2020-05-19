import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getMe } from '@utils/helpers'
import { dispatchPostEntities } from '../entities-action-dispacer'
export const actionType = {
  FETCH: 'user-post/FETCH',
  SET_LOADING: 'user-post/SET_LOADING',
  SET_ERROR: 'user-post/SET_ERROR',
  SET_ORDER: 'user-post/SET_ORDER',
  ADD_ORDER: 'user-post/ADD_ORDER',
}

const setuserPostLoading = data => ({
  type: actionType.SET_LOADING,
  payload: data,
})
const setuserPostError = data => ({ type: actionType.SET_ERROR, payload: data })

const setUserPostOrder = (data, offset) => {
  if (offset) {
    return {
      type: actionType.ADD_ORDER,
      payload: data,
    }
  }
  return {
    type: actionType.SET_ORDER,
    payload: data,
  }
}

export const getUserPosts = (params): any => {
  return {
    type: API,
    payload: {
      url: '/users/' + getMe().id + '/posts',
      schema: [schema.post],
      requestParams: {
        params: params,
      },
      startNetwork: () => setuserPostLoading(true),
      // endNetwork: () => setuserPostLoading(false),
      success: data => {
        return [
          ...dispatchPostEntities(data.entities),
          setUserPostOrder(data.result, params?.offset),
          setuserPostLoading(false),
        ]
      },
    },
  }
}
