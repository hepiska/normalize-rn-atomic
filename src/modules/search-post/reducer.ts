import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { searchActionType } from './action'
import { deepClone } from '@utils/helpers'

interface SearchState {
  readonly data: Array<number>
  readonly order: Array<number>
  loading: boolean
  readonly error?: ErrorType
  pagination: Object
}

const initialState: any = {
  data: Immutable([]),
  order: Immutable([]),
  loading: false,
  error: null,
  pagination: null,
  isEndReached: false,
}

const searchReducer: Reducer<SearchState> = (
  state: SearchState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case searchActionType.SET_SEARCH_ORDER:
      if (
        action.payload.pagination.offset &&
        action.payload.pagination.total &&
        newState.order.length < action.payload.pagination.total
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      } else {
        newState.order = Immutable(action.payload.order)
      }
      newState.pagination = action.payload.pagination
      return newState
    case searchActionType.SET_SEARCH_LOADING:
      newState.loading = action.payload
      return newState
    case searchActionType.CLEAR_SEARCH:
      newState.order = Immutable([])
      newState.pagination = null
      return newState
    case searchActionType.SET_DEFAULT:
      return newState
    default:
      return newState
  }
}

export default searchReducer
