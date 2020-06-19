import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { transactionActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface TransactionState {
  readonly data: Object
  active: number
  transactionStatus: Array<string>
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  active: null,
  transactionStatus: ['unpaid', 'waiting'],
  order: Immutable([]),
  loading: false,
  error: null,
}

const transactionReducer: Reducer<TransactionState> = (
  state: any = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case transactionActionType.SET_TRANSACTION_DATA:
      newState.data = Immutable.merge(newState.data, action.payload, {
        deep: true,
      })
      return newState
    case transactionActionType.SET_TRANSACTION_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case transactionActionType.SET_ACTIVE_TRANSACTION:
      newState.active = action.payload
      return newState
    case transactionActionType.SET_TRANSACTION_ORDER_PAGINATION:
      if (
        action.payload.pagination.offset &&
        action.payload.pagination.total &&
        newState.order.length <= action.payload.pagination.total
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      } else {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      }
      newState.pagination = action.payload.pagination
      return newState
    case transactionActionType.SET_TRANSACTION_LOADING:
      newState.loading = action.payload
      return newState
    case transactionActionType.DEFAULT:
      return initialState
    default:
      return state
  }
}

// const transactionPaymentPersistConfig = {
//   key: 'transaction-payment',
//   storage: AsyncStorage,
// }

// export default persistReducer(
//   transactionPaymentPersistConfig,
//   transactionReducer,
// )

export default transactionReducer
