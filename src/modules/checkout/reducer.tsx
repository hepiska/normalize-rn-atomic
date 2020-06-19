import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { checkoutActionType } from './action'
import { deepClone } from '@utils/helpers'

interface CheckoutState {
  readonly data: Object
  readonly order: Array<number>
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: {
    address_id: null,
    warehouse: Immutable({}),
  },
  order: Immutable([]),
  loading: false,
  error: null,
}

const checkoutReducer: Reducer<CheckoutState> = (
  state: CheckoutState = { ...initialState },
  action: AnyAction,
) => {
  let newState = { ...state }
  switch (action.type) {
    case checkoutActionType.SET_CHECKOUT_ADDRESS_DATA:
      newState.data['address_id'] = Immutable(action.payload)
      return newState
    case checkoutActionType.ADD_SHIPPING_METHOD_DATA:
      if (!newState.data['warehouse'][action.payload.id]) {
        newState.data['warehouse'] = Immutable.merge(
          newState.data['warehouse'],
          { [action.payload.id]: action.payload },
        )
      } else {
        const newData = {}
        newData[action.payload.id] = {
          ...deepClone(newState.data['warehouse'][action.payload.id]),
          ...action.payload,
        }
        newState.data['warehouse'] = Immutable.merge(
          newState.data['warehouse'],
          Immutable.replace(newState.data['warehouse'], newData),
        )
      }
      return newState
    case checkoutActionType.REMOVE_SHIPPING_DATA:
      const newData = { ...deepClone(newState.data['warehouse']) }
      delete newData[action.payload.id]
      newState.data['warehouse'] = newData
      return newState
    case checkoutActionType.REMOVE_CHECKOUT_DATA:
      newState.data['address_id'] = Immutable(null)
      newState.data['warehouse'] = Immutable({})
      return newState
    case checkoutActionType.SET_CHECKOUT_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case checkoutActionType.UPDATE_COURIER_DATA:
      const newWarehouseData =
        newState.data['warehouse'][action.payload.warehouseId]
      const newShippingMethod = action.payload.shipping.shipping_methods.find(
        item => item.id === newWarehouseData.shipping.courier.id,
      )

      if (newShippingMethod) {
        newWarehouseData.shipping.courier = newShippingMethod

        newState.data['warehouse'][
          action.payload.warehouseId
        ] = newWarehouseData
      }
      return newState
    case checkoutActionType.SET_CHECKOUT_LOADING:
      newState.loading = action.payload
      return newState
    case checkoutActionType.SET_ERROR:
      newState.error = action.payload
      return newState
    case checkoutActionType.SET_DEFAULT:
      return newState
    default:
      return state
  }
}

export default checkoutReducer
