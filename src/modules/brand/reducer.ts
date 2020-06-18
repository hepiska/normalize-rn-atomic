import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { brandActionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface BrandState {
  readonly data: Object
  readonly order: Array<number>
  readonly loading: Boolean
  readonly error?: ErrorType
  activeBrand: number
  search: String
  pagination: Object
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  activeBrand: null,
  error: null,
  search: '',
  pagination: {},
}

const brandReducer: Reducer<BrandState> = (
  state: BrandState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case brandActionType.SET_BRAND_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case brandActionType.SET_BRAND_ORDER:
      if (
        action.payload.pagination.next_id &&
        action.payload.pagination.total &&
        newState.order.length < action.payload.pagination.total
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      } else {
        newState.order = Immutable(action.payload.order)
      }
      newState.pagination = action.payload.pagination
      return newState
    case brandActionType.SET_BRAND_LOADING:
      newState.loading = action.payload
      return newState
    case brandActionType.CHANGE_SEARCH:
      newState.search = action.payload
      return newState
    case brandActionType.SET_ACTIVE_BRAND:
      newState.activeBrand = action.payload
      return newState
    case brandActionType.CLEAR_SEARCH:
      newState.search = ''
      return newState
    case brandActionType.ERROR:
      newState.error = action.payload
      return newState
    case brandActionType.RESET_BRAND:
      newState.data = Immutable({})
      newState.order = Immutable([])
      return newState
    default:
      return state
  }
}

const brandersistConfig = {
  key: 'category',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(brandersistConfig, brandReducer)
    : brandReducer

export default exportReducer
