import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  InteractionManager,
  Linking,
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
// import MyPost from '@components/organisms/my-post'
import MyPost from '@src/components/organisms/my-post-2'
import ConnectionCard from '@src/components/molecules/connection-card'
import { followUser, unfollowUser } from '@modules/user/action'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const initialActiveTab = 'userpost'

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
  playfairBold20: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
    fontSize: 20,
  },
})

class ProfilPage extends React.PureComponent<any, any> {
  state = {
    defaultImage: null,
    index: 0,
    activeTab: initialActiveTab,
    isVisible: false,
    showName: false,
    enableScrollContent: false,
    finishAnimation: false,
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
    const { isAuth, username, getUser, user, route } = this.props
    InteractionManager.runAfterInteractions(() => {
      getUser(route.params.userId, 'id')
      this.setState({ finishAnimation: true })
    })
  }
  _goToConfig = () => {
    navigate('modals', {
      screen: 'ConfigProfile',
      params: { isOtherUser: false },
    })
  }
  render() {
    const { finishAnimation } = this.state
    const { user, auth_data, navigation } = this.props
    if (!user) {
      return (
        <ProfileLoader
          style={{
            marginVertical: 8,
            marginHorizontal: 16,
          }}
        />
      )
    }
    return (
      <View style={{ ...styles.container }}>
        <NavbarTop
          title={user.username || user.name}
          leftContent={['back']}
          rightAction={
            <Icon
              style={{ marginRight: 16 }}
              name="dots-horizontal"
              size={24}
              color={colors.black100}
              onPress={this._goToConfig}
            />
          }
          style={{ zIndex: 2 }}
          saveAreaStyle={{ backgroundColor: 'white' }}
        />
        {finishAnimation ? (
          <MyPost
            userid={user.id}
            header={
              <View style={{ marginHorizontal: 16 }}>
                <ProfileCard
                  user={user}
                  type={
                    auth_data?.user?.id !== user.id ? 'friendProfile' : null
                  }
                />
                <ConnectionCard userid={user.id} navigation={navigation} />
                <View style={{ marginTop: 40, marginBottom: 8 }}>
                  <Text style={{ ...styles.playfairBold20 }}>Latest Post</Text>
                </View>
              </View>
            }
          />
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
  bindActionCreators({ getUser, setLogout, followUser, unfollowUser }, dispatch)

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.route.params.userId
  return {
    user: state.user.data[userId] || null,
    auth_data: state.auth.data || {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilPage)
