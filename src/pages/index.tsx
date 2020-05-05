import * as React from 'react'
import MainPage from './main'
import Screens from './screens'
import ModalPages from './modals'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductSaved } from '@modules/product-saved/action'
import { getPostLiked } from '@modules/post-liked/action'
import GlobalErrorAndWarning from '@src/components/molecules/global-error-warning'
import { createStackNavigator } from '@react-navigation/stack'
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
      options={{ headerShown: false, animationEnabled: false }}
    />
    <Stack.Screen
      name="Screens"
      component={Screens}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
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
        <Drawer.Navigator
          drawerContent={props => <ConstumeDrawer {...props} />}>
          <Drawer.Screen name="MainScreen" component={MainScreens} />
          <Drawer.Screen name="modals" component={ModalPages} />
        </Drawer.Navigator>
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
