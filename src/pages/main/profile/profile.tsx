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
import IconEi from 'react-native-vector-icons/EvilIcons'
import { getUser } from '@modules/user/action'
import { fontStyle, borderStyle } from '@src/components/commont-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'
import { setLogout } from '@modules/auth/action'
import ProfileEmptyState from '@components/molecules/profile-empty-state'
import ActionListCard from '@components/molecules/action-list-card'
import ProfileLoader from '@components/atoms/loaders/profile'
import ImageViewer from 'react-native-image-zoom-viewer'
import styled from 'styled-components/native'
import TabMenu from '@src/components/layouts/tab-menu'
import { ScrollView } from 'react-native-gesture-handler'
import MyPost from '@components/organisms/my-post'
import MySaved from '@components/organisms/my-saved'
import MyInsight from '@components/organisms/my-insight'
import FocusContainer from '@src/components/molecules/focus-container'

const headerHeight = 54
const { width, height } = Dimensions.get('screen')

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

const initialActiveTab = 'userpost'

const styles = StyleSheet.create({
  header: { height: headerHeight },
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

class ProfilPage extends React.PureComponent<any, any> {
  state = {
    defaultImage: null,
    activeTab: initialActiveTab,
    isVisible: false,
    showName: false,
    enableScrollContent: false,
    finishAnimation: false,
  }

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
    // if (isAuth && user.id) {
    //   getUser(user.id, 'id')
    // }
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

  onPressStatusOrder = (filter, screenName) => () => {
    navigateTo('Screens', screenName, {
      selectedFilter: filter,
      hideHeader: true,
    })
  }

  onPressDetailOrder = () => {
    navigateTo('Screens', 'OrderList', {})
  }

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

  _openModal = () => this.setState({ isVisible: true })
  _closeModal = () => this.setState({ isVisible: false })

  _headerComp = () => (
    <AbsDiv>
      <TouchableWithoutFeedback onPress={this._closeModal}>
        <Div _width="100%" align="flex-start" _margin="28px" _padding="20px">
          <IconEi name="close" size={24} color={colors.black100} />
        </Div>
      </TouchableWithoutFeedback>
    </AbsDiv>
  )

  _changeSelected = selectedItem => {
    this.setState({ activeTab: selectedItem.name })
  }
  _onScroll = e => {
    if (
      (this as any).profileLayout.height / 2 - e.nativeEvent.contentOffset.y <
      2
    ) {
      this.setState({ showName: true })
    } else {
      this.setState({ showName: false })
    }

    if (
      (this as any).profileLayout.height - e.nativeEvent.contentOffset.y <
      2
    ) {
      this.setState({ enableScrollContent: true })
    } else {
      this.setState({ enableScrollContent: false })
    }
  }
  _disableContentScroll = () => {
    this.setState({ enableScrollContent: false })
  }
  _onLayout = e => {
    ;(this as any).profileLayout = e.nativeEvent.layout
  }

  TabMenuData = [
    {
      name: 'userpost',
      title: 'Posts',
      Component: (
        <MyPost
          navigation={this.props.navigation}
          scrollEnabled={this.state.enableScrollContent}
          disableScroll={this._disableContentScroll}
          key="tabmenu-userpost"
        />
      ),
    },
    {
      name: 'saved',
      title: 'Saved List',
      Component: (
        <MySaved
          navigation={this.props.navigation}
          scrollEnabled={this.state.enableScrollContent}
          disableScroll={this._disableContentScroll}
          key="tabmenu-saved"
        />
      ),
    },
    {
      name: 'insight',
      title: 'Insight',
      Component: (
        <MyInsight
          navigation={this.props.navigation}
          scrollEnabled={this.state.enableScrollContent}
          disableScroll={this._disableContentScroll}
          key="tabmenu-insight"
        />
      ),
    },
  ]

  render() {
    const { isAuth, navigation, user } = this.props
    const {
      defaultImage,
      isVisible,
      activeTab,
      enableScrollContent,
      showName,
      finishAnimation,
    } = this.state

    // const TabMenuData =
    const imgSize = isVisible
      ? { width: width, height: width }
      : { width: 64, height: 64 }

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
        <>
          <NavbarTop title={showName ? user.name : 'My profile'} />
          {finishAnimation ? (
            <View style={{ flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={this._onScroll}
                bounces={false}
                nestedScrollEnabled={true}
                scrollEventThrottle={20}
                style={{ backgroundColor: colors.background, flex: 1 }}>
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
                        source={
                          typeof image === 'string' ? { uri: image } : image
                        }
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
                        <Text style={{ ...styles.futuraBold20 }}>
                          {user.name}
                        </Text>
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
                        <TouchableOpacity
                          onPress={this.gotoFollowPage('Follower')}>
                          <Text
                            style={{
                              ...styles.helvetica12,
                              color: colors.black80,
                            }}>{`Followers ${user.follower_count || 0}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.gotoFollowPage('Following')}>
                          <View style={{ marginLeft: 24 }}>
                            <Text
                              style={{
                                ...styles.helvetica12,
                                color: colors.black80,
                              }}>{`Following ${user.following_count ||
                              0}`}</Text>
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
                      <Icon
                        name="map-marker-alt"
                        size={16}
                        color={colors.black60}
                      />
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
                      <Text
                        style={{
                          ...fontStyle.helvetica,
                          fontSize: 12,
                          color: colors.black80,
                        }}>
                        {user.biography || user.biography !== ''
                          ? user.biography
                          : 'Welcome to my page'}
                      </Text>
                    </View>
                  </View>

                  {/* score */}
                  <FocusContainer style={{ padding: 16, marginTop: 8 }}>
                    <Text
                      style={{ ...styles.helveticaBold24, color: '#3067E4' }}>
                      0
                    </Text>
                  </FocusContainer>
                </View>
                <View
                  style={{
                    width,
                    flex: 1,
                    // height,
                  }}>
                  <TabMenu
                    isLazyload
                    items={this.TabMenuData}
                    forceRender={enableScrollContent}
                    selectedItem={activeTab}
                    onChangeTab={this._changeSelected}
                  />
                </View>
              </ScrollView>
            </View>
          ) : (
            <ProfileLoader
              style={{ marginVertical: 8, marginHorizontal: 16 }}
            />
          )}
        </>
      )
    }

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
