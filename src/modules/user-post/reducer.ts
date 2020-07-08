import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface TransactionState {
  active: number
  userPostStatus: Array<string>
  readonly order: Object
  readonly specificOrder: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  active: null,
  status: ['published', 'draft', 'archived'],
  isEndReached: false,
  postcount: {},
  order: Immutable([]),
  specificOrder: Immutable({}),
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
    case actionType.SET_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case actionType.SET_SPECIFIC_ORDER:
      newState.specificOrder = Immutable.merge(newState.specificOrder, {
        [action.payload.userid]: action.payload.order,
      })
      return newState
    case actionType.ADD_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case actionType.ADD_SPECIFIC_ORDER:
      let tempt
      tempt = newState.specificOrder[action.payload.userid].concat(
        action.payload.order,
      )
      const neworder = Immutable.asMutable(newState.specificOrder)
      const index = action.payload.userid

      if (~index) {
        neworder[index] = tempt
      }
      newState.specificOrder = Immutable(neworder)

      return newState
    case actionType.SET_ERROR:
      newState.error = payload
      return newState
    case actionType.SET_REACH_END:
      newState.reachedEnd = payload
    default:
      return state
  }
}

const presistConfig = {
  key: 'user-post',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, userPostReducer)
    : userPostReducer

export default exportReducer
