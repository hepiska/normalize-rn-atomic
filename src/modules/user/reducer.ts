import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { userActionType } from './action'
import { deepClone } from '@src/utils/helpers'

interface UserState {
  readonly data: Object
  reachedEnd: boolean
  readonly trendingOrder: Object
  readonly order: Array<number>
  readonly specificUserOrder: Object
  readonly notification: Object
  pagination: Object
  specificUserPagination: Object
  loadings: Object
  readonly loading: Boolean
  readonly error?: ErrorType
  readonly recommendedUserOrer?: Array<number>
}
const initialState: UserState = {
  data: Immutable({}),
  order: Immutable([]),
  specificUserOrder: Immutable({}),
  reachedEnd: false,
  trendingOrder: Immutable([]),
  notification: Immutable({}),
  pagination: {},
  specificUserPagination: {},
  loadings: {},
  loading: false,
  error: null,
  recommendedUserOrer: Immutable([])
}

const userReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case userActionType.SET_USER_DATA:
      newState.data = Immutable.merge(newState.data, action.payload, {
        deep: true,
      })
      return newState

    case userActionType.CHANGE_FOLLOW_DATA:
      const newData = {}
      newData[action.payload.user_id] = {
        ...newState.data[action.payload.user_id],
        is_followed: action.payload.is_followed,
      }
      newState.data = Immutable.merge(
        newState.data,
        Immutable.replace(newState.data, newData),
      )
      return newState

    case userActionType.SET_TRENDING_INSIDER_ORDER:
      newState.trendingOrder = Immutable(action.payload)
      return newState

    case userActionType.SET_USER_LOADINGS:
      const newLoadings = { ...newState.loadings }
      newLoadings[action.payload.name] = action.payload.value
      newState.loadings = newLoadings
      return newState

    case userActionType.SET_USER_ORDER:
      newState.order = Immutable(action.payload)
      return newState

    case userActionType.SET_SPECIFIC_USER_ORDER:
      newState.specificUserOrder = Immutable.merge(newState.specificUserOrder, {
        [action.payload.userid]: action.payload.order,
      })
      return newState

    case userActionType.CLEAR_USER_ORDER:
      newState.order = Immutable([])
      return newState

    case userActionType.SET_USER_ORDER_PAGINATION:
      newState.order = newState.order.concat(Immutable(action.payload.order))
      newState.pagination = action.payload.pagination
      return newState

    case userActionType.SET_SPECIFIC_USER_ORDER_PAGINATION:
      const newSpecificOrder = Immutable.asMutable(newState.specificUserOrder)
      const index = action.payload.userid

      if (index) {
        newSpecificOrder[index] = newState.specificUserOrder[
          action.payload.userid
        ].concat(action.payload.order)
      }
      newState.specificUserOrder = Immutable(newSpecificOrder)
      return newState
    case userActionType.REMOVE_USER_ORDER:
      newState.order = Immutable(
        newState.order.filter(_order => _order !== action.payload),
      )
      return newState

    case userActionType.ADD_USER_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState

    case userActionType.SET_USER_LOADING:
      newState.loading = action.payload
      return newState
    case userActionType.SET_USER_NOTIFICATION:
      newState.notification = Immutable.merge(
        newState.notification,
        action.payload,
      )
      return newState
    case userActionType.SET_RECOMMENDED_USER_ORDER:
      newState.recommendedUserOrer = Immutable.merge(action.payload)
      return newState
    default:
      return state
  }
}

export default userReducer
