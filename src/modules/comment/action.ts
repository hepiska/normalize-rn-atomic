import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const commentActionType = {
  FETCH: 'post/FETCH',
  SET_COMMENT_DATA: 'post/SET_COMMENT_DATA',
  SET_COMMENT_ORDER: 'post/SET_COMMENT_ORDER',
  FETCH_START: 'post/FETCH_START',
  SET_COMMENT_LOADING: 'post/SET_COMMENT_LOADING',
  ERROR: 'post/ERROR',
  DEFAULT: 'post/DEFAULT',
}

export const setCommentData = (data: any) => {
  if (data) {
    return {
      type: commentActionType.SET_COMMENT_DATA,
      payload: data,
    }
  }
  return {
    type: commentActionType.DEFAULT,
    payload: data,
  }
}
