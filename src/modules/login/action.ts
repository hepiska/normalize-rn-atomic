import { API } from '../action-types'

export const loginActionType = {
  SET_REGISTER_DATA: 'login/SET_REGISTER_DATA',
  FETCH_START: 'login/FETCH_START',
  SET_REGISTER_LOADING: 'login/SET_REGISTER_LOADING',
  ERROR: 'login/ERROR',
}

export const setLoginData = (data: any) => ({
  type: loginActionType.SET_REGISTER_DATA,
  payload: data,
})

export const setLoginLoading = (data: any) => ({
  type: loginActionType.SET_REGISTER_LOADING,
  payload: data,
})

export const setLoginError = (data: any) => ({
  type: loginActionType.ERROR,
  payload: data,
})

export const loginApi = (params, url) => ({
  type: API,
  payload: {
    url: '/account/login',
    requestParams: {
      method: 'POST',
      data: { ...params },
    },

    startNetwork: () => {
      return setLoginLoading(true)
    },
    success: (data, { pagination }) => {
      return [setLoginLoading(false)]
    },
    error: err => {
      const error = err.response.data.meta.message
      return setLoginError(error)
    },
  },
})
