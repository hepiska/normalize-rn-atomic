import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddNewAddress from './add-address'
import AddNewAddressManual from './add-address-manual'
import UserDetail from './user-detail'
import Checkout from './checkout'
import ChooseCourier from './choose-courier'
import ChooseAddress from './choose-address'
import InitialPage from '../page-initial.config'
import Test from './test'
import ProductDetail from './product-detail'
import ProductList from './product-list'
import PaymentMethod from './payment-method'
import PaymentDetails from './payment-details'
import PaymentList from './payment-list'
import OrderDetails from './order-details'
import OrderList from './order-list'
import TrackShipment from './track-shipment'
import Cart from './cart'
import PaymentWaiting from './payment-waiting'
import PaymentResponse from './payment-status-response'
import PaymentWebView from './payment-webview'
import Search from './search-list'
import MyProfile from './my-other-profille'
import SizeGuideWebView from './size-guide-webview'
import TestLayout from './test-layout'
import EditProfile from './edit-profile'
import Follow from './follow'
import AccountSetting from './account-setting'
import Wishlist from './wishlist'
import PostDetail from './post-detail'
import Setting from './setting'
import PasswordSecurity from './password-security'
import NotificationPreference from './notification-preference'
import FormChangePassword from './form-change-password'
import TermsCondition from './term-and-condition'
import PrivacyPolicy from './privacy-policy'

const Stack = createStackNavigator()

function InsiderStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
      initialRouteName={InitialPage.screens}
      screenOptions={{
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
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="PaymentWaiting" component={PaymentWaiting} />
      <Stack.Screen name="Cart" component={Cart} />
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
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="PasswordSecurity" component={PasswordSecurity} />
      <Stack.Screen name="FormChangePassword" component={FormChangePassword} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
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
