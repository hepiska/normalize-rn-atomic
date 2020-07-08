import { AnyAction, Reducer } from 'redux'
import { actionType } from './action'

const initialState = {
  searchKey: '',
  skip: {},
  limit: 10,
  activeTab: 0,
}

const productFilterReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.SET_SEARCH_KEY:
      newState.searchKey = action.payload
      return newState
    case actionType.SET_ACTIVE_TAB:
      newState.activeTab = action.payload
      return newState
    case actionType.SET_SKIP:
      newState.skip = action.payload
      return newState
    case actionType.RESET_SKIP:
      newState.skip[action.payload] = 0
      return newState
    default:
      return state
  }
}

export default productFilterReducer
