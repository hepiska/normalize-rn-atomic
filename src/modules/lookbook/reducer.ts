import { AnyAction, Reducer } from "redux";
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { lookbookActionType } from './action'

interface LookbookType {

}


interface LookBookState {
  readonly data: Object,
  readonly loading: Boolean,
  readonly error?: ErrorType
}


const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null
}


const lookbookReducer: Reducer<LookBookState> = (state: any = initialState, action: AnyAction) => {
  const newState = { ...state }
  switch (action.type) {
    case lookbookActionType.FETCH_START:
      newState.loading = true
      return newState
    case lookbookActionType.FETCH_FINISH:
      newState.loading = false
      console.log('newState.order.length', newState.order.length)
      if (!newState.order.length ||
        action.payload.pagination.total &&
        newState.order < action.payload.pagination.total) {
        newState.data = Immutable.merge(newState.data, action.payload.data)
        newState.order = newState.order.concat(Immutable(action.payload.order))
      }
      return newState
    case lookbookActionType.ERROR:
      newState.error = action.payload
      return newState
    default:
      return newState
  }
}

export default lookbookReducer