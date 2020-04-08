import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { pageActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

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
  const newState = { ...state }
  switch (action.type) {
    case pageActionType.SET_PAGE:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case pageActionType.SET_SECTION:
      newState.section = Immutable.merge(newState.data, action.payload)
      return newState
    case pageActionType.SET_LOADING:
      if (typeof newState.loading === 'boolean') {
        newState.loading = {}
      }
      newState.loading[action.payload.key] = action.payload.value
      return newState
    case pageActionType.CLEAR_PAGE:
      return initialState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'page',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, pagereducer)
