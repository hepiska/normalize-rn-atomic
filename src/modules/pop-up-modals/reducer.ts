import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const modalData = [
  { id: 'referrals', interval: 'once', lastClose: null, openAuth: true },
  { id: 'register-now', interval: 'daily', lastClose: null, openunAuth: true },
]

interface ReducerType {
  open: boolean
  type: string
  data: Array<any>
  error: ErrorType
  loading: boolean
  active: number
}

const initialState: ReducerType = {
  open: false,
  type: '',
  error: null,
  data: modalData,
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
    case ActionType.CHANGE_OPEN:
      newState.open = !newState.open
      return newState
    case ActionType.CHANGE_TYPE:
      newState.type = payload
      return newState
    case ActionType.CLOSE_MODAL:
      const data = [...newState.data].map(_dat => {
        if (_dat.id === payload.id) {
          _dat.lastClose = payload.closeTime
        }
        return _dat
      })
      newState.data = data

      return newState
    default:
      return state
  }
}

const presistConfig = {
  key: 'modals',
  storage: AsyncStorage,
}

// const exportReducer = persistReducer(presistConfig, reducer)

export default reducer
