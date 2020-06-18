import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { orderActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface OrderState {
  readonly data: Object
  readonly order: Object
  pagination: Object
  active: number
  orderStatuses: Array<string>
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  pagination: {},
  active: null,
  orderStatuses: [
    'paid',
    'confirmed',
    'shipping',
    'delivered',
    'completed',
    'cancelled',
    'refund',
  ],
  loading: false,
  error: null,
}

const orderReducer: Reducer<OrderState> = (
  state: any = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case orderActionType.SET_ORDER_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case orderActionType.SET_ORDER_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case orderActionType.SET_ORDER_ORDER_PAGINATION:
      // if (
      //   action.payload.pagination.offset &&
      //   action.payload.pagination.total &&
      //   newState.order.length <= action.payload.pagination.total
      // ) {
      //   newState.order = newState.order.concat(Immutable(action.payload.order))
      // } else {
      //   newState.order = Immutable(action.payload.order)
      // }
      newState.order = newState.order.concat(Immutable(action.payload.order))
      newState.pagination = action.payload.pagination
      return newState
    case orderActionType.SET_ORDER_LOADING:
      newState.loading = action.payload
      return newState
    case orderActionType.SET_ACTIVE_ORDER:
      newState.active = action.payload
      return newState
    case orderActionType.DEFAULT:
      return initialState
    default:
      return state
  }
}

// const orderPersistConfig = {
//   key: 'order',
//   storage: AsyncStorage,
// }

// export default persistReducer(orderPersistConfig, orderReducer)
export default orderReducer
