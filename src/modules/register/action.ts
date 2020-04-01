import { API } from '../action-types'

export const registerActionType = {
  SET_REGISTER_DATA: 'register/SET_REGISTER_DATA',
  FETCH_START: 'register/FETCH_START',
  SET_REGISTER_LOADING: 'register/SET_REGISTER_LOADING',
  ERROR: 'register/ERROR',
}

export const setRegisterData = (data: any) => {
  return {
    type: registerActionType.SET_REGISTER_DATA,
    payload: data,
  }
}

export const setRegisterLoading = (data: any) => ({
  type: registerActionType.SET_REGISTER_LOADING,
  payload: data,
})

export const setRegisterError = (data: any) => ({
  type: registerActionType.ERROR,
  payload: data,
})

export const registerApi = (params, url) => ({
  type: API,
  payload: {
    url: '/account/register',
    requestParams: {
      method: 'POST',
      data: { ...params },
    },

    startNetwork: () => {
      return setRegisterLoading(true)
    },
    success: (data, { pagination }) => {
      console.log('====', data)
      return [setRegisterLoading(false)]
    },
    error: err => {
      const error = err.response.data.meta.message
      return setRegisterError(error)
    },
  },
})
