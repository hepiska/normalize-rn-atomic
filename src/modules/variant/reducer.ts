import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'
import { ErrorType } from '@utils/globalInterface'
import { deepClone } from '@utils/helpers'

interface VarianStateType {
  readonly data: Object
  readonly order: Array<number>
  readonly error?: ErrorType
  activeVarian: number
  pagination: Object
  loading: Boolean
}

const initialState: VarianStateType = {
  data: Immutable({}),
  order: Immutable([]),
  error: null,
  pagination: null,
  activeVarian: null,
  loading: false,
}

const cartReducer: Reducer<VarianStateType> = (
  state: VarianStateType = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.SET_ERROR:
      newState.error = action.payload
      return newState
    case actionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    default:
      return newState
  }
}

export default cartReducer
