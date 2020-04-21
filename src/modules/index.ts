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
import sortReducer from './sort/reducer'
import uiInteracrionReducer from './ui-interaction/reducer'
import collectionReducer from './collection/reducer'
import pageReducer from './page/reducer'
import globalReducer from './global/reducer'
import authReducer from './auth/reducer'
import cartReducer from './cart/reducer'
import addressReducer from './address/reducer'
import shipmentReducer from './shipment/reducer'
import shippingMethodsReducer from './shipping-methods/reducer'
import productSavedActionType from './product-saved/reducer'
import postLikedActionType from './post-liked/reducer'
import commentReducer from './comment/reducer'
import productAttributeReducer from './product-attribute/reducer'
import checkoutReducer from './checkout/reducer'

const combinedReducer: Reducer<any> = combineReducers({
  addresses: addressReducer,
  auth: authReducer,

  brands: brandReducer,

  carts: cartReducer,
  categories: categoryReducer,
  checkout: checkoutReducer,
  collection: collectionReducer,
  comments: commentReducer,

  global: globalReducer,

  lookbooks: lookbookReducer,

  page: pageReducer,
  post: postReducer,
  postsLiked: postLikedActionType,
  productFilter: productFilterReducer,
  productsSaved: productSavedActionType,
  products: productsReducer,
  productAttribute: productAttributeReducer,

  shipments: shipmentReducer,
  shippingMethods: shippingMethodsReducer,
  sort: sortReducer,

  router: routerReducer,
  topPost: topPostReducer,

  uiInteraction: uiInteracrionReducer,

  user: userReducer,
})

export default combinedReducer
