import * as React from 'react'
import MainPage from './main'
import { Platform } from 'react-native'
import Screens from './screens'
import ModalPages from './modals'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductSaved } from '@modules/product-saved/action'
import { getPostLiked } from '@modules/post-liked/action'
import GlobalErrorAndWarning from '@src/components/molecules/global-error-warning'
import PopUpModal from '@components/layouts/pop-up-modals'
import { navigate } from '@src/root-navigation'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import firebase from '@react-native-firebase/app'
import Baner from '@components/layouts/baner'
import { uriToScreen } from '@utils/config'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { getAppConfig } from '@modules/app-config/action'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ConstumeDrawer from '@components/organisms/drawer-costume'
import { firebaseCredential } from '@utils/config'

import InitialPage from './page-initial.config'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()

const MainScreens = () => (
  <Stack.Navigator initialRouteName={InitialPage.index}>
    <Stack.Screen
      name="Main"
      component={MainPage}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: false,
      }}
    />
    <Stack.Screen
      name="Screens"
      component={Screens}
      options={{
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

const Stack2 = createStackNavigator()
const MainWithModal = () => (
  <Drawer.Navigator
    // gestureEnabled={false}
    drawerContent={props => <ConstumeDrawer {...props} />}>
    <Drawer.Screen
      name="MainScreen"
      options={{ swipeEnabled: false, gestureEnabled: true }}
      component={MainScreens}
    />
  </Drawer.Navigator>
)

class Pages extends React.Component<any, any> {
  linkSub = null
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.getProductSaved()
      this.props.getPostLiked()
    }
    this.props.getAppConfig()
    this._firebase()
  }

  componentWillUnmount() {
    if (this.linkSub) {
      this.linkSub()
    }
  }

  _firebase = async () => {
    if (firebase.apps.length < 1) {
      await firebase.initializeApp(firebaseCredential)
    }
    this.linkSub = dynamicLinks().onLink(this._handleDynamicLink)
    dynamicLinks()
      .getInitialLink()
      .then(this._handleDynamicLink)
  }

  _handleDynamicLink = link => {
    if (link) {
      const screen = uriToScreen(link.url)
      navigate(screen.root, screen.obj)
    }
  }

  _handleDynamicLinkOnClose = link => {
    if (link) {
      uriToScreen(link.url)
      // navigate('Screens', { screen: 'LoginRegister' })
    }
  }
  render() {
    return (
      <>
        <PopUpModal />
        <GlobalErrorAndWarning />
        <Stack2.Navigator initialRouteName={InitialPage.root} mode="modal">
          <Stack2.Screen
            name="RootScreens"
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
            component={MainWithModal}
          />
          <Stack2.Screen
            name="modals"
            component={ModalPages}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack2.Navigator>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductSaved,
      getPostLiked,
      getAppConfig,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
