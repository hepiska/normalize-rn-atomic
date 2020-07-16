import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'

interface ReducerType {
  readonly data: Object
  order: Array<number>
  error: ErrorType
  loading: boolean
  active: number
}

const initialState: ReducerType = {
  data: Immutable({}),
  order: [],
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
    case ActionType.SET_DATA:
      newState.data = Immutable.merge(newState.data, payload, { deep: true })
      return newState
    case ActionType.SET_ORDER:
      newState.order = payload
      return newState
    case ActionType.ADD_ORDER:
      newState.order = newState.order.concat(payload)
      return newState
    default:
      return state
  }
}

export default reducer
