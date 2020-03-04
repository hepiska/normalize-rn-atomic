import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { categoryActionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'

interface PostState {
  readonly data: Object
  readonly order: Array<number>
  readonly loading: Boolean
  readonly error?: ErrorType
}

const initialState: any = {
  data: Immutable({}),
  order: Immutable([]),
  loading: false,
  error: null,
}

const categoryReducer: Reducer<PostState> = (
  state: PostState = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case categoryActionType.SET_CATEGORY_DATA:
      newState.data = Immutable.merge(newState.data, action.payload)
      return newState
    case categoryActionType.SET_CATEGORY_ORDER:
      if (
        !newState.order.length ||
        (action.payload.pagination.total &&
          newState.order < action.payload.pagination.total)
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      }
      return newState
    case categoryActionType.SET_CATEGORY_LOADING:
      newState.loading = action.payload
      return newState
    default:
      return newState
  }
}

const categoryersistConfig = {
  key: 'category',
  storage: AsyncStorage,
}

export default persistReducer(categoryersistConfig, categoryReducer)