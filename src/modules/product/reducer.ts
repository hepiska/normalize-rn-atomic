import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { productActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface ProductState {
  readonly data: Object
  readonly order: Array<number>
  readonly search: Array<number>
  pagination: Object
  specificQueryProduct: Object
  readonly trendingOrder: Array<number>
  productsLoading: boolean
  productLoading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  search: Immutable([]),
  specificQueryProduct: {},
  specificLoading: {},
  pagination: {},
  productsLoading: false,
  productLoading: false,
  error: null,
}

const productReducer: Reducer<ProductState> = (
  state: ProductState = initialState,
  action: AnyAction,
) => {
  let newState: any = {}
  switch (action.type) {
    case productActionType.SET_PRODUCT_DATA:
      newState = { ...state }
      newState.data = Immutable.merge(newState.data, action.payload, {
        deep: true,
      })
      return newState

    case productActionType.CHANGE_VALUE:
      newState = { ...state }

      newState[action.payload.key] = action.payload.value
      return newState

    case productActionType.SET_PRODUCT_ORDER:
      newState = { ...state }

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
      newState = { ...state }

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
      newState = { ...state }

      newState.productsLoading = action.payload
      return newState
    case productActionType.ClEAR_PRODUCT:
      return initialState

    case productActionType.CLEAR_PRODUCT_SEARCH:
      newState = { ...state }

      newState.search = Immutable([])
      return newState

    case productActionType.SET_SPECIFIC_LOADING:
      newState = { ...state }
      newState.specificLoading[action.payload.uri] = action.payload.value
      return newState

    case productActionType.SET_SPECIFIC_ORDER:
      newState = { ...state }
      newState.specificQueryProduct[action.payload.uri] = action.payload.value
      return newState

    case productActionType.SET_TRENDING_ORDER:
      newState = { ...state }

      const { type, order } = action.payload
      if (type === 'add') {
        newState.trendingOrder = newState.order.concat(Immutable(order))
      } else {
        newState.trendingOrder = Immutable(order)
      }
      return newState
    case productActionType.SET_DEFAULT:
      return state
    default:
      return state
  }
}

const presistConfig = {
  key: 'product',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, productReducer)
    : productReducer

export default exportReducer
