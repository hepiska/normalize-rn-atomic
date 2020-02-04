import { QueryParams } from '@utils/globalInterface';
import { API } from '../action-types';
import { setPostData } from '../post/action';
import { setUserData } from '../user/action';

import * as schema from '@modules/normalize-schema';

export const topPostActionType = {
  SET_TOP_POST_DATA: 'top-post/SET_TOP_POST_DATA',
  SET_TOP_POST_ORDER: 'top-post/SET_TOP_POST_ORDER',
  FETCH_START: 'top-post/FETCH_START',
  SET_TOP_POST_LOADING: 'top-post/SET_TOP_POST_LOADING',
  ERROR: 'top-post/ERROR',
};

export const PostTopApi = params => ({
  type: API,
  payload: {
    url: '/posts/top',
    requestParams: { params },
    schema: [schema.post],
    success: (data, { pagination }) => [
      setPostData(data.entities.post),
      setTopPostData({ key: params.category_id, data: data.result }),
      setUserData(data.entities.user),
    ],
  },
});

export const setTopPostData = (data: any) => ({
  type: topPostActionType.SET_TOP_POST_DATA,
  payload: data,
});
