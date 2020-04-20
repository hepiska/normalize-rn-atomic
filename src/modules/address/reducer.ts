import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { persistReducer } from 'redux-persist'
import { actionType } from './action'
import AsyncStorage from '@react-native-community/async-storage'
import { ErrorType } from '@utils/globalInterface'
import { deepClone } from '@utils/helpers'

interface NewAddressStateType {
  readonly newAddress: Object
}

const initialState: NewAddressStateType = {
  newAddress: Immutable({}),
}

const newAddressReducer: Reducer<NewAddressStateType> = (
  state = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.SET_NEW_ADDRESS:
      if (action.payload.key) {
        const newNewAddress = newState.newAddress
        newNewAddress[action.payload.key] = action.payload.value
      } else {
        newState.newAddress = Immutable(action.payload)
      }
      return newState
    default:
      return newState
  }
}

export default newAddressReducer
