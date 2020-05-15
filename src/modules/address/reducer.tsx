import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { addressActionType } from './action'
import { deepClone } from '@utils/helpers'

interface AddressState {
  readonly data: Object
  readonly order: Array<number>
  active: number
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  active: null,
  loading: false,
  error: null,
}

const addressReducer: Reducer<AddressState> = (
  state: AddressState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case addressActionType.SET_ADDRESS_DATA:
      if (action.payload.dataActionType !== 'replace') {
        newState.data = Immutable.merge(newState.data, action.payload.data)
      } else {
        newState.data = Immutable.replace(newState.data, action.payload.data)
      }
      return newState
    case addressActionType.SET_ADDRESS_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case addressActionType.SET_ADDRESS_LOADING:
      newState.loading = action.payload
      return newState
    case addressActionType.SET_ACTIVE_ADDRESS:
      newState.active = action.payload
      return newState
    case addressActionType.ERROR:
      newState.error = action.payload
      return newState
    case addressActionType.SET_DEFAULT:
      return newState
    default:
      return newState
  }
}

export default addressReducer
