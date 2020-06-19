import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { postLikedActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'
import CONFIG from 'react-native-config'

interface PostLikedState {
  readonly data: Object
  readonly order: Array<number>
  pagination: Object
  loading: boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  pagination: {},
  loading: false,
  error: null,
}

const postLikedReducer: Reducer<PostLikedState> = (
  state: PostLikedState = { ...initialState },
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case postLikedActionType.SET_ORDER_DATA:
      const OrderData = Immutable(action.payload)
      const objData = Immutable.asObject(OrderData, _data => {
        return [_data, _data]
      })
      newState.data = Immutable.merge(newState.data, objData)
      return newState
    case postLikedActionType.SET_ORDER:
      newState.order = Immutable(action.payload)
      return newState
    case postLikedActionType.ADD_ORDER:
      newState.order = newState.order.concat(Immutable(action.payload))
      return newState
    case postLikedActionType.ADD_LIKED_POST:
      const likedPostObj = {}
      likedPostObj[action.payload] = action.payload
      newState.data = Immutable.merge(newState.data, likedPostObj)
      return newState
    case postLikedActionType.REMOVE_LIKED_POST:
      newState.data = Immutable.without(newState.data, [action.payload])
      return newState

    case postLikedActionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    case postLikedActionType.CLEAR:
      return initialState
    default:
      return state
  }
}

const presistConfig = {
  key: 'post-liked',
  storage: AsyncStorage,
}

const exportReducer =
  CONFIG.USE_PRESIST !== 'false'
    ? persistReducer(presistConfig, postLikedReducer)
    : postLikedReducer

export default exportReducer
