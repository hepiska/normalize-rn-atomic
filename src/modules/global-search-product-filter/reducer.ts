import { AnyAction, Reducer } from 'redux'
import { actionType } from './action'
import { deepClone } from '@utils/helpers'
import { contextMaping } from '@utils/constants'

const initialState = {
  order: {
    prices: {
      maximum_price: 15000000,
      minimum_price: 0,
    },
  },
  initialFilter: {},
  countedProducts: {
    isLoading: false,
    count: 0,
  },
  loading: false,
  error: null,
  applied: {
    prices: {
      maximum_price: 15000000,
      minimum_price: 0,
    },
  },
  selected: {
    prices: {
      maximum_price: 15000000,
      minimum_price: 0,
    },
  },
  limit: 10,
}

const replaceValue = (data, value) => {
  const newData = data ? data.split(',').map(value => parseInt(value)) : []
  if (newData.includes(value)) {
    const valIdx = newData.indexOf(value)
    newData.splice(valIdx, 1)
  } else {
    newData.push(value)
  }
  return newData.join(',')
}

const productFilterReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state }
  switch (action.type) {
    case actionType.SET_CATEGORY_ORDER:
      newState.order.categories = action.payload

      return newState
    case actionType.ADD_CATEGORY_ORDER:
      newState.order.categories = newState.order.categories.concat(
        action.payload,
      )

      return newState

    case actionType.SET_BRAND_ORDER:
      newState.order.brands = action.payload

      return newState
    case actionType.ADD_BRAND_ORDER:
      newState.order.brands = newState.order.brands.concat(action.payload)

      return newState

    case actionType.SET_PRODUCT_COLOR_ORDER:
      newState.order.colors = action.payload
      return newState

    case actionType.ADD_PRODUCT_COLOR_ORDER:
      newState.order.colors = newState.order.colors.concat(action.payload)
      return newState

    case actionType.SET_SELECTED_CATEGORY:
      newState.selected.category_ids = action.payload
      return newState

    case actionType.SET_COUNTED_PRODUCT:
      newState.countedProducts[action.payload.type] = action.payload.value
      return newState

    case actionType.SET_SELECTED_PRICE:
      newState.selected.prices[action.payload.type] = action.payload.value
      return newState

    case actionType.SET_CONTEXT:
      newState.initialFilter = {
        prices: { ...newState.order.prices },
        ...action.payload,
      }
      return newState

    case actionType.SET_INITIAL_CATEGORY:
      newState.initialFilter = {
        ...newState.initialFilter,
        category_ids: '' + action.payload,
      }
      return newState

    case actionType.UPDATE_SELECTED:
      newState.selected = { ...newState.initialFilter, ...action.payload }
      newState.applied = { ...newState.initialFilter, ...action.payload }

      return newState

    case actionType.CHANGE_SELECTED_CATEGORY:
      const selectedCategoryIds = newState.selected.brand_ids
        ? newState.selected.category_ids
            .split(',')
            .map(value => parseInt(value))
        : []
      if (selectedCategoryIds.includes(action.payload)) {
        let selectedIdx = selectedCategoryIds.indexOf(action.payload)
        selectedCategoryIds.splice(selectedIdx, 1)
      } else {
        selectedCategoryIds.push(action.payload)
      }
      newState.selected.category_ids = selectedCategoryIds.toString()
      newState.selected = newState.selected
      return { ...newState }

    case actionType.CHANGE_CONTEXT:
      const initialFilter = { ...newState.initialFilter }
      const selected = { ...newState.selected }
      const applied = { ...newState.applied }
      // newState.initialFilter.category_ids = replaceValue(
      //   initialFilter.category_ids,
      //   action.payload.id,
      // )
      selected[contextMaping[action.payload.type]] = replaceValue(
        selected.category_ids,
        action.payload.id,
      )
      applied[contextMaping[action.payload.type]] = replaceValue(
        applied.category_ids,
        action.payload.id,
      )

      newState.applied = applied
      newState.selected = selected

      return newState

    case actionType.CHANGE_SELECTED_BRAND:
      const selectedBrandIds = newState.selected.brand_ids
        ? newState.selected.brand_ids.split(',').map(value => parseInt(value))
        : []
      if (selectedBrandIds.includes(action.payload)) {
        let selectedIdx = selectedBrandIds.indexOf(action.payload)
        selectedBrandIds.splice(selectedIdx, 1)
      } else {
        selectedBrandIds.push(action.payload)
      }
      newState.selected.brand_ids = selectedBrandIds.toString()
      newState.selected = newState.selected
      return { ...newState }

    case actionType.CHANGE_SELECTED_COLOR:
      const selectedColorIds = newState.selected.color_ids
        ? newState.selected.color_ids.split(',').map(value => parseInt(value))
        : []
      if (selectedColorIds.includes(action.payload)) {
        let selectedIdx = selectedColorIds.indexOf(action.payload)
        selectedColorIds.splice(selectedIdx, 1)
      } else {
        selectedColorIds.push(action.payload)
      }
      newState.selected.color_ids = selectedColorIds.toString()
      newState.selected = newState.selected
      return { ...newState }

    case actionType.CLEAR_FILTER:
      newState.selected = {
        ...newState.initialFilter,
      }
      newState.applied = deepClone(newState.selected)
      return newState

    case actionType.SET_APPLIED_FILTER:
      newState.applied = deepClone(newState.selected)
      return newState

    default:
      return state
  }
}

export default productFilterReducer
