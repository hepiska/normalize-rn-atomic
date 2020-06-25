import { QueryParams } from '@utils/globalInterface'
import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
import { setProductData } from '@modules/product/action'
import { normalize } from 'normalizr'

import { API } from '../action-types'

import * as schema from '@modules/normalize-schema'

export const collectionActionType = {
  FETCH: 'collection/FETCH',
  SET_COLLECTION_DATA: 'collection/SET_COLLECTION_DATA',
  SET_COLLECTION_ORDER: 'collection/SET_COLLECTION_ORDER',
  FETCH_START: 'collection/FETCH_START',
  SET_ACTIVE_COLLECTION: 'collection/SET_ACTIVE_COLLECTION',
  SET_COLLECTION_LOADING: 'collection/SET_COLLECTION_LOADING',
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

export const setActiveCollection = (data: any) => ({
  type: collectionActionType.SET_ACTIVE_COLLECTION,
  payload: data,
})

export const setCollectionError = (data: any) => ({
  type: collectionActionType.ERROR,
  payload: data,
})

export const getCollectionBySlug = slug => ({
  type: API,
  payload: {
    url: '/collections/' + slug,
    schema: schema.collection,
    startNetwork: () => {
      return [setCollectionLoading(true), setCollectionError(null)]
    },
    endNetwork: (status, error) => {
      if (status === 'error') {
        return [
          setCollectionError(error),
          setActiveCollection(null),
          setCollectionLoading(false),
        ]
      }
      return setCollectionLoading(false)
    },
    success: data => {
      return [
        setActiveCollection(data.result),
        setBrandData(data.entities.brand),
        setCategoryData(data.entities.category),
        setProductData(data.entities.product),
        setCollectionData(data.entities.collection),
      ]
    },
  },
})

export const getSales = () => ({
  type: API,
  payload: {
    url: '/products/sales',
    // schema: schema.collection,
    startNetwork: () => {
      return [setCollectionLoading(true), setCollectionError(null)]
    },
    endNetwork: (status, error) => {
      if (status === 'error') {
        return [
          setCollectionError(error),
          setActiveCollection(null),
          setCollectionLoading(false),
        ]
      }
      return setCollectionLoading(false)
    },
    success: data => {
      // console.log('data', data)
      data.id = 'sales'
      data.title = 'SALE'
      const normalizeCol = normalize(data, schema.collection)
      // console.log(normalizeCol, 'normalizeCol')
      // return [setCollectionLoading(false)]
      return [
        setActiveCollection(normalizeCol.result),
        setBrandData(normalizeCol.entities.brand),
        setCategoryData(normalizeCol.entities.category),
        setProductData(normalizeCol.entities.product),
        setCollectionData(normalizeCol.entities.collection),
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
