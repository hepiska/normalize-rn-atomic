import { API } from '../action-types'
import AsyncStorage from '@react-native-community/async-storage'
import { clearCart } from '../cart/action'
import Amplitude from 'amplitude-js'

export const authActionType = {
  FETCHNG: 'auth/FETCHNG',
  ERROR: 'auth/ERROR',
  SET_USERNAME_AVAILABLE: 'auth/SET_USER_AVAILABLE',
  SET_LOGIN_SUCCESS: 'auth/SET_LOGIN_SUCCESS',
  SET_LOGOUT_SUCCESS: 'auth/SET_LOGOUT_SUCCESS',
  SET_REGISTER_SUCCESS: 'auth/SET_REGISTER_SUCCESS',
  SET_REF_CODE: 'auth/SET_REF_CODE',
}

const setAuthFetching = (isFetching: boolean) => ({
  type: authActionType.FETCHNG,
  payload: {
    loading: isFetching,
  },
})

export const setRefCode = data => {
  return {
    type: authActionType.SET_REF_CODE,
    payload: data,
  }
}

const setLoginSuccess = (data: any) => {
  AsyncStorage.setItem('token', data.id_token)
  return {
    type: authActionType.SET_LOGIN_SUCCESS,
    payload: {
      data,
      isAuth: true,
    },
  }
}

const setRegisterSuccess = (data: any) => ({
  type: authActionType.SET_REGISTER_SUCCESS,
  payload: data,
})

export const setLogout = () => {
  AsyncStorage.removeItem('token')
  Amplitude.getInstance().setUserId(null) // not string 'null'
  Amplitude.getInstance().regenerateDeviceId()
  return [
    clearCart(),
    {
      type: authActionType.SET_LOGOUT_SUCCESS,
      payload: {
        isAuth: false,
      },
    },
  ]
}

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
      Amplitude.getInstance().setUserId(data.user.id)
      return [setLoginSuccess(data), setRefCode(null)]
    },
    error: err => {
      const error = err.response.data.meta.message
      return setAuthError(error)
    },
  },
})

export const oauthApi = params => ({
  type: API,
  payload: {
    url: '/account/oauth',
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
      Amplitude.getInstance().setUserId(data.user.id)
      return [setLoginSuccess({ ...data, provider: params.provider })]
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
    success: data => {
      Amplitude.getInstance().setUserId(data.user.id)
      return [
        loginApi({ email: params.email, password: params.password }),
        setRegisterSuccess(data),
        setAuthFetching(false),
        setRefCode(null),
      ]
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

export const _authSelector = ({ auth }) => {
  return {
    loading: auth.loading,
    error: auth.error,
    called: auth.called,
    data: auth.data,
    usernameAvalaible: auth.usernameAvalaible,
  }
}
