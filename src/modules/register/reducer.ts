import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { registerActionType } from './action'

interface RegisterState {
  readonly data: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}
const initialState: RegisterState = {
  data: Immutable({}),
  loading: false,
  error: null,
}

const registerReducer: Reducer<RegisterState> = (
  state: RegisterState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case registerActionType.SET_REGISTER_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case registerActionType.ERROR:
      newState.error = action.payload
      return newState
    default:
      return newState
  }
}

export default registerReducer
