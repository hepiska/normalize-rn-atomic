import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const ActionType = {
  SET_LOADING: 'pop-up-modals/SET_LOADING',
  CHANGE_OPEN: 'pop-up-modals/CHANGE_OPEN',
  CHANGE_TYPE: 'pop-up-modals/CHANGE_TYPE',
  SET_ERROR: 'pop-up-modals/SET_ERROR',
  SET_DATA: 'pop-up-modals/SET_DATA',
  SET_ORDER: 'pop-up-modals/SET_ORDER',
  ADD_ORDER: 'pop-up-modals/ADD_ORDER',
  CLOSE_MODAL: 'pop-up-modals/CLOSE_MODAL',
}

const setLoading = data => ({
  type: ActionType.SET_LOADING,
  payload: data,
})

export const closeModal = id => {
  const closeTime = new Date()
  return {
    type: ActionType.CLOSE_MODAL,
    payload: {
      id: id,
      closeTime: closeTime,
    },
  }
}

export const changeOpenPopUp = () => ({ type: ActionType.CHANGE_OPEN })
export const changeType = data => ({
  type: ActionType.CHANGE_TYPE,
  payload: data,
})

const setError = data => ({
  type: ActionType.SET_ERROR,
  payload: data,
})

const setData = data => ({
  type: ActionType.SET_DATA,
  payload: data,
})

const setOrder = data => ({ type: ActionType.SET_ORDER })
const addOrder = data => ({ type: ActionType.ADD_ORDER })
