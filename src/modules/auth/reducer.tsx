import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { authActionType } from './action'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface RegisterState {
  loading: Boolean
  error?: ErrorType
  called: Boolean
  referral_code: string
  readonly data: any
  isAuth: Boolean
  usernameAvalaible: any
}
const initialState: RegisterState = {
  loading: false,
  called: false,
  referral_code: null,
  error: null,
  data: Immutable({}),
  isAuth: false,
  usernameAvalaible: null,
}

const registerReducer: Reducer<RegisterState> = (
  state: RegisterState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }

  switch (action.type) {
    case authActionType.FETCHNG:
      state.called = false
      state.loading = action.payload.loading
      return { ...state }
    case authActionType.ERROR:
      state.called = action.payload === null ? false : true
      state.error = action.payload
      return { ...state }
    case authActionType.SET_LOGIN_SUCCESS:
      newState.called = true
      newState.data = Immutable.merge(newState.data, action.payload.data)
      newState.isAuth = action.payload.isAuth
      return newState
    case authActionType.SET_LOGOUT_SUCCESS:
      newState.called = true
      newState.data = Immutable({})
      newState.isAuth = action.payload.isAuth
      return newState
    case authActionType.SET_REGISTER_SUCCESS:
      newState.called = true
      newState.data.user = Immutable.merge(newState.data, action.payload)
      return newState
    case authActionType.SET_REF_CODE:
      newState.referral_code = action.payload
      return newState
    case authActionType.SET_USERNAME_AVAILABLE:
      newState.usernameAvalaible = action.payload
      return newState
    default:
      return state
  }
}
const presistConfig = {
  key: 'auth',
  storage: AsyncStorage,
}

// const exportReducer =
//   CONFIG.USE_PRESIST !== 'false'
//     ? persistReducer(brandersistConfig, registerReducer)
//     : registerReducer

const exportReducer = persistReducer(presistConfig, registerReducer)

export default exportReducer
