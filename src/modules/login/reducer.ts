import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { loginActionType } from './action'

interface LoginState {
  readonly data: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}
const initialState: LoginState = {
  data: Immutable({}),
  loading: false,
  error: null,
}

const loginReducer: Reducer<LoginState> = (
  state: LoginState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case loginActionType.SET_REGISTER_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case loginActionType.ERROR:
      newState.error = action.payload
      return newState
    default:
      return newState
  }
}

export default loginReducer
