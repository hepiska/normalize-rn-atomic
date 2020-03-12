import { AnyAction, Reducer } from 'redux'
import { productFilterType } from './action'

const initialState = {
  isOpen: false,
  section: 'brand',
  selected: {
    price: {
      min: 0,
      max: 10000000,
    },
  },
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
    case productFilterType.CHANGE_PRICE:
      newState.selected.price[action.payload.type] = action.payload.value
      return { ...newState }
    default:
      return newState
  }
}

export default productFilterReducer
