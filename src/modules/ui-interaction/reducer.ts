import { AnyAction, Reducer } from 'redux'
import { productFilterType } from './action'

const initialState = {
  isScrollEnabled: true,
}

const productFilterReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  let newState = {}
  switch (action.type) {
    case productFilterType.CHANGE_VALUE:
      newState = { ...state }
      newState[action.payload.key] = action.payload.value
      return newState
    default:
      return state
  }
}

export default productFilterReducer
