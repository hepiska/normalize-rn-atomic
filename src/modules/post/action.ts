import { QueryParams } from '@utils/globalInterface'
import { setUserData } from '../user/action'
import { setTopPostData } from '../post-top/action'
import { API } from '../action-types'
import { dispatchPostEntities } from '../entities-action-dispacer'
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
  SET_COMMENT_LOADING: 'post/SET_COMMENT_LOADING',
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

export const setCommentLoading = data => {
  return {
    type: postActionType.SET_COMMENT_LOADING,
    payload: data,
  }
}

export const setPostLoading = (data: any) => ({
  type: postActionType.SET_POST_LOADING,
  payload: data,
})

export const getPostById = (data: any, callback, params?: any) => ({
  type: API,
  payload: {
    url: '/posts/' + data,
    schema: schema.post,
    callback: callback,
    requestParams: {
      method: 'GET',
      params,
    },
    startNetwork: () => {
      return setPostLoading(true)
    },
    endNetwork: () => {
      return setPostLoading(false)
    },
    success: data => {
      return [dispatchPostEntities(data.entities), setPostLoading(false)]
    },
    error: err => {
      return [setPostLoading(false)]
    },
  },
})

export const getNextPost = (data: any, callback) => ({
  type: API,
  payload: {
    url: '/posts/' + data + '/next',
    schema: schema.post,
    callback,
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
      return [dispatchPostEntities(data.entities), setPostLoading(false)]
    },
    error: err => {
      return [setPostLoading(false)]
    },
  },
})

export const updatePost = (data: any) => ({
  type: API,
  payload: {
    url: '/posts/' + data,
    schema: schema.post,
    requestParams: {
      method: 'GET',
    },
    // startNetwork: () => {
    //   return setPostLoading(true)
    // },
    // endNetwork: () => {
    //   return setPostLoading(false)
    // }
    success: data => {
      return [dispatchPostEntities(data.entities), setPostLoading(false)]
    },
    error: err => {
      return [setPostLoading(false)]
    },
  },
})

export const postComment = (
  { postId, content, commentId }: any,
  callback: any,
) => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/comments',
      schema: schema.post,
      requestParams: {
        method: 'POST',
        data: {
          attributes: [],
          content,
          reply_id: commentId,
        },
      },
      startNetwork: () => {
        return setCommentLoading(true)
      },
      endNetwork: () => {
        if (callback) {
          callback({ status: 'success' })
        }
        return setCommentLoading(false)
      },
      success: data => {
        return [updatePost(postId), setCommentLoading(false)]
      },
    },
  }
}
// posts/858364/comments/36120/likes
export const likeComments = ({ postId, commentId }, callback?: any) => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/comments/' + commentId + '/likes',
      schema: schema.post,
      requestParams: {
        method: 'POST',
      },
    },
  }
}

export const deleteComment = ({ postId, commentId }, callback?: any) => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/comments/' + commentId,
      schema: schema.post,
      requestParams: {
        method: 'DELETE',
      },
      success: data => {
        return [updatePost(postId)]
      },
    },
  }
}

export const relatedPosts = (postId: number, callback?: any) => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/related',
      schema: [schema.post],
      requestParams: {
        method: 'GET',
      },
      callback: callback,
      success: data => {
        return [dispatchPostEntities(data.entities)]
      },
    },
  }
}
