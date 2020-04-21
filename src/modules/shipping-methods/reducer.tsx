import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { shippingMethodsActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface ShippingMethodsState {
  readonly data: Object
  readonly order: Array<number>
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
}

const shippingMethodsReducer: Reducer<ShippingMethodsState> = (
  state: ShippingMethodsState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case shippingMethodsActionType.SET_SHIPPING_METHODS_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case shippingMethodsActionType.SET_SHIPPING_METHODS_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case shippingMethodsActionType.SET_SHIPPING_METHODS_LOADING:
      newState.loading = action.payload
      return newState
    case shippingMethodsActionType.SET_DEFAULT:
      return newState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'shipping-methods',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, shippingMethodsReducer)
