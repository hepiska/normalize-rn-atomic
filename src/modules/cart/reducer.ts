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

    case actionType.SET_CART_DATA_BEFORE_LOGIN:
      if (action.payload) {
        // delete newState.data[`${action.payload.id}`]
        let replace = false

        const findCart = Object.keys(newState.data).find(key => {
          const value = newState.data[key]

          return value.variant_id === action.payload.variant_id
        })
        if (findCart) {
          newState.data = Immutable.merge(
            newState.data,
            {
              [findCart]: {
                qty: newState.data[findCart].qty + 1,
              },
            },
            { deep: true },
          )
          // newState.data = Immutable(newData)
        } else {
          newState.data = Immutable.merge(newState.data, {
            [`${action.payload.id}`]: {
              ...action.payload,
            },
          })
          newState.order = newState.order.concat(Immutable(action.payload.id))
        }

        console.log('=====', newState)

        // newState.data = Immutable.merge(newState.data, {
        //   [`${action.payload.id}`]: {
        //     ...action.payload,
        //   },
        // })
      }
      return newState

    case actionType.CHANGE_CART_DATA_BEFORE_LOGIN:
      if (action.payload) {
        // delete newState.data[`${action.payload.id}`]
        newState.data = Immutable.merge(newState.data, {
          [`${action.payload.id}`]: {
            ...action.payload,
          },
        })
      }
      return newState

    case actionType.SET_CART_ORDER_BEFORE_LOGIN:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState

    case actionType.REMOVE_CART_BEFORE_LOGIN:
      delete newState.data[action.payload]
      newState.order = Immutable(
        newState.order.filter(_order => _order !== action.payload),
      )
      return newState

    case actionType.CLEAR_CART:
      return initialState

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
        newState.order = newState.order.concat(Immutable([action.payload]))
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
      return state
  }
}

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
}

export default cartReducer
//  persistReducer(cartPersistConfig, cartReducer)
