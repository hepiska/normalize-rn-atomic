import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer, { UserState } from './user'


const combinedReducer: Reducer<any> = combineReducers({
  user: userReducer,
  router: routerReducer,
});

export default combinedReducer
