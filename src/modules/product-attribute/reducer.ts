import { AnyAction, Reducer } from 'redux'
import Immutable from 'seamless-immutable'
import { ErrorType } from '@utils/globalInterface'
import { attributeActionType } from './action'
import { deepClone } from '@utils/helpers'

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

const productAttributeReducer: Reducer<PostState> = (
  state: PostState = deepClone(initialState),
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case attributeActionType.SET_ATTRIBUTE_DATA:
      if (action.payload)
        newState.data = Immutable.merge(newState.data, action.payload, {
          deep: true,
        })
      return newState
    case attributeActionType.SET_ATTRIBUTE_ORDER:
      if (
        !newState.order.length ||
        (action.payload.pagination.total &&
          newState.order < action.payload.pagination.total)
      ) {
        newState.order = newState.order.concat(Immutable(action.payload.order))
      }
      return newState
    case attributeActionType.SET_LOADING:
      newState.loading = action.payload
      return newState
    default:
      return newState
  }
}

export default productAttributeReducer
