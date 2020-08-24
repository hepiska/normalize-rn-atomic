import { QueryParams } from '@utils/globalInterface'
import { setUserData } from '../user/action'
import { setTopPostData } from '../post-top/action'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const postActionType = {
  FETCH: 'post/FETCH',
  SET_POST_DATA: 'post/SET_POST_DATA',
  SET_POST_ORDER: 'post/SET_POST_ORDER',
  FETCH_START: 'post/FETCH_START',
  SET_POST_LOADING: 'post/SET_USER_LOADING',
  CLEAR_POST: 'post/CLEAR_POST',
  SET_ACTIVE_POST: 'post/SET_ACTIVE_POST',
  SET_NEXT_ACTIVE_POST: 'post/SET_NEXT_ACTIVE_POST',
  ERROR: 'post/ERROR',
  DEFAULT: 'post/DEFAULT',
}

export const fetchPost = (params: QueryParams) => ({
  type: postActionType.FETCH,
  payload: params,
})

export const setPostData = (data: any) => {
  if (data) {
    return {
      type: postActionType.SET_POST_DATA,
      payload: data,
    }
  }
  return {
    type: postActionType.DEFAULT,
    payload: data,
  }
}

export const setPostOrder = (data: any) => ({
  type: postActionType.SET_POST_ORDER,
  payload: data,
})

export const setActivePost = (data: any) => ({
  type: postActionType.SET_ACTIVE_POST,
  payload: data,
})
export const setNextActivePost = (data: any) => ({
  type: postActionType.SET_NEXT_ACTIVE_POST,
  payload: data,
})

export const setPostLoading = (data: any) => ({
  type: postActionType.SET_POST_LOADING,
  payload: data,
})

export const getPostById = (data: any) => ({
  type: API,
  payload: {
    url: '/posts/' + data,
    schema: schema.post,
    requestParams: {
      method: 'GET',
    },
    startNetwork: () => {
      return setPostLoading(true)
    },
    endNetwork: () => {
      return setPostLoading(false)
    },
    success: data => {
      return [
        setPostData(data.entities.post),
        setUserData(data.entities.user),
        setActivePost(data.result),
        setPostLoading(false),
      ]
    },
    error: err => {
      return [setPostLoading(false)]
    },
  },
})

export const getNextPost = (data: any) => ({
  type: API,
  payload: {
    url: '/posts/' + data + '/next',
    schema: schema.post,
    requestParams: {
      method: 'GET',
    },
    startNetwork: () => {
      return setPostLoading(true)
    },
    endNetwork: () => {
      return setPostLoading(false)
    },
    success: data => {
      return [
        setPostData(data.entities.post),
        setUserData(data.entities.user),
        setNextActivePost(data.entities.result),
        setPostLoading(false),
      ]
    },
    error: err => {
      return [setPostLoading(false)]
    },
  },
})
