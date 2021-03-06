import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface SpecificQuery {
  [key: string]: any
}

interface SpecificPagination {
  [key: string]: {
    limit: number
    offset: number
  } //next_token
}

interface SpecificLoading {
  [key: string]: boolean
}

interface DiscoverState {
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  pagination: any
  readonly error?: ErrorType
  specificQueryPost?: SpecificQuery
  specificLoading?: SpecificLoading
  specificPagination?: SpecificPagination
  tabname?: string
  specificMenu?: any
  scrollDirection?: string
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  pagination: {},
  error: null,
  specificQueryPost: {},
  specificLoading: {},
  specificPagination: {},
  tabname: '',
  specificMenu: {
    fashion: '',
    beauty: '',
  },
  scrollDirection: '',
}

const discoverReducer: Reducer<DiscoverState> = (
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
    case actionType.SET_SPECIFIC_LOADING:
      newState.specificLoading[action.payload.uri] = action.payload.data
      return newState
    case actionType.SET_SPECIFIC_QUERY:
      newState.specificQueryPost[action.payload.uri] = Immutable(
        action.payload.data,
      )
      return newState
    case actionType.APPEND_SPECIFIC_QUERY:
      const data = newState.specificQueryPost[action.payload.uri]
      newState.specificQueryPost[action.payload.uri] = data.concat(
        Immutable(action.payload.data),
      )
      return newState
    case actionType.SET_SPECIFIC_PAGINATION:
      newState.specificPagination[action.payload.uri] = action.payload.data
      return newState
    case actionType.SET_TAB_NAME:
      newState.tabname = action.payload
      return newState
    case actionType.SET_SPECIFIC_MENU:
      newState.specificMenu[action.payload.uri] = action.payload.data
      return newState
    case actionType.ON_SCROLL:
      newState.scrollDirection = action.payload
      return newState
    default:
      return state
  }
}

const presistConfig = {
  key: 'discover',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, discoverReducer)
    : discoverReducer

export default exportReducer
