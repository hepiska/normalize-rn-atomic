import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { productActionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'

interface ProductState {
  readonly data: Object
  readonly order: Array<number>
  pagination: Object
  loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  pagination: {},
  loading: false,
  error: null,
}

const productReducer: Reducer<ProductState> = (
  state: ProductState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case productActionType.SET_PRODUCT_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case productActionType.SET_PRODUCT_ORDER:
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
    case productActionType.SET_PRODUCT_LOADING:
      newState.loading = action.payload
      return newState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'product',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, productReducer)
