import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack'
import AddNewAddress from './add-address'
import AddNewAddressManual from './add-address-manual'
import UserDetail from './user-detail-new'
import Checkout from './checkout'
import ChooseCourier from './choose-courier'
import ChooseAddress from './choose-address'
import InitialPage from '../page-initial.config'
import LookbookDetail from './look-book'
import Test from './test'
import ProductDetail from './product-detail'
// import ProductList from './product-list-old'
import PaymentMethod from './payment-method'
import PaymentDetails from './payment-details'
import PaymentList from './payment-list'
import OrderDetails from './order-details'
import OrderList from './order-list'
import LoginRegister from './loginRegister'
import TrackShipment from './track-shipment'
import Cart from './cart'
import PaymentWaiting from './payment-waiting'
import PaymentResponse from './payment-status-response'
import PaymentWebView from './payment-webview'
import CreateCollection from './create-collection'
import CouponsPage from './coupons'
import CouponDetail from './coupon-detail'
import CreateJurnal from './create-jurnal'
import PromoCodePage from './promo-code'
// import Search from './search-list'
import Search from './search-list-new'
import MyProfile from './my-other-profille'
import Register from './register'
import SizeGuideWebView from './size-guide-webview'
import TestLayout from './test-layout'
import EditProfile from './edit-profile'
import Follow from './follow'
import AccountSetting from './account-setting'
import Wishlist from './wishlist'
import PostDetail from './post-detail'
import PostEdit from './post-edit'
import Articles from './articles'
import Setting from './setting'
import PasswordSecurity from './password-security'
import NotificationPreference from './notification-preference'
import FormChangePassword from './form-change-password'
import TermsCondition from './term-and-condition'
import PrivacyPolicy from './privacy-policy'
import BeautyProfile from './beauty-profile'
import CategoryProductList from './category-product-list'
import CollectionProductList from './collection-product-list'
import BrandProductList from './brand-product-list'

import TopicInterest from './topic-interest'

const Stack = createStackNavigator()

function InsiderStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
      initialRouteName={InitialPage.screens}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="PaymentList" component={PaymentList} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="TrackShipment" component={TrackShipment} />
      <Stack.Screen name="ChooseCourier" component={ChooseCourier} />
      <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="PromoCode" component={PromoCodePage} />
      <Stack.Screen name="Coupons" component={CouponsPage} />
      <Stack.Screen name="CouponDetail" component={CouponDetail} />
      {/* <Stack.Screen name="ProductList" component={ProductList} /> */}
      <Stack.Screen name="PaymentWaiting" component={PaymentWaiting} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CreateCollection" component={CreateCollection} />
      <Stack.Screen name="CreateJurnal" component={CreateJurnal} />
      <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
      <Stack.Screen name="SizeGuideWebView" component={SizeGuideWebView} />
      <Stack.Screen name="PaymentResponse" component={PaymentResponse} />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="TestLayout" component={TestLayout} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Follow" component={Follow} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="SearchList" component={Search} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="LoginRegister" component={LoginRegister} />
      <Stack.Screen
        name="CategoryProductList"
        component={CategoryProductList}
      />
      <Stack.Screen
        name="CollectionProductList"
        component={CollectionProductList}
      />
      <Stack.Screen name="BrandProductList" component={BrandProductList} />
      <Stack.Screen name="PasswordSecurity" component={PasswordSecurity} />
      <Stack.Screen name="FormChangePassword" component={FormChangePassword} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Lookbook" component={LookbookDetail} />
      <Stack.Screen name="BeautyProfile" component={BeautyProfile} />
      <Stack.Screen name="TopicInterest" component={TopicInterest} />
      <Stack.Screen
        name="NotificationPreference"
        component={NotificationPreference}
      />
      <Stack.Screen
        name="AddNewAddressManual"
        component={AddNewAddressManual}
      />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  )
}

export default InsiderStack
