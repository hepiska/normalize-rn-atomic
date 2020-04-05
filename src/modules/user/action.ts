import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const userActionType = {
  FETCH: 'post/FETCH',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SET_USER_ORDER: 'user/SET_USER_ORDER',
  FETCH_START: 'user/FETCH_START',
  FETCH_FINISH: 'user/FETCH_FINISH',
  SET_USER_LOADING: 'user/SET_USER_LOADING',
  ERROR: 'user/ERROR',
}

export const setUserData = (data: any) => {
  if (data) {
    return {
      type: userActionType.SET_USER_DATA,
      payload: data,
    }
  }
}

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
