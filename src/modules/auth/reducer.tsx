import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { authActionType } from './action'

interface RegisterState {
  readonly loading: Boolean
  readonly error?: ErrorType
  readonly data: Object
  readonly isAuth: Boolean
  readonly usernameAvalaible: any
}
const initialState: RegisterState = {
  loading: false,
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
      newState.loading = action.payload.loading
      return newState
    case authActionType.ERROR:
      newState.error = action.payload
      return newState
    case authActionType.SET_LOGIN_SUCCESS:
      newState.data = action.payload.data
      newState.isAuth = action.payload.isAuth
      return newState
    case authActionType.SET_USERNAME_AVAILABLE:
      newState.usernameAvalaible = action.payload
      return newState
    default:
      return newState
  }
}

export default registerReducer
