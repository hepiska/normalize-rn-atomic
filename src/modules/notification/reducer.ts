import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { notificationActionType } from './action'

interface LoadingType {
  ecommerce: boolean
  announcement: boolean
  social: boolean
}

interface UserState {
  readonly data: Object
  readonly order_ecommerce: Array<number>
  readonly order_announcement: Array<number>
  readonly order_social: Array<number>
  readonly loading: LoadingType
  readonly error?: ErrorType
  pagination: any
}
const initialState: UserState = {
  data: {
    ecommerce: Immutable({}),
    announcement: Immutable({}),
    social: Immutable({}),
  },
  order_ecommerce: Immutable([]),
  order_announcement: Immutable([]),
  order_social: Immutable([]),
  loading: {
    ecommerce: false,
    announcement: false,
    social: false,
  },
  pagination: {
    ecommerce: {},
    announcement: {},
    social: {},
  },
  error: null,
}

const userReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case notificationActionType.SET_NOTIFICATION_DATA:
      newState.data[action.payload.key] = Immutable.merge(
        newState.data[action.payload.key],
        action.payload.notification,
      )
      return newState
    case notificationActionType.SET_NOTIFICATION_ORDER:
      newState[`order_${action.payload.key}`] = newState[
        `order_${action.payload.key}`
      ].concat(Immutable(action.payload.order))
      newState.pagination[action.payload.key] = action.payload.pagination
      return newState
    case notificationActionType.SET_NOTIFICATION_LOADING:
      newState.loading[action.payload.key] = action.payload.loading
      return newState
    default:
      return state
  }
}

export default userReducer
