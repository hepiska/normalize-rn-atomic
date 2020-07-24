import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'

interface ReducerType {
  order: Array<number>
  newCount: number
  pagination: Object
  newOrder: Array<number>
  error: ErrorType
  loading: boolean
  active: number
}

const initialState: ReducerType = {
  newCount: 0,
  order: [],
  newOrder: [],
  pagination: {},
  error: null,
  active: undefined,
  loading: false,
}

const reducer: Reducer<ReducerType> = (
  state: ReducerType = { ...initialState },
  action: AnyAction,
) => {
  const { payload, type } = action
  const newState = { ...state }
  switch (type) {
    case ActionType.SET_LOADING:
      newState.loading = payload
      return newState
    case ActionType.SET_ERROR:
      newState.error = payload
      return newState
    case ActionType.SET_ORDER:
      newState.order = payload
      return newState
    case ActionType.SET_NEW_COUNT:
      newState.newCount = payload
      return newState
    case ActionType.SET_PAGINATION:
      newState.pagination = payload
      return newState
    case ActionType.SET_NEW_ORDER:
      newState.newOrder = payload
      return newState
    case ActionType.ADD_ORDER:
      newState.order = [newState.order, ...payload]
      return newState
    default:
      return state
  }
}

export default reducer
