import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  // ScrollView,
  View,
  Image,
  ViewStyle,
  RefreshControl,
  TouchableWithoutFeedback,
  InteractionManager,
  Dimensions,
} from 'react-native'
import Animated, { call } from 'react-native-reanimated'
import { withNavigation } from 'react-navigation'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Modal from 'react-native-modal'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import NavbarTop from '@components/molecules/navbar-top'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setImage as changeImageUri } from '@utils/helpers'
import { images as defaultImages, colors } from '@utils/constants'
import { OutlineButton } from '@components/atoms/button'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { onScroll } from 'react-native-redash'
import IconEi from 'react-native-vector-icons/EvilIcons'
import { getUser } from '@modules/user/action'
import { fontStyle, borderStyle } from '@src/components/commont-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'
import { setLogout } from '@modules/auth/action'
import ProfileEmptyState from '@components/molecules/profile-empty-state'
import ActionListCard from '@components/molecules/action-list-card'
import ProfileLoader from '@src/components/atoms/loaders/profile-loader'
import ImageViewer from 'react-native-image-zoom-viewer'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native-gesture-handler'
import MyPost from '@components/organisms/my-post'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabMenuCursor from '@src/components/molecules/tab-menu-cursor-animated'
import { TabView, SceneMap } from 'react-native-tab-view'

import MySaved from '@components/organisms/my-saved'
import MyInsight from '@components/organisms/my-insight'
import FocusContainer from '@src/components/molecules/focus-container'
import HTML from 'react-native-render-html'
import TabMenuAnimated from '@src/components/layouts/tab-menu-animated'

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

const { width, height } = Dimensions.get('screen')

const initialActiveTab = 'userpost'

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: 300,
    paddingTop: 36,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
  },
  image: {
    borderRadius: 100,
  },
  futuraBold20: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 20,
  },
  futuraBold24: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 24,
  },
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helveticaBold24: {
    ...fontStyle.helveticaBold,
    fontSize: 24,
  },
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  button: {
    // width: '100%',
    height: 32,
    borderColor: colors.black60,
  },
  buttonText: {
    ...fontStyle.helveticaBold,
    color: colors.black70,
    fontSize: 12,
    marginLeft: 0,
  },
  score: {
    borderColor: colors.black50,
    borderRadius: 8,
    borderWidth: 1,
    height: 98,
    width: '100%',
  },
  wallet: {
    backgroundColor: colors.black10,
    borderRadius: 8,
    justifyContent: 'space-between',
    marginTop: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const AbsDiv = styled(Div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`

const contentHeight = 272
const tabBarheight = 48
const { interpolate, Extrapolate, Value } = Animated
const Tab = createMaterialTopTabNavigator()

const routes = [
  { key: 'my-post', title: 'Post' },
  { key: 'my-saved', title: 'Saved List' },
]

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

  y = new Value(0)
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
    // this.y.addListener(({ value }) => {
    //   console.log('====', value)
    // })
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
  renderMypost = () => (
    <MyPost
      navigation={this.props.navigation}
      y={this.y}
      getListRef={ref => (this.myPostRef = ref)}
      style={{ marginTop: tabBarheight, backgroundColor: 'white' }}
      key="tabmenu-userpost"
      contentContainerStyle={{
        paddingTop: contentHeight,
      }}
    />
  )

  _headerComp = () => (
    <AbsDiv>
      <TouchableWithoutFeedback onPress={this._closeModal}>
        <Div _width="100%" align="flex-start" _margin="28px" _padding="20px">
          <IconEi name="close" size={24} color={colors.black100} />
        </Div>
      </TouchableWithoutFeedback>
    </AbsDiv>
  )
  renderMySaved = () => (
    <MySaved
      navigation={this.props.navigation}
      y={this.y}
      contentHeight={contentHeight}
      // getListRef={ref => (this.mySavedRef = ref)}
      style={{ marginTop: tabBarheight, backgroundColor: 'white' }}
      key="tabmenu-userpost"
      contentContainerStyle={{
        paddingTop: contentHeight,
      }}
    />
  )

  _onLayout = e => {
    ;(this as any).profileLayout = e.nativeEvent.layout
  }
  _openModal = () => this.setState({ isVisible: true })
  _closeModal = () => this.setState({ isVisible: false })
  gotoEditProfile = () => {
    navigateTo('Screens', 'EditProfile', {})
  }

  gotoAccountSetting = () => {
    navigateTo('Screens', 'AccountSetting', {})
  }

  gotoFollowPage = followType => () => {
    navigateTo('Screens', 'Follow', {
      followType,
      name: this.props.user.name,
    })
  }

  renderHeader = () => {
    const { isAuth, navigation, user } = this.props
    const { defaultImage, showName, finishAnimation, isVisible } = this.state

    const headerY = interpolate(this.y, {
      inputRange: [0, contentHeight],
      outputRange: [0, -contentHeight],
      extrapolate: Extrapolate.CLAMP,
    })

    const imgSize = isVisible
      ? { width: width, height: width }
      : { width: 64, height: 64 }

    if (!user) {
      return (
        <Animated.View
          style={[styles.header, { transform: [{ translateY: headerY }] }]}
        />
      )
    }

    if (user) {
      const image =
        defaultImage ||
        (!!user.photo_url && changeImageUri(user.photo_url, imgSize))

      const thumbnailImage = defaultImage
        ? null
        : !!user.photo_url &&
          changeImageUri(user.photo_url, {
            width: imgSize.width,
            height: imgSize.height,
          })
      return (
        <Animated.View
          style={[styles.header, { transform: [{ translateY: headerY }] }]}>
          <View
            style={{ paddingHorizontal: 16, paddingVertical: 26 }}
            onLayout={this._onLayout}>
            {/* photo, name, fols */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={image ? this._openModal : null}>
                <ImageAutoSchale
                  errorStyle={{
                    width: imgSize.width,
                    height: imgSize.height,
                  }}
                  thumbnailSource={
                    typeof thumbnailImage === 'string'
                      ? { uri: thumbnailImage }
                      : thumbnailImage
                  }
                  source={typeof image === 'string' ? { uri: image } : image}
                  width={imgSize.width}
                  style={{ ...styles.image }}
                />
              </TouchableOpacity>
              <Modal isVisible={isVisible} style={{ margin: 0 }}>
                <ImageViewer
                  backgroundColor="white"
                  enableSwipeDown
                  renderHeader={this._headerComp}
                  imageUrls={[{ url: image }]}
                  onSwipeDown={this._closeModal}
                  index={0}
                />
              </Modal>
              <View style={{ marginLeft: 26 }}>
                <View>
                  <Text style={{ ...styles.futuraBold20 }}>{user.name}</Text>
                </View>
                <View style={{ marginTop: 4 }}>
                  <Text
                    style={{
                      ...styles.helveticaBold12,
                      color: user.username ? colors.black80 : colors.red1,
                    }}>
                    {user.username
                      ? `@${user.username}`
                      : 'Please input Username'}
                  </Text>
                </View>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={this.gotoFollowPage('Follower')}>
                    <Text
                      style={{
                        ...styles.helvetica12,
                        color: colors.black80,
                      }}>{`Followers ${user.follower_count || 0}`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.gotoFollowPage('Following')}>
                    <View style={{ marginLeft: 24 }}>
                      <Text
                        style={{
                          ...styles.helvetica12,
                          color: colors.black80,
                        }}>{`Following ${user.following_count || 0}`}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row' }}>
                  <OutlineButton
                    title="Edit"
                    onPress={this.gotoEditProfile}
                    style={{ ...styles.button }}
                    fontStyle={{
                      ...fontStyle.helveticaBold,
                      color: colors.black70,
                      fontSize: 14,
                      marginLeft: 8,
                      lineHeight: 14,
                    }}
                    leftIcon="edit"
                  />
                  <OutlineButton
                    title="Account"
                    onPress={this.gotoAccountSetting}
                    style={{ ...styles.button, marginLeft: 12 }}
                    fontStyle={{
                      ...fontStyle.helveticaBold,
                      color: colors.black70,
                      fontSize: 14,
                      marginLeft: 8,
                      lineHeight: 14,
                    }}
                    leftIcon="cog"
                  />
                </View>
              </View>
            </View>

            {/* location and description */}
            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="map-marker-alt" size={16} color={colors.black60} />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      color: colors.black70,
                    }}>
                    Shonetopia
                  </Text>
                </View>
              </View>
              {/* description */}
              <View style={{ marginTop: 8 }}>
                <HTML
                  html={user.biography || '<p>Welcome to my page</p>'}
                  tagsStyles={{
                    p: {
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      color: colors.black80,
                    },
                    b: {
                      ...fontStyle.helveticaBold,
                      fontSize: 12,
                      color: colors.black80,
                    },
                  }}
                />
              </View>
            </View>

            {/* score */}
            <FocusContainer style={{ padding: 16, marginTop: 8 }}>
              <Text style={{ ...styles.helveticaBold24, color: '#3067E4' }}>
                0
              </Text>
            </FocusContainer>
          </View>
        </Animated.View>
      )
    }
  }

  renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'my-post':
        return (
          <MyPost
            navigation={this.props.navigation}
            y={this.y}
            contentHeight={contentHeight}
            universalScrollPoss={this.scrollPos}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onScrollEndDrag={this.onScrollEndDrag}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            // onScroll={this.onScroll}
            getListRef={ref => {
              if (ref) {
                const found = this.screenRef.find(e => e.key === route.key)
                if (!found) {
                  this.screenRef.push({
                    key: route.key,
                    ref: ref,
                  })
                }
              }
            }}
            style={{ marginTop: tabBarheight, backgroundColor: 'white' }}
            key="tabmenu-userpost"
            contentContainerStyle={{
              paddingTop: contentHeight,
            }}
          />
        )
      case 'my-saved':
        return (
          <MySaved
            navigation={this.props.navigation}
            lastScrollPos={this.offsets[route.key]}
            y={this.y}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onScrollEndDrag={this.onScrollEndDrag}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            contentHeight={contentHeight}
            getListRef={ref => {
              if (ref) {
                const found = this.screenRef.find(e => e.key === route.key)
                if (!found) {
                  this.screenRef.push({
                    key: route.key,
                    ref: ref,
                  })
                }
              }
            }}
            style={{ marginTop: tabBarheight, backgroundColor: 'white' }}
            key="tabmenu-userpost"
            contentContainerStyle={{
              paddingTop: contentHeight,
            }}
          />
        )
    }
  }

  syncScrollOffset = () => {
    const { index } = this.state
    const curRouteKey = routes[index].key
    this.screenRef.forEach(refitem => {
      if (refitem.key !== curRouteKey) {
        if (this.scrollPos < contentHeight && this.scrollPos >= 0) {
          if (refitem.ref) {
            refitem.ref
              .getNode()
              ?.scrollToOffset({ offset: this.scrollPos, animated: false })
            this.offsets[refitem.key] == this.scrollPos
          }
        } else if (this.scrollPos > contentHeight) {
          if (
            this.offsets[refitem.key] < contentHeight ||
            this.offsets[refitem.key] == undefined
          ) {
            refitem.ref
              .getNode()
              ?.scrollToOffset({ offset: contentHeight, animated: false })
            this.offsets[refitem.key] == this.scrollPos
          }
        }
      }
    })
  }

  onMomentumScrollBegin = () => {
    this.isScroll = true
  }

  onMomentumScrollEnd = () => {
    this.isScroll = false
    this.syncScrollOffset()
  }

  onScrollEndDrag = () => {
    this.syncScrollOffset()
  }

  changeIndex = index => {
    this.setState({ index })
  }

  render() {
    const { index, finishAnimation } = this.state
    const { isAuth, user } = this.props

    // return null

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
      <>
        <NavbarTop title={'My profile'} style={{ zIndex: 2 }} />
        {finishAnimation ? (
          <>
            <Animated.Code>
              {() =>
                call([this.y], ([val]) => {
                  this.scrollPos = val
                })
              }
            </Animated.Code>
            <View style={{ flex: 1 }}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={this.renderScene}
                renderTabBar={props => {
                  return (
                    <TabMenuCursor
                      {...props}
                      y={this.y}
                      contentHeight={contentHeight}
                    />
                  )
                }}
                onIndexChange={this.changeIndex}
                initialLayout={{
                  height: 0,
                  width: Dimensions.get('window').width,
                }}
              />
            </View>
            {this.renderHeader()}
          </>
        ) : (
          <ProfileLoader style={{ marginVertical: 8, marginHorizontal: 16 }} />
        )}
      </>
    )
    return null
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
