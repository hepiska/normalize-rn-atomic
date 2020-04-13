import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { authActionType } from './action'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

interface RegisterState {
  readonly loading: Boolean
  readonly error?: ErrorType
  readonly called: Boolean
  readonly data: any
  readonly isAuth: Boolean
  readonly usernameAvalaible: any
}
const initialState: RegisterState = {
  loading: false,
  called: false,
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
      newState.called = false
      newState.loading = action.payload.loading
      return newState
    case authActionType.ERROR:
      newState.called = action.payload === null ? false : true
      newState.error = action.payload
      return newState
    case authActionType.SET_LOGIN_SUCCESS:
      newState.called = true
      newState.data = Immutable.merge(newState.data, action.payload.data)
      newState.isAuth = action.payload.isAuth
      return newState
    case authActionType.SET_REGISTER_SUCCESS:
      newState.called = true
      newState.data.user = Immutable.merge(newState.data, action.payload)

      return newState
    case authActionType.SET_USERNAME_AVAILABLE:
      newState.usernameAvalaible = action.payload
      return newState
    default:
      return newState
  }
}

const brandersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
}

export default persistReducer(brandersistConfig, registerReducer)

// export default registerReducer
