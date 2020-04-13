import * as React from 'react'
import MainPage from './main'
import ModalPages from './modals'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductSaved } from '@modules/product-saved/action'
import GlobalErrorAndWarning from '@src/components/molecules/global-error-warning'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

class Pages extends React.Component<any, any> {
  componentDidMount() {
    this.props.getProductSaved()
  }
  render() {
    return (
      <>
        <GlobalErrorAndWarning />
        <Stack.Navigator initialRouteName="Main" mode="modal">
          <Stack.Screen
            name="Main"
            component={MainPage}
            options={{ headerShown: false }}
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
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(Pages)
