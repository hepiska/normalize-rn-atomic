import { AnyAction, Reducer } from 'redux'
import { productFilterType } from './action'

const initialState = {
  isScrollEnabled: true,
}

const productFilterReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case productFilterType.CHANGE_VALUE:
      newState[action.payload.key] = action.payload.value
      return newState
    default:
      return newState
  }
}

export default productFilterReducer
