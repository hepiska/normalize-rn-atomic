import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DiscoverFashion from './discover-fashion'
import DiscoverBeauty from './discover-beauty'
import { colors } from '@utils/constants'
import TabMenuUnderline from '../molecules/tab-menu-underline'
import DiscoverAll from '@src/pages/main/discover/discover-all'
import { useRoute } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator()

class DiscoverScreen extends React.PureComponent {
  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Tab.Navigator
            tabBar={props => <TabMenuUnderline {...props} />}
            lazy={true}>
            <Tab.Screen name="ALL" component={DiscoverAll} />
            <Tab.Screen name="FASHION" component={DiscoverFashion} />
            <Tab.Screen name="BEAUTY" component={DiscoverBeauty} />
          </Tab.Navigator>
        </SafeAreaView>
      </>
    )
  }
}

export default DiscoverScreen
