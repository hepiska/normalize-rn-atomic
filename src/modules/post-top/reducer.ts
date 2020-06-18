import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { topPostActionType } from './action'

const initialState: any = {
  data: {},
  loading: {},
  error: {},
}

const topPostReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case topPostActionType.SET_TOP_POST_DATA:
      newState.data[action.payload.key] = action.payload.data
      return newState
    default:
      return state
  }
}

const postPersistConfig = {
  key: 'top-post',
  storage: AsyncStorage,
}

export default persistReducer(postPersistConfig, topPostReducer)
