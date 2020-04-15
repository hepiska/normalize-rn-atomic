import { API } from '../action-types'
import { setBrandData } from '../brand/action'
import { setProductData } from '../product/action'
import * as schema from '@modules/normalize-schema'

export const attributeActionType = {
  SET_ATTRIBUTE_DATA: 'product-attribute/SET_ATTRIBUTE_DATA',
  SET_ATTRIBUTE_ORDER: 'product-attribute/SET_ATTRIBUTE_ORDER',
  FETCH_START: 'product-attribute/FETCH_START',
  SET_LOADING: 'product-attribute/SET_CATEGORY_LOADING',
  ERROR: 'product-attribute/ERROR',
}

export const setProductAttributeData = (data: any) => {
  return {
    type: attributeActionType.SET_ATTRIBUTE_DATA,
    payload: data,
  }
}
export const setProductAttributeError = (data: any) => ({
  type: attributeActionType.ERROR,
  payload: data,
})

export const setProductAttributeOrder = (data: any) => ({
  type: attributeActionType.SET_ATTRIBUTE_ORDER,
  payload: data,
})

export const setProductAttributeLoading = (data: any) => ({
  type: attributeActionType.SET_LOADING,
  payload: data,
})

// export const getProductAttribute = id => ({
//   type: API,
//   payload: {
//     url: '/categories/' + id,
//     schema: schema.detailCategory,
//     startNetwork: () => {
//       return setProductAttributeLoading(true)
//     },
//     endNetwork: (status, error) => {
//       if (status === 'error') {
//         return [
//           setProductAttributeLoading(true),
//           setProductAttributeError(error),
//         ]
//       }
//       return setProductAttributeLoading(true)
//     },
//     success: data => {
//       return [
//         setBrandData(data.entities.brand),
//         setProductData(data.entities.product),
//         setProductAttributeData(data.entities.category),
//       ]
//     },
//   },
// })
