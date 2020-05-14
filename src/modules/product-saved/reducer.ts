import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { productSavedActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface ProductSavedState {
  readonly data: Object
  readonly order: Array<number>
  pagination: Object
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  pagination: {},
  loading: false,
  error: null,
}

const productSavedReducer: Reducer<ProductSavedState> = (
  state: ProductSavedState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case productSavedActionType.SET_ORDER_DATA:
      const OrderData = Immutable(action.payload)
      const objData = Immutable.asObject(OrderData, _data => {
        return [_data, _data]
      })

      newState.data = Immutable.merge(newState.data, objData)
      newState.order = OrderData
      return newState
    case productSavedActionType.ADD_SAVED_PRODUCT:
      const savedProductObj = {}
      savedProductObj[action.payload] = action.payload
      newState.data = Immutable.merge(newState.data, savedProductObj)
      return newState
    case productSavedActionType.DELETE_SAVED_PRODUCT:
      newState.order = Immutable(
        newState.order.filter(_order => _order !== action.payload),
      )
      return newState

    case productSavedActionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    case productSavedActionType.CLEAR:
      return initialState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'product-saved',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, productSavedReducer)
