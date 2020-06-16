import React, { useEffect } from 'react'
import {
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  InteractionManager,
} from 'react-native'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import Feed from '@components/organisms/discover-feed'
import Discover from '@components/organisms/discover-discover'
import { Instagram } from 'react-content-loader/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '@utils/constants'
import DiscoverTab from '@src/components/molecules/tab-menu-chip'

const { width } = Dimensions.get('window')

const Tab = createMaterialTopTabNavigator()

const DiscoverSearchComponent = ({ onPress }) => {
  return (
    <View>
      <Icon name="search" onPress={onPress} size={16} />
    </View>
  )
}

const DiscoverPage = () => {
  const [finishAnimation, setFinishAnimation] = React.useState(false)
  const onSearchPress = () => {
    console.log('on discover search')
  }

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
    })
  }, [])

  if (!finishAnimation) {
    return <Instagram />
  }

  // return null

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Tab.Navigator
        tabBar={props => (
          <DiscoverTab
            {...props}
            rightAction={<DiscoverSearchComponent onPress={onSearchPress} />}
          />
        )}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Discover" component={Discover} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default DiscoverPage
