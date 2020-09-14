import React, { useEffect, useCallback } from 'react'
import {
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  InteractionManager,
} from 'react-native'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import Feed from '@components/organisms/discover-feed'
import Icon from '@assets/fonts/custom-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '@utils/constants'
import DiscoverTab from '@src/components/molecules/tab-menu-home'
import { navigate } from '@src/root-navigation'
import DiscoverScreen from '@src/components/organisms/discover-screen'

const { width } = Dimensions.get('window')

const Tab = createMaterialTopTabNavigator()

const DiscoverSearchComponent = ({ onPress }) => {
  return (
    <View>
      <Icon name="search" onPress={onPress} size={20} />
    </View>
  )
}

const DiscoverPage = () => {
  const onSearchPress = useCallback(() => {
    navigate('Screens', { screen: 'SearchList' })
  }, [])

  // return null

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Tab.Navigator
        lazy={true}
        tabBar={props => (
          <DiscoverTab
            {...props}
            rightAction={<DiscoverSearchComponent onPress={onSearchPress} />}
          />
        )}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default DiscoverPage
