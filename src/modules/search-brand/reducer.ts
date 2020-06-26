import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { searchActionType, setPagination } from './action'
import { deepClone } from '@utils/helpers'

interface SearchState {
  readonly data: Array<number>
  readonly order: Array<number>
  loading: boolean
  readonly error?: ErrorType
  pagination: Object
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
  pagination: null,
  isEndReached: false,
}

const searchReducer: Reducer<SearchState> = (
  state: SearchState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case searchActionType.SET_SEARCH_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case searchActionType.SET_SEARCH_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case searchActionType.ADD_SEARCH_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))

      return newState
    case searchActionType.SET_PAGINATION:
      newState.pagination = action.payload
    case searchActionType.SET_SEARCH_LOADING:
      newState.loading = action.payload
      return newState
    case searchActionType.CLEAR_SEARCH:
      newState.order = Immutable([])
      newState.pagination = null
      return newState
    case searchActionType.SET_DEFAULT:
      return state
    default:
      return state
  }
}

export default searchReducer
