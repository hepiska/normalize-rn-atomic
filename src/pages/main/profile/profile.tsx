import React from 'react'
import { Text, StyleSheet, View, InteractionManager } from 'react-native'
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
import ProfileLoader from '@components/atoms/loaders/profile'
// import MyPost from '@components/organisms/my-post'
import MyPost from '@components/organisms/my-post-new'
import ConnectionCard from '@src/components/molecules/connection-card'

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

  render() {
    const { finishAnimation } = this.state
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
        <NavbarTop title={'My profile'} style={{ zIndex: 2 }} />
        {finishAnimation ? (
          <MyPost
            header={
              <View style={{ marginHorizontal: 16 }}>
                <ProfileCard />
                <ConnectionCard />
                <View style={{ marginTop: 40, marginBottom: 8 }}>
                  <Text style={{ ...styles.playfairBold20 }}>Latest Post</Text>
                </View>
              </View>
            }
          />
        ) : (
          <ProfileLoader style={{ marginVertical: 8, marginHorizontal: 16 }} />
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
