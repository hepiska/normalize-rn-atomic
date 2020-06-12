import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { collectionActionType } from './action'
import CONFIG from 'react-native-config'

import AsyncStorage from '@react-native-community/async-storage'

interface CollectionState {
  readonly data: Object
  activeCollection: number
  readonly order: Array<number>
  pagination: Object
  loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  activeCollection: null,
  pagination: {},
  loading: false,
  error: null,
}

const productReducer: Reducer<CollectionState> = (
  state: CollectionState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case collectionActionType.SET_COLLECTION_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case collectionActionType.SET_COLLECTION_ORDER:
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
    case collectionActionType.SET_COLLECTION_LOADING:
      newState.loading = action.payload
      return newState
    case collectionActionType.SET_ACTIVE_COLLECTION:
      newState.activeCollection = action.payload
      return newState

    case collectionActionType.ERROR:
      newState.error = action.payload
      return newState
    default:
      return newState
  }
}

const persistConfig = {
  key: 'collection',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(persistConfig, productReducer)
    : productReducer

export default exportReducer
