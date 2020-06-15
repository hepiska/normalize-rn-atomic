import { API } from '../action-types'

export const postBookmarkActionType = {
  SET_LOADING: 'postBookmark/SET_LOADING',
  ADD_BOOKMARK_POST: 'postBookmark/ADD_BOOKMARK_POST',
  REMOVE_BOOKMARK_POST: 'postBookmark/REMOVE_BOOKMARK_POST',
}

export const postBookmarkLoading = data => ({
  type: postBookmarkActionType.SET_LOADING,
  payload: data,
})

export const addBookmark = data => ({
  type: postBookmarkActionType.ADD_BOOKMARK_POST,
  payload: data,
})

export const removeBookmark = data => ({
  type: postBookmarkActionType.REMOVE_BOOKMARK_POST,
  payload: data,
})

export const addBookmarkPost = postId => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/bookmarks',
      requestParams: {
        method: 'POST',
      },
      startNetwork: () => postBookmarkLoading(true),
      success: () => {
        return [addBookmark(postId), postBookmarkLoading(false)]
      },
      error: () => {
        return [postBookmarkLoading(false)]
      },
    },
  }
}

export const removeBookmarkPost = postId => {
  return {
    type: API,
    payload: {
      url: '/posts/' + postId + '/bookmarks',
      requestParams: {
        method: 'DELETE',
      },
      startNetwork: () => postBookmarkLoading(true),
      success: () => {
        return [removeBookmark(postId), postBookmarkLoading(false)]
      },
      error: () => {
        return [postBookmarkLoading(false)]
      },
    },
  }
}
