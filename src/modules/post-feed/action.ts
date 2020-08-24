import { dispatchPostEntities } from '../entities-action-dispacer'
import { API } from '../action-types'
import * as schema from '../normalize-schema'
import { getMe } from '@utils/helpers'

export const actionType = {
  FETCH: 'post-feed/FETCH',
  SET_FEED_ORDER: 'post-feed/SET_ORDER',
  FETCH_START: 'post-feed/FETCH_START',
  SET_FEED_LOADING: 'post-feed/SET_USER_LOADING',
  CLEAR_FEED: 'post-feed/CLEAR_POST',
  SET_PAGINATION: 'post-feed/SET_PAGINATION',
  ADD_FEED_ORDER: 'post-feed/ADD_ORDER',
  ERROR: 'post-feed/ERROR',
  DEFAULT: 'post-feed/DEFAULT',
}

export const setFeedOrder = (data: any) => ({
  type: actionType.SET_FEED_ORDER,
  payload: data,
})

const setPagination = (data: any) => ({
  type: actionType.SET_PAGINATION,
  payload: data,
})

export const addFeedOrder = (data: any) => ({
  type: actionType.ADD_FEED_ORDER,
  payload: data,
})

export const setFeedLoading = (data: any) => ({
  type: actionType.SET_FEED_LOADING,
  payload: data,
})

export const fetchFeed = (params: any = {}) => {
  const me = getMe().id
  let url = '/posts/feed'
  if (!me) {
    url = '/posts'
  }

  return {
    type: API,
    payload: {
      url,
      schema: [schema.post],
      requestParams: { params },
      startNetwork: () => {
        return setFeedLoading(true)
      },
      endNetwork: () => {
        return setFeedLoading(false)
      },
      success: (data, { pagination }) => {
        if (!data) {
          return setFeedLoading(false)
        }
        const composeAction = [
          ...dispatchPostEntities(data.entities),
          setPagination(pagination),
        ]
        if (!params.offset) {
          composeAction.push(setFeedOrder(data.result))
        } else {
          composeAction.push(addFeedOrder(data.result))
        }
        return composeAction
      },
    },
  }
}
