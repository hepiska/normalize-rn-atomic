import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './user/reducer';
import lookbookReducer from './lookbook/reducer';
import postReducer from './post/reducer';
import topPostReducer from './post-top/reducer';

console.log('topPostReducer', topPostReducer);

const combinedReducer: Reducer<any> = combineReducers({
  router: routerReducer,
  user: userReducer,
  lookbooks: lookbookReducer,
  topPost: topPostReducer,
  post: postReducer,
});

export default combinedReducer;
