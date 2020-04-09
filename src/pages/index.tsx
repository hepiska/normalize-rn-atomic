import * as React from 'react'
import MainPage from './main'
import ModalPages from './modals'
import GlobalErrorAndWarning from '@src/components/molecules/global-error-warning'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const Pages = () => (
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

export default Pages
