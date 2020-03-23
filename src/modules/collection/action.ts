import { QueryParams } from '@utils/globalInterface'
import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
import { setProductData } from '@modules/product/action'

import { API } from '../action-types'

import * as schema from '@modules/normalize-schema'

export const collectionActionType = {
  FETCH: 'collection/FETCH',
  SET_COLLECTION_DATA: 'collection/SET_COLLECTION_DATA',
  SET_COLLECTION_ORDER: 'collection/SET_COLLECTION_ORDER',
  FETCH_START: 'collection/FETCH_START',
  SET_COLLECTION_LOADING: 'collection/SET_USER_LOADING',
  ERROR: 'collection/ERROR',
}

export const setCollectionData = (data: any) => ({
  type: collectionActionType.SET_COLLECTION_DATA,
  payload: data,
})

export const setCollectionOrder = (data: any) => ({
  type: collectionActionType.SET_COLLECTION_ORDER,
  payload: data,
})

export const setCollectionLoading = (data: any) => ({
  type: collectionActionType.SET_COLLECTION_LOADING,
  payload: data,
})

// export const getCollectionBySlug = () => (slug, params) => ({
//   type: API,
//   payload: {
//     url: '/collections/' + slug,
//     requestParams: { params },
//     schema: schema.collection,
//     startNetwork: () => {
//       return setCollectionLoading(true)
//     },

//     success: data => {
//       return [
//         // setBrandData(data.entities.brand),
//         // setCategoryData(data.entities.category),
//         // setProductData(data.entities.product),
//         // setCollectionData(data.entities.collection),
//         // setCollectionLoading(false),
//       ]
//     },
//   },
// })

export const getCollectionBySlug = slug => ({
  type: API,
  payload: {
    url: '/collections/' + slug,
    schema: schema.collection,
    startNetwork: () => {
      return setCollectionLoading(true)
    },

    success: data => {
      return [
        setBrandData(data.entities.brand),
        setCategoryData(data.entities.category),
        setProductData(data.entities.product),
        setCollectionData(data.entities.collection),
        setCollectionLoading(false),
      ]
    },
  },
})

export const collectionApi = (params, url) => ({
  type: API,
  payload: {
    url: url || '/collections',
    requestParams: { params },
    schema: [schema.collection],
    startNetwork: () => {
      return setCollectionLoading(true)
    },

    success: (data, { pagination }) => {
      return [
        setBrandData(data.entities.brand),
        setCategoryData(data.entities.category),
        setProductData(data.entities.product),
        setCollectionData(data.entities.collection),
        setCollectionOrder({ order: data.result, pagination }),
        setCollectionLoading(false),
      ]
    },
  },
})
