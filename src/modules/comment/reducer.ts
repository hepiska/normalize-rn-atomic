import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { commentActionType } from './action'

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

const commentReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case commentActionType.SET_COMMENT_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    default:
      return newState
  }
}

export default commentReducer
