import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

interface ReducerType {
  readonly products: Array<any>
  error: ErrorType
  loading: boolean
  active: number
}

const initialState: ReducerType = {
  products: Immutable([]),
  error: null,
  active: undefined,
  loading: false,
}

const reducer: Reducer<ReducerType> = (
  state: ReducerType = { ...initialState },
  action: AnyAction,
) => {
  const { payload, type } = action
  const newState = { ...state }
  switch (type) {
    case ActionType.SET_LOADING:
      newState.loading = payload
      return newState
    case ActionType.SET_ERROR:
      newState.error = payload
      return newState
    case ActionType.ADD_PRODUCT:
      newState.products = Immutable(state.products).concat([payload])
      return newState

    default:
      return state
  }
}

const presistConfig = {
  key: 'seen-product',
  storage: AsyncStorage,
}

const exportReducer = persistReducer(presistConfig, reducer)

export default exportReducer
