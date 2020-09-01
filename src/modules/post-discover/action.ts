import { dispatchPostEntities } from '../entities-action-dispacer'
import { API } from '../action-types'
import * as schema from '../normalize-schema'
import { categoryIds } from '@src/utils/constants'

export const actionType = {
  FETCH: 'post-discover/FETCH',
  SET_DISCOVER_ORDER: 'post-discover/SET_ORDER',
  FETCH_START: 'post-discover/FETCH_START',
  SET_DISCOVER_LOADING: 'post-discover/SET_USER_LOADING',
  CLEAR_DISCOVER: 'post-discover/CLEAR_POST',
  SET_PAGINATION: 'post-discover/SET_PAGINATION',
  ADD_DISCOVER_ORDER: 'post-discover/ADD_ORDER',
  ERROR: 'post-discover/ERROR',
  DEFAULT: 'post-discover/DEFAULT',
  SET_SPECIFIC_LOADING: 'post-discover/SET_SPECIFIC_LOADING',
  SET_SPECIFIC_QUERY: 'post-discover/SET_SPECIFIC_QUERY',
  SET_SPECIFIC_PAGINATION: 'post-discover/SET_SPECIFIC_PAGINATION',
  SET_TAB_NAME: 'post-discover/SET_TAB_NAME',
  SET_SPECIFIC_MENU: 'post-discover/SET_SPECIFIC_MENU',
}

export const setDicoverOrder = (data: any) => ({
  type: actionType.SET_DISCOVER_ORDER,
  payload: data,
})

const setPagination = (data: any) => ({
  type: actionType.SET_PAGINATION,
  payload: data,
})

export const addDicoverOrder = (data: any) => ({
  type: actionType.ADD_DISCOVER_ORDER,
  payload: data,
})

export const setDicoverLoading = (data: any) => ({
  type: actionType.SET_DISCOVER_LOADING,
  payload: data,
})

export const setSpecificLoading = (data: any) => ({
  type: actionType.SET_SPECIFIC_LOADING,
  payload: data,
})

export const setSpecificQuery = (data: any) => ({
  type: actionType.SET_SPECIFIC_QUERY,
  payload: data,
})

export const setSpecificPagination = (data: any) => ({
  type: actionType.SET_SPECIFIC_PAGINATION,
  payload: data,
})

export const setTabName = (data: any) => ({
  type: actionType.SET_TAB_NAME,
  payload: data,
})

export const setMenu = (data: any) => ({
  type: actionType.SET_SPECIFIC_MENU,
  payload: data,
})

export const fetchDicover = (params: any = {}) => {
  const url = '/posts/v2'

  return {
    type: API,
    payload: {
      url,
      schema: [schema.post],
      requestParams: { params },
      startNetwork: () => {
        return setDicoverLoading(true)
      },
      endNetwork: () => {
        return setDicoverLoading(false)
      },
      success: (data, { pagination }) => {
        const composeAction = [
          ...dispatchPostEntities(data.entities),
          setPagination(pagination),
        ]
        if (!params.offset) {
          composeAction.push(setDicoverOrder(data.result))
        } else {
          composeAction.push(addDicoverOrder(data.result))
        }
        return composeAction
      },
    },
  }
}

export const fetchSpecificPosts = (
  params: any = {},
  type,
  isFresh: boolean = true,
) => {
  const url = '/posts/v2'
  const newParams = isFresh
    ? { limit: params.limit, offset: params.offset, type: params.type }
    : params.next_token
    ? { next_token: params.next_token }
    : { limit: params.limit, offset: params.offset, type: params.type }

  switch (type) {
    case 'fashion':
      newParams['category_id'] = categoryIds.fashion
      break
    case 'beauty':
      newParams['category_id'] = categoryIds.beauty
      break
    default:
      newParams['category_id'] = params.category_id
      break
  }

  return {
    type: API,
    payload: {
      url,
      schema: [schema.post],
      requestParams: { params: newParams },
      startNetwork: () => {
        return setSpecificLoading({ uri: type, data: true })
      },
      endNetwork: () => {
        return setSpecificLoading({ uri: type, data: false })
      },
      success: (data, { pagination }) => {
        const composeAction = [
          ...dispatchPostEntities(data.entities),
          setSpecificPagination({ uri: type, data: pagination.next_token }),
          setSpecificQuery({
            uri: type,
            data: data.result,
            isFresh,
          }),
        ]
        return composeAction
      },
    },
  }
}
