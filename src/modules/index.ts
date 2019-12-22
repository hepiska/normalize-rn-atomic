import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as userReducer from './user'

export default combineReducers({
  user: userReducer,
  router: routerReducer,
} as any);
