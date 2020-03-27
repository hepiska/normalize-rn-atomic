import { store } from '@src/init-store'
import { API } from '../action-types'
import { deepClone } from '@utils/helpers'
import { brand } from '../normalize-schema'

export const productFilterType = {
  CHANGE_VALUE: 'product-filter/CHANGE_VALUE',
  CHANGE_SEARCH: 'product-filter/CHANGE_SEARCH',
  SET_SELECTED_PRICE: 'product-filter/SET_SELECTED_PRICE',
  SET_SELECTED_COLLECTION: 'product-filter/SET_SELECTED_COLLECTION',
  ADD_DATA: 'product-filter/ADD_DATA',
  FETCH_PRODUCT: 'product-filter/FETCH_PRODUCT',
  CHANGE_SELECTED_BRAND: 'product-filter/CHANGE_SELECTED_BRAND',
  SET_FILTER: 'product-filter/SET_FILTER',
  CLEAR_FILTER: 'product-filter/CLEAR_FILTER',
  SET_BRAND_FILTER: 'product-filter/SET_BRAND_FILTER',
  SET_COUNTED_PRODUCT: 'product-filter/SET_COUNTED_PRODUCT',
  SET_APPLIED_FILTER: 'product-filter/SET_APPLIED_FILTER',
  CHANGE_SELECTED_CATEGORY: 'product-filter/CHANGE_SELECTED_CATEGORY',
}

interface PriceFilter {
  max_price: number
  min_price: number
}

interface ProductFilter {
  brands: Array<number>
  category: Array<number>
  price: PriceFilter
}
export const changeValue = (data: any) => ({
  type: productFilterType.CHANGE_VALUE,
  payload: data,
})

export const changeSearch = (data: any) => ({
  type: productFilterType.CHANGE_SEARCH,
  payload: data,
})

export const setSelectedCollection = data => ({
  type: productFilterType.SET_SELECTED_COLLECTION,
  payload: data,
})

const setCountedProducts = (data: any) => {
  return {
    type: productFilterType.SET_COUNTED_PRODUCT,
    payload: data,
  }
}

export const fetchCountProduct = params => {
  const globState = deepClone(store.getState())

  const _params = {
    ...globState.productFilter.selected,
    ...globState.productFilter.selected.prices,
    ...params,
  }
  delete _params.prices
  return {
    type: API,
    payload: {
      url: '/products',
      requestParams: { params: _params },
      startNetwork: () => {
        return setCountedProducts({ type: 'isLoading', value: true })
      },
      success: (_, { pagination }) => {
        return [
          setCountedProducts({ type: 'count', value: pagination.total }),
          setCountedProducts({ type: 'isLoading', value: false }),
        ]
      },
    },
  }
}

export const setSelectedPrice = (data: { type: string; value: number }) => {
  return {
    type: productFilterType.SET_SELECTED_PRICE,
    payload: data,
  }
}

export const applyFilter = () => {
  return [
    {
      type: productFilterType.SET_APPLIED_FILTER,
    },
    changeValue({ key: 'isOpen', value: false }),
  ]
}

export const changeSelectedBrand = (data: number) => {
  return {
    type: productFilterType.CHANGE_SELECTED_BRAND,
    payload: data,
  }
}

export const changeSelectedCategory = (data: number) => {
  return {
    type: productFilterType.CHANGE_SELECTED_CATEGORY,
    payload: data,
  }
}

export const setFilter = (data: ProductFilter) => {
  return {
    type: productFilterType.SET_FILTER,
    payload: data,
  }
}

export const setBrandFilter = (data: any) => {
  const globState = store.getState()
  let brands = data || []
  brands = brands
    .map(brandId => globState.brands.data[brandId])
    .reduce((acc, current) => {
      if (acc[current.name[0]]) {
        acc[current.name[0]].data.push(current)
      } else {
        acc[current.name[0]] = { data: [current] }
      }
      return acc
    }, {})
  brands = Object.keys(brands)
    .map(key => ({
      title: key,
      data: brands[key].data,
    }))
    .sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    })

  return {
    type: productFilterType.SET_BRAND_FILTER,
    payload: brands,
  }
}

export const addFilterData = (data: {
  type: string
  value: Array<number> | PriceFilter
}) => {
  return {
    type: productFilterType.ADD_DATA,
    payload: data,
  }
}

export const clearFilter = () => ({ type: productFilterType.CLEAR_FILTER })

export const openFilter = (data: any) => [
  changeValue({ key: 'isOpen', value: true }),
  changeValue({ key: 'section', value: data }),
]
