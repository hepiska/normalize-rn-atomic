import { AnyAction, Reducer } from 'redux'
import { productFilterType } from './action'
import { deepClone } from '@utils/helpers'

const initialState = {
  isOpen: false,
  countedProducts: {
    isLoading: false,
    count: 0,
  },
  search: '',
  section: 'brand',
  data: {},
  selected: {
    collection_ids: '',
    prices: {
      maximum_price: 10000000,
      minimum_price: 0,
    },
  },
  applied: {
    collection_ids: '',
    prices: {
      maximum_price: 10000000,
      minimum_price: 0,
    },
  },
}

const productFilterReducer: Reducer<any> = (
  state: any = { ...initialState },
  action: AnyAction,
) => {
  const newState = deepClone(state)
  const selected = newState.selected

  switch (action.type) {
    case productFilterType.CHANGE_VALUE:
      newState[action.payload.key] = action.payload.value
      return newState
    case productFilterType.CHANGE_SEARCH:
      newState.search = action.payload
      return newState
    case productFilterType.SET_SELECTED_PRICE:
      newState.selected.prices[action.payload.type] = action.payload.value
      return newState

    case productFilterType.SET_FILTER:
      newState.data = action.payload
      if (action.payload.prices) {
        newState.selected.prices = action.payload.prices
      }
      return newState

    case productFilterType.SET_BRAND_FILTER:
      newState.data.brands = action.payload
      return newState

    case productFilterType.SET_COUNTED_PRODUCT:
      newState.countedProducts[action.payload.type] = action.payload.value
      return newState

    case productFilterType.ADD_DATA:
      const data = newState.data
      data[action.payload.type]
      if (data[action.payload.type]) {
        data[action.payload.type] = data[action.payload.type].concat(
          action.payload.value,
        )
      } else {
        data[action.payload.type] = action.payload.value
      }
      return { ...newState, data }

    case productFilterType.SET_SELECTED_COLLECTION:
      if (!selected.collection_ids.includes(action.payload)) {
        selected.collection_ids += action.payload + ','
      }

      return newState
    case productFilterType.CHANGE_SELECTED_CATEGORY:
      if (!selected.category_ids) {
        selected.category_ids = ',' + action.payload
      } else if (selected.category_ids.includes(action.payload)) {
        const regex = new RegExp(`(,${action.payload})|(${action.payload})`)
        selected.category_ids = selected.category_ids.replace(regex, '')
      } else {
        selected.category_ids += ',' + action.payload
      }
      selected.category_ids = selected.category_ids.replace(/(^,)|(,$)/g, '')
      newState.selected = selected

      return newState

    case productFilterType.CHANGE_SELECTED_BRAND:
      if (!selected.brand_ids) {
        selected.brand_ids = ',' + action.payload
      } else if (selected.brand_ids.includes(action.payload)) {
        const regex = new RegExp(`(,${action.payload})|(${action.payload})`)
        selected.brand_ids = selected.brand_ids.replace(regex, '')
      } else {
        selected.brand_ids += ',' + action.payload
      }
      selected.brand_ids = selected.brand_ids.replace(/(^,)|(,$)/g, '')
      newState.selected = selected
      return { ...newState }

    case productFilterType.CLEAR_FILTER:
      newState.selected = {
        ...initialState.selected,
        prices: newState.selected.prices,
        collection_ids: newState.selected.collection_ids,
      }
      newState.search = ''
      newState.applied = newState.selected
      return newState

    case productFilterType.SET_APPLIED_FILTER:
      newState.applied = newState.selected
      newState.search = ''
      return newState
    default:
      return newState
  }
}

export default productFilterReducer
