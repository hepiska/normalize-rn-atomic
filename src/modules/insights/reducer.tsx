import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { insightActionType } from './action'

interface InsightType {}

interface InsightState {
  readonly data: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  // order: Immutable([]),
  loading: false,
  error: null,
}

const insightReducer: Reducer<InsightState> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case insightActionType.SET_INSIGHT_DATA:
      newState.data = action.payload
      return newState
    case insightActionType.SET_INSIGHT_LOADING:
      newState.loading = action.payload
      return newState
    case insightActionType.ERROR:
      newState.error = action.payload
      return newState
    default:
      return state
  }
}

export default insightReducer
