import { store } from '@src/init-store'
import * as schema from '@modules/normalize-schema'
import { API } from '../action-types'
import { setUserData } from '../user/action'
import { setPostData } from '../post/action'
import { setCommentData } from '../comment/action'
import { getMe } from '@utils/helpers'

export const postLikedActionType = {
  CLEAR: 'postLiked/CLEAR',
  SET_ORDER_DATA: 'postLiked/SET_ORDER_DATA',
  SET_LOADING: 'postLiked/SET_LOADING',
  ADD_LIKED_POST: 'postLiked/ADD_LIKED_POST',
  REMOVE_LIKED_POST: 'postLiked/REMOVE_LIKED_POST',
}

export const postLikedLoading = data => ({
  type: postLikedActionType.SET_LOADING,
  payload: data,
})

export const postLikedRemoveLiked = productId => ({
  type: postLikedActionType.REMOVE_LIKED_POST,
  payload: productId,
})

export const postLikedAddLiked = productId => ({
  type: postLikedActionType.ADD_LIKED_POST,
  payload: productId,
})

// in this we need array repesett as object so it will easy to find
export const postLikedSetOrderData = data => {
  return {
    type: postLikedActionType.SET_ORDER_DATA,
    payload: data,
  }
}

export const postLikedClear = () => ({
  type: postLikedActionType.CLEAR,
})

export const getPostLiked = () => ({
  type: API,
  payload: {
    url: '/users/' + getMe().id + '/likes',
    schema: [schema.post],
    startNetwork: () => postLikedLoading(true),
    success: data => {
      return [
        setCommentData(data.entities.comment),
        setUserData(data.entities.user),
        setPostData(data.entities.post),
        postLikedSetOrderData(data.result),
        postLikedLoading(false),
      ]
    },
    error: () => {
      return [postLikedLoading(false)]
    },
  },
})

export const addLikedPost = postId => {
  return {
    type: API,
    payload: {
      url: '/posts/' + getMe().id + '/likes',
      requestParams: {
        method: 'POST',
        data: { post_id: postId },
      },
      startNetwork: () => postLikedLoading(true),
      success: () => {
        return [postLikedAddLiked(postId), postLikedLoading(false)]
      },
      error: () => {
        return [postLikedLoading(false)]
      },
    },
  }
}

export const removeLikedPost = postId => {
  return {
    type: API,
    payload: {
      url: '/posts/' + getMe().id + '/likes',
      requestParams: {
        method: 'DELETE',
        data: { post_id: postId },
      },
      startNetwork: () => postLikedLoading(true),
      success: () => {
        return [postLikedRemoveLiked(postId), postLikedLoading(false)]
      },
      error: () => {
        return [postLikedLoading(false)]
      },
    },
  }
}
