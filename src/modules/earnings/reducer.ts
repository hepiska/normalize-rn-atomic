import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'

interface ReducerType {
  readonly data: Object
  order: Array<number>
  pendingorder: Array<number>
  pendingSummary: Object
  summary: Object
  error: ErrorType
  loadings: Object
  active: number
  pagination: Object
  pendingPagination: Object
}

const initialState: ReducerType = {
  data: Immutable({}),
  pendingSummary: {},
  pagination: {},
  pendingPagination: {},
  pendingorder: [],
  summary: {},
  order: [],
  error: null,
  active: undefined,
  loadings: {},
}

const reducer: Reducer<ReducerType> = (
  state: ReducerType = { ...initialState },
  action: AnyAction,
) => {
  const { payload, type } = action
  const newState = { ...state }
  switch (type) {
    case ActionType.SET_LOADINGS:
      newState.loadings[payload.type] = payload.value
      return newState
    case ActionType.SET_ERROR:
      newState.error = payload
      return newState
    case ActionType.SET_DATA:
      newState.data = Immutable.merge(newState.data, payload, { deep: true })
      return newState
    case ActionType.SET_ORDER:
      newState.order = payload
      return newState
    case ActionType.ADD_ORDER:
      newState.order = newState.order.concat(payload)
      return newState
    case ActionType.SET_PENDING_ORDER:
      newState.pendingorder = payload
      return newState
    case ActionType.ADD_PENDING_ORDER:
      newState.pendingorder = newState.pendingorder.concat(payload)
      return newState
    case ActionType.SET_SUMMARY:
      newState.summary = payload
      return newState
    case ActionType.SET_PENDING_SUMMARY:
      newState.pendingSummary = payload
      return newState
    case ActionType.SET_PENDING_PAGINATION:
      newState.pendingPagination = payload
      return newState
    case ActionType.SET_PAGINATION:
      newState.pagination = payload
      return newState
    default:
      return state
  }
}

export default reducer
