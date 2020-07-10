import { store } from '@src/init-store'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { deepClone } from '@utils/helpers'
import { setCategoryData } from '../category/action'
import { setBrandData } from '../brand/action'

import { category } from '@modules/normalize-schema'
import { setCheckoutLoading } from '../checkout/action'

export const actionType = {
  SET_CATEGORY_ORDER: 'global_search_product_filter/SET_CATEGORY_ORDER',
  ADD_CATEGORY_ORDER: 'global_search_product_filter/ADD_CATEGORY_ORDER',
  SET_LOADING: 'global_search_product_filter/SET_LOADING',
  SET_SELECTED_CATEGORY: 'global_search_product_filter/SET_SELECTED_CATEGORY',
  SET_COUNTED_PRODUCT: 'global_search_product_filter/SET_COUNTED_PRODUCT',
  SET_APPLIED_FILTER: 'global_search_product_filter/SET_APPLIED_FILTER',
  CLEAR_FILTER: 'global_search_product_filter/CLEAR_FILTER',
  SET_SELECTED_PRICE: 'global_search_product_filter/SET_SELECTED_PRICE',
  ADD_BRAND_ORDER: 'global_search_product_filter/ADD_BRAND_ORDER',
  SET_BRAND_ORDER: 'global_search_product_filter/SET_BRAND_ORDER',
  CHANGE_SELECTED_BRAND: 'global_search_product_filter/CHANGE_SELECTED_BRAND',
  SET_PRODUCT_COLOR_ORDER: 'global_search_product_filter/SET_PRODUCT_COLOR',
  ADD_PRODUCT_COLOR_ORDER: 'global_search_product_filter/ADD_PRODUCT_COLOR',
  CHANGE_SELECTED_COLOR: 'global_search_product_filter/CHANGE_SELECTED_COLOR',
  UPDATE_SELECTED: 'global_search_product_filter/UPDATE_SELECTED',
  SET_CONTEXT: 'global_search_product_filter/SET_CONTEXT',
  SET_INITIAL_CATEGORY: 'global_search_product_filter/SET_INITIAL_CATEGORY',
  CHANGE_CONTEXT: 'global_search_product_filter/CHANGE_CONTEXT',
  CHANGE_SELECTED_CATEGORY:
    'global_search_product_filter/CHANGE_SELECTED_CATEGORY',
}

const setLoading = data => ({
  type: actionType.SET_LOADING,
  payload: data,
})

export const setInitialCategory = data => ({
  type: actionType.SET_INITIAL_CATEGORY,
  payload: data,
})

export const setSelectedCategory = data => {
  return {
    type: actionType.SET_SELECTED_CATEGORY,
    payload: data,
  }
}

export const changeSelectedCategory = data => {
  return {
    type: actionType.CHANGE_SELECTED_CATEGORY,
    payload: data,
  }
}

export const updateSelected = data => ({
  type: actionType.UPDATE_SELECTED,
  payload: data,
})

export const setInitialFilter = (data: any) => ({
  type: actionType.SET_CONTEXT,
  payload: data,
})

export const changeSelectedBrand = (data: number) => {
  return {
    type: actionType.CHANGE_SELECTED_BRAND,
    payload: data,
  }
}

export const changeContext = (data: any) => ({
  type: actionType.CHANGE_CONTEXT,
  payload: data,
})

export const changeSelectedColor = (data: number) => {
  return {
    type: actionType.CHANGE_SELECTED_COLOR,
    payload: data,
  }
}

export const applyFilter = () => {
  return {
    type: actionType.SET_APPLIED_FILTER,
  }
}

export const clearFilter = () => ({ type: actionType.CLEAR_FILTER })

const setCategoryOrder = data => ({
  type: actionType.SET_CATEGORY_ORDER,
  payload: data,
})

const addCategoryOrder = data => ({
  type: actionType.ADD_CATEGORY_ORDER,
  payload: data,
})

const setCountedProducts = (data: any) => {
  return {
    type: actionType.SET_COUNTED_PRODUCT,
    payload: data,
  }
}

const setProductColor = data => {
  return {
    type: actionType.SET_PRODUCT_COLOR_ORDER,
    payload: data,
  }
}

const addBrandOrder = data => ({
  type: actionType.ADD_BRAND_ORDER,
  payload: data,
})

const setBrandOrder = (data: any) => {
  return {
    type: actionType.SET_BRAND_ORDER,
    payload: data,
  }
}

export const setSelectedPrice = (data: { type: string; value: number }) => {
  return {
    type: actionType.SET_SELECTED_PRICE,
    payload: data,
  }
}

export const getproductCategory = params => {
  return {
    type: API,
    payload: {
      url: 'categories/featured',
      schema: [schema.category],
      requestParams: { params },
      startNetwork: () => {
        return setLoading(true)
      },
      endNetwork: () => {
        return setLoading(false)
      },
      success: (data, res) => {
        const dispatch = [setCategoryData(data.entities.category)]
        if (!data.result.length && params.offset > 0) {
          return setLoading(false)
        }
        // if (params.offset > 0) {
        //   dispatch.push(addCategoryOrder(data.result))
        // } else {
        //   dispatch.push(setCategoryOrder(data.result))
        // }
        dispatch.push(setCategoryOrder(data.result))
        return dispatch
      },
    },
  }
}

export const getProductBrand = params => {
  return {
    type: API,
    payload: {
      url: '/brands',
      schema: [schema.brand],
      requestParams: {
        params: { ...params, sort_direction: 'asc', sort_by: 'name' },
      },
      startNetwork: () => {
        return setLoading(true)
      },
      endNetwork: () => {
        return setLoading(false)
      },
      success: (data, res) => {
        const dispatch = [setBrandData(data.entities.brand)]
        if (!data.result.length && params.offset > 0) {
          return setLoading(false)
        }

        if (params.offset > 0) {
          dispatch.push(addBrandOrder(data.result))
        } else {
          dispatch.push(setBrandOrder(data.result))
        }
        return dispatch
      },
    },
  }
}

export const getProductColor = params => {
  return {
    type: API,
    payload: {
      url: '/products/color-families',
      requestParams: { params },
      startNetwork: () => {
        return [setLoading(true)]
      },
      endNetwork: () => {
        return setLoading(false)
      },
      success: (data, res) => {
        return setProductColor(data)
      },
    },
  }
}

export const fetchCountProduct = params => {
  const productFilter = deepClone(store.getState().productFilter)
  const _params = {
    ...productFilter.selected,
    ...productFilter.selected.prices,
    ...params,
    is_commerce: true,
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
