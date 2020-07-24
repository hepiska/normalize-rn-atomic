import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { ActionType } from './action'

interface ReducerType {
  open: boolean
  type: string
  error: ErrorType
  loading: boolean
  active: number
}

const initialState: ReducerType = {
  open: false,
  type: '',
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
    case ActionType.CHANGE_OPEN:
      newState.open = !newState.open
      return newState
    case ActionType.CHANGE_TYPE:
      newState.type = payload
      return newState
    default:
      return state
  }
}

export default reducer
