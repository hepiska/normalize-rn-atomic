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
  activePage: {},
  selected: {
    collection_ids: '',
    brand_ids: '',
    prices: {
      maximum_price: 10000000,
      minimum_price: 0,
    },
  },
  applied: {
    collection_ids: '',
    brand_ids: '',
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
  const newState = { ...state }
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

    case productFilterType.SET_ACTIVE_PAGE:
      const newActive = {}
      newActive[action.payload.type] = action.payload.ids.join(',')
      // newActive[action.payload.type] = action.payload.ids.join(',')
      newState.activePage = { ...newActive }
      return newState

    case productFilterType.CLEAR_ACTIVE_PAGE:
      newState.activePage = {}
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

    case productFilterType.RESET_SELECTED_COLLECTION:
      newState.selected.collection_ids = ''
      return newState

    case productFilterType.CHANGE_SELECTED_CATEGORY:
      const selectedCategoryIds = selected.category_ids
        ? selected.category_ids.split(',').map(value => parseInt(value))
        : []
      if (selectedCategoryIds.includes(action.payload)) {
        let selectedIdx = selectedCategoryIds.indexOf(action.payload)
        selectedCategoryIds.splice(selectedIdx, 1)
      } else {
        selectedCategoryIds.push(action.payload)
      }
      selected.category_ids = selectedCategoryIds.toString()
      newState.selected = selected

      return newState

    case productFilterType.SET_SELECTED_CATEGORY:
      selected.category_ids = action.payload
      newState.selected = selected
      return newState

    case productFilterType.CHANGE_SELECTED_BRAND:
      const selectedBrandIds = selected.brand_ids
        ? selected.brand_ids.split(',').map(value => parseInt(value))
        : []
      if (selectedBrandIds.includes(action.payload)) {
        let selectedIdx = selectedBrandIds.indexOf(action.payload)
        selectedBrandIds.splice(selectedIdx, 1)
      } else {
        selectedBrandIds.push(action.payload)
      }
      selected.brand_ids = selectedBrandIds.toString()
      newState.selected = selected
      return { ...newState }

    case productFilterType.CLEAR_FILTER:
      newState.selected = {
        ...initialState.selected,
        prices: newState.selected.prices,
        collection_ids: newState.activePage.collection_ids || '',
        category_ids: newState.activePage.category_ids || '',
        brand_ids: newState.activePage.brand_ids || '',
      }
      newState.search = ''
      newState.applied = deepClone(newState.selected)
      return newState

    case productFilterType.SET_APPLIED_FILTER:
      newState.applied = deepClone(newState.selected)
      newState.search = ''
      return newState
    default:
      return state
  }
}

export default productFilterReducer
