import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { productActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface ProductState {
  readonly data: Object
  readonly order: Array<number>
  readonly search: Array<number>
  pagination: Object
  productsLoading: boolean
  productLoading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  search: Immutable([]),
  pagination: {},
  productsLoading: false,
  productLoading: false,
  error: null,
}

const productReducer: Reducer<ProductState> = (
  state: ProductState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case productActionType.SET_PRODUCT_DATA:
      newState.data = Immutable.merge(newState.data, action.payload, {
        deep: true,
      })
      return newState

    case productActionType.CHANGE_VALUE:
      newState[action.payload.key] = action.payload.value
      return newState

    case productActionType.SET_PRODUCT_ORDER:
      if (
        action.payload.pagination.offset &&
        action.payload.pagination.total &&
        newState.order.length <= action.payload.pagination.total
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      } else {
        newState.order = Immutable(action.payload.order)
      }
      newState.pagination = action.payload.pagination
      return newState
    case productActionType.SET_PRODUCT_SEARCH_ORDER:
      if (
        action.payload.pagination.offset &&
        action.payload.pagination.total &&
        newState.search.length <= action.payload.pagination.total
      ) {
        newState.search = newState.search.concat(
          Immutable(action.payload.search),
        )
      } else {
        newState.search = Immutable(action.payload.search)
      }
      newState.pagination = action.payload.pagination
      return newState
    case productActionType.SET_PRODUCTS_LOADING:
      newState.productsLoading = action.payload
      return newState
    case productActionType.ClEAR_PRODUCT:
      return initialState
    case productActionType.CLEAR_PRODUCT_SEARCH:
      newState.search = Immutable([])
      return newState
    case productActionType.SET_DEFAULT:
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
