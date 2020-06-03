import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface FeedState {
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  pagination: any
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  pagination: {},
  error: null,
}

const FeedReducer: Reducer<FeedState> = (
  state: any = { ...initialState },
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.ADD_DISCOVER_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case actionType.SET_DISCOVER_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case actionType.SET_DISCOVER_LOADING:
      newState.loading = action.payload
      return newState
    case actionType.SET_PAGINATION:
      newState.pagination = action.payload
      return newState
    case actionType.CLEAR_DISCOVER:
      return initialState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'feed',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, FeedReducer)