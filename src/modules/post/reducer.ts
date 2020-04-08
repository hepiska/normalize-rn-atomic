import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { postActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface PostType {}

interface PostState {
  readonly data: Object
  readonly order: Object
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
}

const postreducer: Reducer<PostState> = (
  state: any = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case postActionType.SET_POST_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case postActionType.SET_POST_ORDER:
      if (
        !newState.order.length ||
        (action.payload.pagination.total &&
          newState.order < action.payload.pagination.total)
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      }
      return newState
    case postActionType.SET_POST_LOADING:
      newState.loading = action.payload
      return newState
    case postActionType.CLEAR_POST:
      return initialState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'post',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, postreducer)
