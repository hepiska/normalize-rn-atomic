import { AnyAction, Reducer } from 'redux'
import { sortActionType } from './action'
import { deepClone } from '@utils/helpers'

interface SortType {
  readonly selected: Object
}

const initialState: any = {
  selected: {
    name: 'Latest',
    id: 'time-desc',
    value: { sort_by: 'date', sort_direction: 'desc' },
  },
}

const productReducer: Reducer<SortType> = (
  state: SortType = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case sortActionType.SET_SELECTED:
      newState.selected = action.payload
      return newState
    default:
      return state
  }
}

export default productReducer
