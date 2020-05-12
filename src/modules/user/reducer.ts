import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { userActionType } from './action'

interface UserState {
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}
const initialState: UserState = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
}

const userReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case userActionType.SET_USER_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case userActionType.SET_USER_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case userActionType.SET_USER_LOADING:
      newState.loading = action.payload
    default:
      return newState
  }
}

export default userReducer
