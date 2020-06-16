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
import orderReducer from './order/reducer'
import productSavedActionType from './product-saved/reducer'
import postLikedActionType from './post-liked/reducer'
import postBookmarkReducer from './post-bookmarked/reducer'
import transactionPaymentReducer from './transactions-payments/reducer'
import commentReducer from './comment/reducer'
import productAttributeReducer from './product-attribute/reducer'
import checkoutReducer from './checkout/reducer'
import transactionReducer from './transaction/reducer'
import userPostReducer from './user-post/reducer'
import feedReducer from './post-feed/reducer'
import discoverReducer from './post-discover/reducer'
import insightReducer from './insights/reducer'

const combinedReducer: Reducer<any> = combineReducers({
  addresses: addressReducer,
  auth: authReducer,

  brands: brandReducer,

  carts: cartReducer,
  categories: categoryReducer,
  checkout: checkoutReducer,
  collection: collectionReducer,
  comments: commentReducer,

  discover: discoverReducer,

  feed: feedReducer,

  global: globalReducer,

  insights: insightReducer,

  lookbooks: lookbookReducer,

  orders: orderReducer,

  page: pageReducer,
  post: postReducer,
  postsBookmarked: postBookmarkReducer,
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
  transaction: transactionReducer,
  transactionsPayments: transactionPaymentReducer,

  uiInteraction: uiInteracrionReducer,

  user: userReducer,
  userPosts: userPostReducer,
})

export default combinedReducer
