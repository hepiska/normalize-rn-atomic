import { AnyAction, Reducer } from 'redux'
import { globalActionType } from './action'
import { deepClone } from '@utils/helpers'

const initialState = {
  error: null,
  warning: null,
}

const productFilterReducer: Reducer<any> = (
  state: any = { ...initialState },
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case globalActionType.CHANGE_ERROR:
      newState.error = action.payload
      return newState
    case globalActionType.CHANGE_WARNING:
      newState.warning = action.payload
      return newState
    default:
      return state
  }
}

export default productFilterReducer
