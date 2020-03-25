import { combineReducers, Reducer } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/reducer'
import lookbookReducer from './lookbook/reducer'
import postReducer from './post/reducer'
import topPostReducer from './post-top/reducer'
import productsReducer from './product/reducer'
import brandReducer from './brand/reducer'
import categoryReducer from './category/reducer'
import productFilterReducer from './product-filter/reducer'
import uiInteracrionReducer from './ui-interaction/reducer'
import collectionReducer from './collection/reducer'

const combinedReducer: Reducer<any> = combineReducers({
  router: routerReducer,
  user: userReducer,
  lookbooks: lookbookReducer,
  categories: categoryReducer,
  brands: brandReducer,
  products: productsReducer,
  topPost: topPostReducer,
  uiInteraction: uiInteracrionReducer,
  productFilter: productFilterReducer,
  post: postReducer,
  collection: collectionReducer,
})

export default combinedReducer
