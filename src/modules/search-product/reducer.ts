import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { searchActionType, setPagination } from './action'
import { deepClone } from '@utils/helpers'
import { concat } from 'react-native-reanimated'

interface SearchState {
  productData: any
  productOrder: Array<number>
  productFindOrder: Array<number>
  categoryData: any
  categoryOrder: Array<number>
  loading: boolean
  findLoading: boolean
  readonly error?: ErrorType
  findPagination: {}
  pagination: Object
  context: Array<Object>
}

const initialState: any = {
  productData: Immutable({}),
  productOrder: Immutable([]),
  productFindOrder: Immutable([]),
  categoryData: Immutable({}),
  categoryOrder: Immutable([]),
  context: [],
  loading: false,
  findLoading: false,
  error: null,
  pagination: null,
  findPagination: null,
  isEndReached: false,
}

const searchReducer: Reducer<SearchState> = (
  state: SearchState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case searchActionType.SET_SEARCH_PRODUCT_DATA:
      state.productData = Immutable.merge(state.productData, action.payload)
      return { ...state }
    case searchActionType.SET_SEARCH_PRODUCT_ORDER:
      state.productOrder = Immutable(action.payload)

      return { ...state }
    case searchActionType.ADD_SEARCH_PRODUCT_ORDER:
      state.productOrder = Immutable(state.productOrder).concat(
        Immutable(action.payload),
      )
      return { ...state }
    case searchActionType.SET_FIND_PRODUCT_ORDER:
      state.productFindOrder = Immutable(action.payload)
      return state
    case searchActionType.ADD_FIND_PRODUCT_ORDER:
      state.productFindOrder = Immutable(state.productFindOrder).concat(
        state.productFindOrder,
        Immutable(action.payload),
      )
      return { ...state }

    case searchActionType.SET_SEARCH_CATEGORY_DATA:
      state.categoryData = Immutable.merge(state.categoryData, action.payload)

      return { ...state }
    case searchActionType.SET_SEARCH_CATEGORY_ORDER:
      state.categoryOrder = Immutable(action.payload)
      return state
    case searchActionType.ADD_SEARCH_CATEGORY_ORDER:
      state.categoryOrder = Immutable(state.categoryOrder).concat(
        Immutable(action.payload),
      )
      return { ...state }

    case searchActionType.SET_PAGINATION:
      state.pagination = action.payload
      return { ...state }

    case searchActionType.SET_FIND_PAGiNATION:
      state.findPagination = action.payload
      return { ...state }

    case searchActionType.SET_CONTEXT:
      state.context = action.payload
      return { ...state }

    case searchActionType.SET_SEARCH_LOADING:
      state.loading = action.payload
      return { ...state }

    case searchActionType.SET_FIND_SEARCH_LOADING:
      state.findLoading = action.payload
      return { ...state }
    case searchActionType.CLEAR_SEARCH:
      state.productOrder = Immutable([])
      state.categoryOrder = Immutable([])

      state.pagination = null
      return { ...state }
    case searchActionType.SET_DEFAULT:
      return state
    default:
      return state
  }
}

export default searchReducer
