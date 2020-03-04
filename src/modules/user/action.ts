import { QueryParams } from '@utils/globalInterface';
import { API } from '../action-types';
import * as schema from '@modules/normalize-schema';

export const userActionType = {
  FETCH: 'post/FETCH',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SET_USER_ORDER: 'user/SET_USER_ORDER',
  FETCH_START: 'user/FETCH_START',
  SET_USER_LOADING: 'user/SET_USER_LOADING',
  ERROR: 'user/ERROR',
};

export const setUserData = (data: any) => ({
  type: userActionType.SET_USER_DATA,
  payload: data,
});
