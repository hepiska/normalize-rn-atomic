import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { transactionPaymentActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface TransactionPaymentState {
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
}

const transactionPaymentReducer: Reducer<TransactionPaymentState> = (
  state: any = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case transactionPaymentActionType.SET_TRANSACTION_PAYMENT_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case transactionPaymentActionType.SET_TRANSACTION_PAYMENT_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case transactionPaymentActionType.SET_TRANSACTION_PAYMENT_LOADING:
      newState.loading = action.payload
      return newState
    case transactionPaymentActionType.DEFAULT:
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
//   transactionPaymentReducer,
// )

export default transactionPaymentReducer
