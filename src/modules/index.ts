import { combineReducers, Reducer } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/reducer'
import lookbookReducer from './lookbook/reducer'
import postReducer from './post/reducer'
import topPostReducer from './post-top/reducer'
import productsReducer from './product/reducer'
import brandReducer from './brand/reducer'
import couponsReducer from './coupons/reducer'
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
import earningsReducer from './earnings/reducer'
import searchProductReducer from './search-product/reducer'
import searchPostReducer from './search-post/reducer'
import searchBrandReducer from './search-brand/reducer'
import searchUserReducer from './search-user/reducer'
import orderReducer from './order/reducer'
import appConfigReducer from './app-config/reducer'
import seenHistoryReducer from './seen-history/reducer'
import productSavedActionType from './product-saved/reducer'
import postLikedActionType from './post-liked/reducer'
import postBookmarkReducer from './post-bookmarked/reducer'
import transactionPaymentReducer from './transactions-payments/reducer'
import commentReducer from './comment/reducer'
import productAttributeReducer from './product-attribute/reducer'
import checkoutReducer from './checkout/reducer'
import transactionReducer from './transaction/reducer'
import userPostReducer from './user-post/reducer'
import notificationReducer from './notification/reducer'
import feedReducer from './post-feed/reducer'
import discoverReducer from './post-discover/reducer'
import popupModalReducer from './pop-up-modals/reducer'
import insightReducer from './insights/reducer'
import globalSearchUiReducer from './global-search-ui/reducer'
import globalSearchProductFilterReducer from './global-search-product-filter/reducer'
import referralsReducer from './referrals/reducer'

const combinedReducer: Reducer<any> = combineReducers({
  addresses: addressReducer,
  auth: authReducer,
  appConfig: appConfigReducer,
  brands: brandReducer,

  carts: cartReducer,
  categories: categoryReducer,
  checkout: checkoutReducer,
  collection: collectionReducer,
  comments: commentReducer,
  coupons: couponsReducer,

  discover: discoverReducer,

  earnings: earningsReducer,

  feed: feedReducer,

  global: globalReducer,
  globalSearchUi: globalSearchUiReducer,
  globalSearchProductFilter: globalSearchProductFilterReducer,

  insights: insightReducer,

  lookbooks: lookbookReducer,

  notifications: notificationReducer,

  orders: orderReducer,

  page: pageReducer,
  post: postReducer,
  postsBookmarked: postBookmarkReducer,
  postsLiked: postLikedActionType,
  productFilter: productFilterReducer,
  productsSaved: productSavedActionType,
  products: productsReducer,
  productAttribute: productAttributeReducer,
  popupModals: popupModalReducer,

  referrals: referralsReducer,

  searchPost: searchPostReducer,
  searchProduct: searchProductReducer,
  searchBrand: searchBrandReducer,
  searchUser: searchUserReducer,
  seenHistory: seenHistoryReducer,
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
