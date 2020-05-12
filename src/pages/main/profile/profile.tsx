import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ViewStyle,
  TouchableWithoutFeedback,
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
import ImageViewer from 'react-native-image-zoom-viewer'
import styled from 'styled-components/native'

const headerHeight = 54
const { width } = Dimensions.get('screen')

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

const styles = StyleSheet.create({
  header: { height: headerHeight },
  image: {
    width: 64,
    height: 64,
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
    width: '100%',
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

const myOrder = [
  {
    label: 'Waiting for Payment',
    image: require('@src/assets/icons/waiting-for-payment.png'),
    filterTransaction: ['unpaid', 'waiting'],
    screenName: 'PaymentList',
  },
  {
    label: 'In Process',
    image: require('@src/assets/icons/in-process.png'),
    filterTransaction: 'confirmed',
    screenName: 'OrderList',
  },
  {
    label: 'Sent',
    image: require('@src/assets/icons/sent.png'),
    filterTransaction: 'shipping',
    screenName: 'OrderList',
  },
  {
    label: 'Done',
    image: require('@src/assets/icons/done.png'),
    filterTransaction: 'completed',
    screenName: 'OrderList',
  },
]

const AbsDiv = styled(Div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`

class ProfilPage extends React.PureComponent<any, any> {
  state = {
    defaultImage: null,
    isVisible: false,
  }

  myOrderList = [
    {
      source: 'material-icon',
      icon: 'location-on',
      title: 'My Delivery Address',
      desc: 'Add or edit your delivery address',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'My Return or Exchange',
      desc: 'Track your past and current return or exchange',
      onPress: () => {},
    },
  ]

  mySocialList = [
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Beauty Profile',
      desc: 'View and edit your beauty profile',
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Topic and Interest',
      desc: 'Manage your topic and interest',
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Become an Insider',
      desc: 'Be the part of the Insiders Community',
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'My Revenue',
      desc: 'Manage your revenue with ease',
    },
  ]

  othersList = [
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Settings',
      desc: 'View and set your account preferences',
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Help',
      desc: 'Find the best answer to your question',
    },
    {
      source: 'material-icon',
      icon: 'save',
      title: 'Log Out',
      desc: 'It’s okay to leave sometimes',
      onPress: async () => {
        await this.props.setLogout()
      },
    },
  ]

  componentDidMount() {
    const { isAuth, username, getUser } = this.props
    if (isAuth && username) {
      getUser(username, 'username')
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuth, username, getUser } = this.props
    if (prevProps.isAuth !== isAuth) {
      if (isAuth && username) {
        getUser(username, 'username')
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

  render() {
    const { isAuth, navigation, user } = this.props
    const { defaultImage, isVisible } = this.state

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
        (!!user.photo_url
          ? changeImageUri(user.photo_url, imgSize)
          : defaultImages.product)
      return (
        <>
          <NavbarTop title="Profile" />
          <ScrollView style={{ backgroundColor: colors.white }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 26 }}>
              {/* photo, name, fols */}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this._openModal}>
                  <ImageAutoSchale
                    source={typeof image === 'string' ? { uri: image } : image}
                    onError={() => {
                      this.setState({ defaultImage: defaultImages.product })
                    }}
                    style={styles.image}
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
                    <Text
                      style={{
                        ...styles.helvetica12,
                        color: colors.black80,
                      }}>{`Followers ${user.follower_count || 0}`}</Text>
                    <View style={{ marginLeft: 24 }}>
                      <Text
                        style={{
                          ...styles.helvetica12,
                          color: colors.black80,
                        }}>{`Following ${user.following_count || 0}`}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* view my profile */}
              <View style={{ marginTop: 8 }}>
                <OutlineButton
                  title="View My Profile"
                  onPress={this.gotoEditProfile}
                  style={styles.button}
                  fontStyle={styles.buttonText}
                />
              </View>

              {/* score */}
              <View style={{ ...styles.score, marginTop: 8, padding: 16 }}>
                <Text style={{ ...styles.helveticaBold24, color: '#3067E4' }}>
                  0
                </Text>
              </View>

              {/* my payment */}
              <ActionListCard
                source="material-icon"
                icon="account-balance-wallet"
                title="My Payment"
                desc="Manage and track your payment activities"
                index={0}
                backgroundColor={colors.black10}
                borderRadius={8}
                style={{
                  paddingHorizontal: 16,
                  marginTop: 24,
                }}
                onPress={() => {}}
              />

              {/* my shopping */}
              <View
                style={{
                  marginTop: 40,
                }}>
                <Text
                  style={{
                    ...styles.futuraBold24,
                    color: colors.black100,
                  }}>
                  My Shopping
                </Text>

                <View
                  style={{
                    marginTop: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...styles.helveticaBold14,
                      color: colors.black100,
                    }}>
                    My Order
                  </Text>
                  <TouchableOpacity onPress={this.onPressDetailOrder}>
                    <Text
                      style={{
                        ...styles.helveticaBold12,
                        color: colors.blue60,
                      }}>
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 17 }}>
                  <View
                    style={{
                      marginTop: 17,
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    {myOrder.map((value, key) => {
                      return (
                        <TouchableOpacity
                          key={`myorder-${key}`}
                          onPress={this.onPressStatusOrder(
                            value.filterTransaction,
                            value.screenName,
                          )}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              maxWidth: 82,
                            }}>
                            <View
                              style={{
                                marginBottom: 8,
                              }}>
                              <Image
                                style={{ width: 40, height: 40 }}
                                source={value.image}
                              />
                            </View>
                            <Text
                              style={{
                                ...styles.helvetica10,
                                color: colors.black100,
                                textAlign: 'center',
                              }}>
                              {value.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
                <View style={{ marginTop: 16 }}>
                  {this.myOrderList.map((value, key) => {
                    return (
                      <ActionListCard
                        isFirst
                        key={`orderlist-card-${key}`}
                        source={value.source}
                        icon={value.icon}
                        title={value.title}
                        desc={value.desc}
                        index={key}
                        onPress={value.onPress}
                      />
                    )
                  })}
                </View>
              </View>

              {/* my social  */}
              <View
                style={{
                  marginTop: 54,
                }}>
                <Text
                  style={{
                    ...styles.futuraBold24,
                    color: colors.black100,
                  }}>
                  My Social
                </Text>

                <View>
                  {this.mySocialList.map((value, key) => {
                    return (
                      <ActionListCard
                        key={`sociallist-card-${key}`}
                        source={value.source}
                        icon={value.icon}
                        title={value.title}
                        desc={value.desc}
                        index={key}
                        onPress={() => {}}
                      />
                    )
                  })}
                </View>
              </View>

              {/* others  */}
              <View
                style={{
                  marginTop: 54,
                  marginBottom: 67,
                }}>
                <Text
                  style={{
                    ...styles.futuraBold24,
                    color: colors.black100,
                  }}>
                  Others
                </Text>

                <View>
                  {this.othersList.map((value, key) => {
                    return (
                      <ActionListCard
                        key={`otherlist-card-${key}`}
                        source={value.source}
                        icon={value.icon}
                        title={value.title}
                        desc={value.desc}
                        index={key}
                        onPress={value.onPress}
                      />
                    )
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
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
