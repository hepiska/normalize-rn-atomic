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
const Stack = createStackNavigator()

const MainScreens = () => (
  <Stack.Navigator>
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
    this.props.getProductSaved()
    this.props.getPostLiked()
  }
  render() {
    return (
      <>
        <GlobalErrorAndWarning />
        <Stack.Navigator initialRouteName="Main" mode="modal">
          <Stack.Screen
            name="MainScreen"
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
            component={MainScreens}
          />
          <Stack.Screen
            name="modals"
            component={ModalPages}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack.Navigator>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductSaved,
      getPostLiked,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(Pages)
