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
import { colors } from '@utils/constants'
import TabMenuAnimations from '@components/layouts/tab-menu-animated'
import DiscoverTab from '@components/molecules/discover-tab-navigator'

const { width } = Dimensions.get('window')

const DiscoverSearchComponent = ({ onPress }) => {
  return (
    <View>
      <Icon name="search" onPress={onPress} size={16} />
    </View>
  )
}

const DiscoverPage = ({ navigation }) => {
  const [selected, setSelected] = React.useState('feed')
  const [finishAnimation, setFinishAnimation] = React.useState(false)
  const TabMenuData = [
    {
      name: 'feed',
      title: 'Feed',
      Component: <Feed key="feed" navigation={navigation} />,
    },
    {
      name: 'discover',
      title: 'Discover',
      Component: <Discover key="discover" navigation={navigation} />,
    },
  ]
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <TabMenuAnimations
        onChangeTab={_data => {
          setSelected(_data.name)
        }}
        TabMenuNavigator={props => (
          <DiscoverTab
            onChangeTab={item => {
              setSelected(item.name)
            }}
            {...props}
            rightAction={<DiscoverSearchComponent onPress={onSearchPress} />}
          />
        )}
        items={TabMenuData}
        selectedItem={selected}
      />
    </SafeAreaView>
  )
}

export default DiscoverPage
