import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  InteractionManager,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@utils/constants'
import { getUser } from '@modules/user/action'
import { fontStyle } from '@src/components/commont-styles'
import { navigate } from '@src/root-navigation'
import { setLogout } from '@modules/auth/action'
import ProfileEmptyState from '@components/molecules/profile-empty-state'
import ProfileCard from '@components/molecules/profile-card'
import ProfileLoader from '@src/components/atoms/loaders/profile-loader'
import TabMenu from '@src/components/layouts/tab-menu-profile'
// import MyPost from '@src/components/organisms/my-post-new-archive'
import ConnectionCard from '@src/components/molecules/connection-card'
import EarningsCard from '@src/components/molecules/earnings-card'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Post from '@src/components/organisms/my-post'
import Product from '@src/components/organisms/my-product'

const initialActiveTab = 'Post'
const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  image: {
    borderRadius: 100,
  },
  playfair: {
    ...fontStyle.playfair,
    fontWeight: '500',
    fontSize: 20,
  },
})

// const Product = () => {
//   return (
//     <View
//       style={{ width: width, flex: 1, height: 200, backgroundColor: 'green' }}>
//       <Text>Put Product List Here</Text>
//     </View>
//   )
// }

class ProfilPage extends React.PureComponent<any, any> {
  state = {
    defaultImage: null,
    index: 0,
    activeTab: initialActiveTab,
    isVisible: false,
    showName: false,
    enableScrollContent: false,
    finishAnimation: false,
    loading: false,
  }

  headerLayout = null
  isScroll = false
  screenRef = []
  myPostRef = null
  mySavedRef = null
  tabRef = null
  offsets = {}
  scrollPos = 0

  componentDidMount() {
    const { isAuth, username, getUser, user } = this.props
    InteractionManager.runAfterInteractions(() => {
      if (isAuth && username) {
        getUser(username, 'username')
      } else if (isAuth && user.id) {
        getUser(user.id, 'id')
      }
      this.setState({ finishAnimation: true })
    })
  }

  componentDidUpdate(prevProps) {
    const { isAuth, username, getUser, user } = this.props
    if (prevProps.isAuth !== isAuth) {
      if (isAuth && username) {
        getUser(username, 'username')
      } else if (isAuth && user.id) {
        getUser(user.id, 'id')
      }
    }
  }
  _goToConfigAccount = () => {
    navigate('modals', { screen: 'ConfigProfile' })
  }

  _items = () => {
    return [
      {
        name: 'Post',
        Component: <Post activity={null} style={{ width: width }} />,
        title: `Posts`,
      },
      {
        name: 'Product',
        Component: <Product />,
        title: `Products`,
      },
    ]
  }
  _refresh = () => {
    this.setState({
      loading: true,
    })
    console.log('should fetch fresh data', this.state.loading)
    setTimeout(() => {
      this.setState({
        loading: false,
      })
      console.log('loading done')
    }, 2000)
  }

  onChangeTab = item => {
    this.setState({
      activeTab: item.name,
    })
  }

  render() {
    const { finishAnimation, activeTab, loading } = this.state
    const { isAuth, user } = this.props

    if (!isAuth) {
      return (
        <ProfileEmptyState
          onPress={() => navigate('modals', { screen: 'LoginModal' })}
        />
      )
    }
    if (isAuth && !user) {
      return null
    }

    return (
      <View style={{ ...styles.container }}>
        <NavbarTop
          title={user.username}
          style={{ zIndex: 2 }}
          rightAction={
            <Icon
              style={{ marginRight: 16 }}
              name="dots-horizontal"
              size={24}
              color={colors.black100}
              onPress={this._goToConfigAccount}
            />
          }
          saveAreaStyle={{ backgroundColor: 'white' }}
        />
        {finishAnimation ? (
          <ScrollView
            removeClippedSubviews={false}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this._refresh} />
            }>
            <ProfileCard />
            <ConnectionCard style={{ marginHorizontal: 16 }} />
            <View style={{ paddingVertical: 20, marginHorizontal: 16 }}>
              <Text style={{ ...styles.playfair, marginBottom: 16 }}>
                Komisi Saya
              </Text>
              <EarningsCard />
            </View>
            <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
              <Text style={{ ...styles.playfair }}>Post Terbaru</Text>
            </View>
            <TabMenu
              items={this._items()}
              selectedItem={activeTab}
              onChangeTab={this.onChangeTab}
              textMenuAlign="center"
              isScrollEnabled={true}
              isLazyload
            />
            <View>
              {this.state.activeTab === 'Post' ? (
                <Post activity={loading} style={{ width: width }} />
              ) : (
                <Product activity={loading} style={{ width: width }} />
              )}
            </View>
          </ScrollView>
        ) : (
          <ProfileLoader
            style={{
              marginVertical: 8,
              marginHorizontal: 16,
            }}
          />
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser, setLogout }, dispatch)

const mapStateToProps = state => {
  const isAuth = state.auth.isAuth

  let username
  let user
  if (isAuth) {
    username = state.auth.data.user.username
    user = state.user.data[state.auth.data.user.id] || state.auth.data.user
  }

  return {
    isAuth,
    username,
    user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilPage)
