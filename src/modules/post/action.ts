import { QueryParams } from '@utils/globalInterface';
import { setUserData } from '../user/action';
import { setTopPostData } from '../post-top/action';
import { API } from '../action-types';

import * as schema from '@modules/normalize-schema';

export const postActionType = {
  FETCH: 'post/FETCH',
  SET_POST_DATA: 'post/SET_POST_DATA',
  SET_POST_ORDER: 'post/SET_USER_ORDER',
  FETCH_START: 'post/FETCH_START',
  SET_POST_LOADING: 'post/SET_USER_LOADING',
  ERROR: 'post/ERROR',
};

export const fetchPost = (params: QueryParams) => ({
  type: postActionType.FETCH,
  payload: params,
});

export const setPostData = (data: any) => ({
  type: postActionType.SET_POST_DATA,
  payload: data,
});

export const setPostOrder = (data: any) => ({
  type: postActionType.SET_POST_ORDER,
  payload: data,
});

export const setPostLoading = (data: any) => ({
  type: postActionType.SET_POST_LOADING,
  payload: data,
});
