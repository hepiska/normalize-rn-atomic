import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import { postBookmarkActionType } from './action'
import { deepClone } from '@utils/helpers'
import AsyncStorage from '@react-native-community/async-storage'

interface PostBookmarkState {
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

const postLikedReducer: Reducer<PostBookmarkState> = (
  state: PostBookmarkState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case postBookmarkActionType.REMOVE_BOOKMARK_POST:
      newState.data = Immutable.without(newState.data, [action.payload])
      return newState
    case postBookmarkActionType.ADD_BOOKMARK_POST:
      const bookmarkedPost = {}
      bookmarkedPost[action.payload] = action.payload
      newState.data = Immutable.merge(newState.data, bookmarkedPost)
      return newState
    case postBookmarkActionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    default:
      return newState
  }
}

const postPersistConfig = {
  key: 'post-bookmark',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, postLikedReducer)
