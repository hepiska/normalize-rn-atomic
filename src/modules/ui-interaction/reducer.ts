import { AnyAction, Reducer } from 'redux'
import { actionType } from './action'

const initialState = {
  isScrollEnabled: true,
  baner: {
    isOpen: false,
    activebanerIdx: 0,
    baners: [{ id: 1, name: 'register-promo' }],
  },
}

const productFilterReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  let newState = { ...state }
  const newBanner = { ...newState.baner }
  const { payload } = action
  switch (action.type) {
    case actionType.CHANGE_VALUE:
      newState = { ...state }
      newState[action.payload.key] = action.payload.value
      return newState
    case actionType.OPEN_BANER:
      newBanner.isOpen = payload

      newState.baner = newBanner
      return newState
    case actionType.CHANGE_ACTIVE_BANER:
      newBanner.activebanerIdx = payload
      newState.baner = newBanner
      return newState
    case actionType.CHANGE_BANER_CONTENT:
      newBanner.data = newBanner.data.map(_data => {
        if (_data.id === payload.id) {
          _data = payload
        }
        return _data
      })
      newState.baner = newBanner
      return newState
    default:
      return state
  }
}

export default productFilterReducer
