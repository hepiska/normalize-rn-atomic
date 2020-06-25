import * as React from 'react'
import MainPage from './main'
import Screens from './screens'
import ModalPages from './modals'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductSaved } from '@modules/product-saved/action'
import { getPostLiked } from '@modules/post-liked/action'
import GlobalErrorAndWarning from '@src/components/molecules/global-error-warning'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ConstumeDrawer from '@components/organisms/drawer-costume'

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
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.getProductSaved()
      this.props.getPostLiked()
    }
  }
  render() {
    return (
      <>
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
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
