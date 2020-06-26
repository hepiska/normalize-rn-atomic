import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { searchActionType } from './action'
import { deepClone } from '@utils/helpers'

interface SearchState {
  readonly data: Object
  readonly tagData: Array<string>
  readonly order: Array<number>
  loading: boolean
  tagLoading: boolean
  isTagSearch: boolean
  readonly error?: ErrorType
  pagination: Object
}

const initialState: any = {
  data: Immutable({}),
  tagData: Immutable([]),
  order: Immutable([]),
  loading: false,
  tagLoading: false,
  isTagSearch: false,
  error: null,
  pagination: null,
  isEndReached: false,
}

const searchPostReducer: Reducer<SearchState> = (
  state: SearchState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case searchActionType.SET_SEARCH_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case searchActionType.SET_SEARCH_TAG_DATA:
      newState.tagData = Immutable(action.payload)
      return newState
    case searchActionType.SET_SEARCH_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case searchActionType.ADD_SEARCH_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case searchActionType.SET_PAGINATION:
      newState.pagination = action.payload
      return newState
    case searchActionType.SET_SEARCH_LOADING:
      newState.loading = action.payload
      return newState
    case searchActionType.SET_SEARCH_TAG_LOADING:
      newState.tagLoading = action.payload
      return newState
    case searchActionType.CLEAR_SEARCH:
      newState.order = Immutable([])
      newState.tagData = Immutable([])
      newState.pagination = null
      newState.isTagSearch = false
      return newState
    case searchActionType.SET_TAG_SEARCH:
      newState.isTagSearch = action.payload
      return newState
    case searchActionType.SET_DEFAULT:
      return newState
    default:
      return state
  }
}

export default searchPostReducer
