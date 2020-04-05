import { API } from '../action-types'

export const authActionType = {
  FETCHNG: 'auth/FETCHNG',
  ERROR: 'auth/ERROR',
  SET_USERNAME_AVAILABLE: 'auth/SET_USER_AVAILABLE',
  SET_LOGIN_SUCCESS: 'auth/SET_LOGIN_SUCCESS',
}

const setAuthFetching = (isFetching: boolean) => ({
  type: authActionType.FETCHNG,
  payload: {
    loading: isFetching,
  },
})

const setLoginSuccess = (data: any) => ({
  type: authActionType.SET_LOGIN_SUCCESS,
  payload: {
    data,
    isAuth: true,
  },
})

export const setAuthError = (data: any) => ({
  type: authActionType.ERROR,
  payload: data,
})

export const setUsernameAvailable = (data: any) => ({
  type: authActionType.SET_USERNAME_AVAILABLE,
  payload: data,
})

export const loginApi = params => ({
  type: API,
  payload: {
    url: '/account/login',
    requestParams: {
      method: 'POST',
      data: { ...params },
    },
    startNetwork: () => {
      return setAuthFetching(true)
    },
    endNetwork: () => {
      return setAuthFetching(false)
    },
    success: (data, { pagination }) => {
      return [setLoginSuccess(data)]
    },
    error: err => {
      const error = err.response.data.meta.message
      return setAuthError(error)
    },
  },
})

export const registerApi = params => ({
  type: API,
  payload: {
    url: '/account/register',
    requestParams: {
      method: 'POST',
      data: { ...params },
    },
    startNetwork: () => {
      return setAuthFetching(true)
    },
    endNetwork: () => {
      return setAuthFetching(false)
    },
    success: (data, { pagination }) => {
      return []
    },
    error: err => {
      const error = err.response.data.meta.message
      return setAuthError(error)
    },
  },
})

export const checkUsernameAvailable = username => ({
  type: API,
  payload: {
    url: `/users/username/${username}`,
    startNetwork: () => {
      return setAuthFetching(true)
    },
    endNetwork: () => {
      return setAuthFetching(false)
    },
    success: (data, { pagination }) => {
      const isAvailaible = data ? false : true
      return [setUsernameAvailable(isAvailaible)]
    },
    error: err => {
      const error = err.response
        ? err.response.data.meta.message
        : 'Something went wrong'
      return setAuthError(error)
    },
  },
})
