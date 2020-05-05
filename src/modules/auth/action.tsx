import { API } from '../action-types'
import AsyncStorage from '@react-native-community/async-storage'

export const authActionType = {
  FETCHNG: 'auth/FETCHNG',
  ERROR: 'auth/ERROR',
  SET_USERNAME_AVAILABLE: 'auth/SET_USER_AVAILABLE',
  SET_LOGIN_SUCCESS: 'auth/SET_LOGIN_SUCCESS',
  SET_LOGOUT_SUCCESS: 'auth/SET_LOGOUT_SUCCESS',
  SET_REGISTER_SUCCESS: 'auth/SET_REGISTER_SUCCESS',
}

const setAuthFetching = (isFetching: boolean) => ({
  type: authActionType.FETCHNG,
  payload: {
    loading: isFetching,
  },
})

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
  console.log('masuk setlogout')
  return {
    type: authActionType.SET_LOGOUT_SUCCESS,
    payload: {
      isAuth: false,
    },
  }
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
    success: data => {
      return [
        loginApi({ email: params.email, password: params.password }),
        setRegisterSuccess(data),
        setAuthFetching(false),
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

export const _authSelector = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  called: auth.called,
  data: auth.data,
  usernameAvalaible: auth.usernameAvalaible,
})
