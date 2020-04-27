import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'
import { ErrorType } from '@utils/globalInterface'
import { deepClone } from '@utils/helpers'

interface CartStateType {
  readonly data: Object
  readonly order: Array<number>
  readonly error?: ErrorType
  readonly itemError: Object
  activeCart: number
  pagination: Object
  loading: Boolean
}

const initialState: CartStateType = {
  data: Immutable({}),
  order: Immutable([]),
  error: null,
  itemError: Immutable({}),
  pagination: null,
  activeCart: null,
  loading: false,
}

const cartReducer: Reducer<CartStateType> = (
  state: CartStateType = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.SET_CART_DATA:
      if (action.payload)
        newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case actionType.SET_CART_ORDER:
      if (
        action.payload.pagination.offset &&
        action.payload.pagination.total &&
        newState.order.length < action.payload.pagination.total
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      } else {
        newState.order = Immutable(action.payload.order)
      }
      newState.pagination = action.payload.pagination
      return newState
    case actionType.ADD_ONE_CART_ORDER:
      if (!newState.order.includes(action.payload)) {
        newState.order = newState.order.concat(
          Immutable([action.payload.order]),
        )
      }
      return newState
    case actionType.CHANGE_QTY_DATA:
      const newData = {}
      newData[action.payload.cart_id] = {
        ...deepClone(newState.data[action.payload.cart_id]),
        qty: action.payload.qty,
      }

      newState.data = Immutable.merge(
        newState.data,
        Immutable.replace(newState.data, newData),
      )
      return newState
    case actionType.REPLACE_ORDER:
      const neworder = Immutable.asMutable(newState.order)
      const index = neworder.indexOf(action.payload.from)
      if (~index) {
        neworder[index] = action.payload.to
      }
      newState.order = Immutable(neworder)
    case actionType.REMOVE_CART_ORDER:
      newState.order = Immutable(
        newState.order.filter(_order => _order !== action.payload),
      )
      return newState
    case actionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    case actionType.SET_ERROR:
      newState.error = action.payload
      return newState
    default:
      return newState
  }
}

export default cartReducer
