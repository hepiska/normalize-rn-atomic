import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { shipmentActionType } from './action'
import { deepClone } from '@utils/helpers'

interface ShipmentState {
  readonly data: Object
  readonly order: Object
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable({}),
  loading: false,
  error: null,
}

const shipmentReducer: Reducer<ShipmentState> = (
  state: ShipmentState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case shipmentActionType.SET_SHIPMENT_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case shipmentActionType.SET_SHIPMENT_ORDER:
      const newOrder = { ...newState.order }
      newOrder[action.payload.key] = action.payload.data
      newState.order = Immutable(newOrder)
      return newState
    case shipmentActionType.SET_SHIPMENT_LOADING:
      newState.loading = action.payload
      return newState
    case shipmentActionType.SET_DEFAULT:
      return newState
    case shipmentActionType.REMOVE_SHIPMENT_DATA:
      newState.data = Immutable({})
      return newState
    case shipmentActionType.REMOVE_SHIPMENT_ORDER:
      newState.order = Immutable({})
      return newState
    default:
      return state
  }
}

export default shipmentReducer
