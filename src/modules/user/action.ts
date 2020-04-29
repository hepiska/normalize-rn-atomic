import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const userActionType = {
  FETCH: 'post/FETCH',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SET_USER_ORDER: 'user/SET_USER_ORDER',
  FETCH_START: 'user/FETCH_START',
  SET_USER_LOADING: 'user/SET_USER_LOADING',
  ERROR: 'user/ERROR',
  DEFAULT: 'user/DEFAULT',
}

export const setUserData = (data: any) => {
  if (data) {
    return {
      type: userActionType.SET_USER_DATA,
      payload: data,
    }
  }
  return {
    type: userActionType.DEFAULT,
    payload: data,
  }
}

export const setUserOrder = (data: any) => ({
  type: userActionType.SET_USER_ORDER,
  payload: data,
})
export const setUserLoading = (data: Boolean) => ({
  type: userActionType.SET_USER_LOADING,
  payload: data,
})

export const getUserByUsername = username => {
  return {
    type: API,
    payload: {
      url: `/users/${username}`,
      schema: schema.user,
      requestParams: {
        params: {
          id_type: 'username',
        },
      },
      startNetwork: () => {
        return setUserLoading(true)
      },
      endNetwork: () => {
        return setUserLoading(false)
      },
      success: data => {
        return [
          setUserData(data.entities.user),
          setUserOrder(data.result),
          setUserLoading(false),
        ]
      },
      error: err => {
        return setUserLoading(false)
      },
    },
  }
}
