import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const userActionType = {
  FETCH: 'post/FETCH',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SET_USERNAME_AVAILABLE: 'use/SET_USER_AVAILABLE',
  SET_USER_ORDER: 'user/SET_USER_ORDER',
  FETCH_START: 'user/FETCH_START',
  FETCH_FINISH: 'user/FETCH_FINISH',
  SET_USER_LOADING: 'user/SET_USER_LOADING',
  ERROR: 'user/ERROR',
}

export const setUserData = (data: any) => ({
  type: userActionType.SET_USER_DATA,
  payload: data,
})

export const fetchUserStart = () => ({
  type: userActionType.FETCH_START,
})

export const fetchUserFinish = () => ({
  type: userActionType.FETCH_FINISH,
})

export const setUserError = (data: any) => ({
  type: userActionType.ERROR,
  payload: data,
})

export const setUsernameAvailable = (data: any) => ({
  type: userActionType.SET_USERNAME_AVAILABLE,
  payload: data,
})

export const checkUsernameAvailable = (username, url) => ({
  type: API,
  payload: {
    url: `/users/username/${username}`,
    startNetwork: () => {
      return fetchUserStart()
    },
    success: (data, { pagination }) => {
      const isAvailaible = data ? false : true
      return [setUsernameAvailable(isAvailaible), fetchUserFinish()]
    },
    error: err => {
      const error = err.response
        ? err.response.data.meta.message
        : 'Something went wrong'
      return setUserError(error)
    },
  },
})
