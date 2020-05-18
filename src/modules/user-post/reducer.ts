import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface TransactionState {
  active: number
  userPostStatus: Array<string>
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  active: null,
  status: ['published', 'draft', 'archived'],
  postcount: {},
  order: Immutable([]),
  loading: false,
  error: null,
}

const userPostReducer: Reducer<TransactionState> = (
  state: any = { ...initialState },
  action: AnyAction,
) => {
  const newState = { ...state }
  const { type, payload } = action
  switch (type) {
    case actionType.SET_LOADING:
      newState.loading = payload
      return newState
    case actionType.SET_ERROR:
      newState.error = payload
      return newState
    default:
      return newState
  }
}

const presistConfig = {
  key: 'user-post',
  storage: AsyncStorage,
}

export default persistReducer(presistConfig, userPostReducer)
