import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { pageActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface PageDataType {
  readonly data: Object
  readonly section: Object
  loading?: Object
  error?: Object
}

const initialState: any = {
  data: Immutable({}),
  section: Immutable({}),
  loading: {},
  error: {},
}

const pagereducer: Reducer<PageDataType> = (
  state: any = deepClone(initialState),
  action: AnyAction,
) => {
  let newState: any = {}
  switch (action.type) {
    case pageActionType.SET_PAGE:
      newState = { ...state }

      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case pageActionType.SET_SECTION:
      newState = { ...state }
      newState.section = Immutable.merge(newState.section, action.payload)
      return newState
    case pageActionType.SET_LOADING:
      newState = { ...state }
      if (typeof newState.loading === 'boolean') {
        newState.loading = {}
      }
      newState.loading[action.payload.key] = action.payload.value
      return newState
    case pageActionType.CLEAR_PAGE:
      newState = { ...state }
      return initialState
    default:
      return state
  }
}

const presistConfig = {
  key: 'page',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, pagereducer)
    : pagereducer

export default exportReducer
