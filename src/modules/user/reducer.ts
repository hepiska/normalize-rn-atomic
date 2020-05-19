import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { userActionType } from './action'
import { deepClone } from '@src/utils/helpers'

interface UserState {
  readonly data: Object
  readonly order: Array<number>
  pagination: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}
const initialState: UserState = {
  data: Immutable({}),
  order: Immutable([]),
  pagination: {},
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
      newState.data = Immutable.merge(newState.data, action.payload, {
        deep: true,
      })
      return newState
    case userActionType.CHANGE_FOLLOW_DATA:
      const newData = {}
      newData[action.payload.user_id] = {
        ...deepClone(newState.data[action.payload.user_id]),
        is_followed: action.payload.is_followed,
      }
      newState.data = Immutable.merge(
        newState.data,
        Immutable.replace(newState.data, newData),
      )
      return newState
    case userActionType.SET_USER_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case userActionType.SET_USER_ORDER_PAGINATION:
      newState.order = newState.order.concat(Immutable(action.payload.order))
      newState.pagination = action.payload.pagination
      return newState
    case userActionType.REMOVE_USER_ORDER:
      newState.order = Immutable(
        newState.order.filter(_order => _order !== action.payload),
      )
      return newState
    case userActionType.ADD_USER_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case userActionType.SET_USER_LOADING:
      newState.loading = action.payload
    default:
      return newState
  }
}

export default userReducer
