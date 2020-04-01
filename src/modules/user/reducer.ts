import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { userActionType } from './action'

interface UserState {
  readonly usernameAvalaible: any
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}
const initialState: UserState = {
  usernameAvalaible: null,
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
    case userActionType.FETCH_START:
      newState.loading = true
      return newState
    case userActionType.FETCH_FINISH:
      newState.loading = false
      return newState
    case userActionType.SET_USERNAME_AVAILABLE:
      newState.usernameAvalaible = action.payload
      return newState
    default:
      return newState
  }
}

export default userReducer
