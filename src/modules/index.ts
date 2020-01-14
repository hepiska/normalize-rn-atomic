import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer, { UserState } from './user'
import lookbookReducer from './lookbook/reducer'


const combinedReducer: Reducer<any> = combineReducers({
  user: userReducer,
  lookbooks: lookbookReducer,
  router: routerReducer,
});

export default combinedReducer
