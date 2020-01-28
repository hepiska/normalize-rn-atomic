import { AnyAction, Reducer } from 'redux';
import Immutable from 'seamless-immutable';
import { ErrorType } from '@utils/globalInterface';
import { topPostActionType } from './action';

const initialState: any = {};

const topPostReducer: Reducer<any> = (
  state: any = initialState,
  action: AnyAction,
) => {
  const newState = { ...state };
  switch (action.type) {
    case topPostActionType.SET_TOP_POST_DATA:
      newState[action.payload.key] = action.payload.data;
      return newState;
    default:
      return newState;
  }
};

export default topPostReducer;
