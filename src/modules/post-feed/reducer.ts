import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

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
    case actionType.ADD_FEED_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case actionType.SET_FEED_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case actionType.SET_FEED_LOADING:
      newState.loading = action.payload
      return newState
    case actionType.SET_PAGINATION:
      newState.pagination = action.payload
      return newState
    case actionType.CLEAR_FEED:
      return initialState
    default:
      return state
  }
}

const presistConfig = {
  key: 'feed',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, FeedReducer)
    : FeedReducer

export default exportReducer
