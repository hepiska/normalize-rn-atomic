import { store } from '@src/init-store'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

const getMe = () => {
  if (store) return store.getState().auth.data.user || {}
  return {}
}

export const addressActionType = {
  FETCH: 'post/FETCH',
  SET_ADDRESS_DATA: 'address/SET_ADDRESS_DATA',
  SET_ADDRESS_ORDER: 'address/SET_ADDRESS_ORDER',
  FETCH_START: 'address/FETCH_START',
  SET_ACTIVE_ADDRESS: 'address/SET_ACTIVE_ADDRESS',
  SET_ADDRESS_LOADING: 'address/SET_ADDRESS_LOADING',
  ERROR: 'address/ERROR',
  SET_DEFAULT: 'address/DEFAULT',
}

export const setAddressData = (data: any) => {
  if (data) {
    return {
      type: addressActionType.SET_ADDRESS_DATA,
      payload: data,
    }
  }
  return {
    type: addressActionType.SET_DEFAULT,
  }
}

export const setAddressOrder = (data: any) => ({
  type: addressActionType.SET_ADDRESS_ORDER,
  payload: data,
})

export const setActiveAddress = (data: any) => ({
  type: addressActionType.SET_ACTIVE_ADDRESS,
  payload: data,
})

export const setAddressError = (error: any) => ({
  type: addressActionType.ERROR,
  payload: error,
})

export const setAddressLoading = (data: any) => ({
  type: addressActionType.SET_ADDRESS_LOADING,
  payload: data,
})

export const getUserAddressById = () => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/addresses',
    schema: [schema.address],
    startNetwork: () => {
      return setAddressLoading(true)
    },
    success: data => {
      return [
        setAddressData(data.entities.address),
        setAddressOrder(data.result),
        setAddressLoading(false),
      ]
    },
  },
})

export const getOneUserAddressById = addressId => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/addresses/' + addressId,
    schema: [schema.address],
    startNetwork: () => {
      return setAddressLoading(true)
    },
    success: data => {
      return [
        setAddressData(data.entities.address),
        setActiveAddress(data.result),
        setAddressLoading(false),
      ]
    },
  },
})

export const addNewAddress = data => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/addresses',
    requestParams: {
      method: 'POST',
      data,
    },
    startNetwork: () => setAddressLoading(true),
    success: () => [setAddressLoading(false), getUserAddressById()],
    error: error => [setAddressError(error), setAddressLoading(true)],
  },
})

export const editAddress = (addressID, data) => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/addresses/' + addressID,
    requestParams: {
      method: 'PUT',
      data,
    },
    startNetwork: () => setAddressLoading(true),
    success: () => [setAddressLoading(false), getUserAddressById()],
    error: error => [setAddressError(error)],
  },
})

export const removeAddress = (addressID, data) => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/addresses/' + addressID,
    requestParams: {
      method: 'DELETE',
      data,
    },
    startNetwork: () => setAddressLoading(true),
    success: () => [setAddressLoading(false), getUserAddressById()],
    error: error => [setAddressError(error)],
  },
})
