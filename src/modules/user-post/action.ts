import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getMe } from '@utils/helpers'

export const actionType = {
  FETCH: 'user-post/FETCH',
  SET_LOADING: 'user-post/SET_LOADING',
  SET_ERROR: 'user-post/SET_ERROR',
  SET_ORDER: 'user-post/SET_ORDER',
}

const setuserPostLoading = data => ({
  type: actionType.SET_LOADING,
  payload: data,
})
const setuserPostError = data => ({ type: actionType.SET_ERROR, payload: data })

const getUserPosts = (uri, params) => {
  return {
    type: API,
    payload: {
      url: '/users/' + getMe().id + '/posts',
    },
  }
}

// export const getProductSaved = () => ({
//   type: API,
//   payload: {
//     url: '/users/' + getMe().id + '/saved',
//     schema: [schema.product],
//     startNetwork: () => productSavedSetLoading(true),
//     success: data => {
//       return [
//         setProductData(data.entities.product),
//         setCategoryData(data.entities.category),
//         setBrandData(data.entities.brand),
//         productSavedSetOrderData(data.result),
//         productSavedSetLoading(false),
//       ]
//     },
//     error: () => {
//       return [productSavedSetLoading(false)]
//     },
//   },
// })
