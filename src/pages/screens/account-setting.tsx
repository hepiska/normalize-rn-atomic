import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  InteractionManager,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import { fontStyle } from '@src/components/commont-styles'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import ActionListCard from '@components/molecules/action-list-card'
import NavbarTop from '@src/components/molecules/navbar-top'
import { ScrollView } from 'react-native-gesture-handler'
import { bindActionCreators } from 'redux'
import { setLogout } from '@modules/auth/action'
import { connect } from 'react-redux'
import AccountSettingPageLoader from '@components/atoms/loaders/account-setting'
import TransactionOrderAction from '@components/organisms/transaction-order-action'
import { setImage as changeImageUri } from '@utils/helpers'
import ModalPreviewImage from '@components/molecules/modal-preview-image'
import EarningsCard from '@src/components/molecules/earnings-card'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
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

const StatsCard = ({ title, image, desc, style, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ width: 106, height: 52, ...style }}>
      <Text style={{ ...styles.helveticaBold14 }}>{title}</Text>
      <View
        style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 10, height: 10 }} source={image} />
        <Text
          style={{
            ...styles.helvetica12,
            color: colors.black70,
            marginLeft: 6,
          }}>
          {desc}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

class AccountSetting extends Component<any, any> {
  state = {
    finishAnimation: false,
    isVisible: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user !== this.props.user) {
      return true
    }

    if (nextState.isVisible !== this.state.isVisible) {
      return true
    }

    if (nextState.finishAnimation !== this.state.finishAnimation) {
      return true
    }
    return false
  }
  myOrderList = [
    {
      icon: require('@src/assets/icons/mapmarker.png'),
      title: 'My Delivery Address',
      desc: 'Add or edit your delivery address',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    // {
    //   icon: require('@src/assets/icons/return-or-exchange.png'),
    //   title: 'My Return or Exchange',
    //   desc: 'Track your past and current return or exchange',
    //   onPress: () => {},
    // },
  ]

  mySocialList = [
    {
      icon: require('@src/assets/icons/beauty-profile.png'),
      title: 'Beauty Profile',
      desc: 'View and edit your beauty profile',
      onPress: () => navigateTo('Screens', 'BeautyProfile', {}),
    },
    {
      icon: require('@src/assets/icons/topic-and-interest.png'),
      title: 'Topic and Interest',
      desc: 'Manage your topic and interest',
      onPress: () => navigateTo('Screens', 'TopicInterest', {}),
    },
    {
      icon: require('@src/assets/icons/become-insider.png'),
      title: 'Become an Insider',
      desc: 'Be the part of the Insiders Community',
    },
    {
      icon: require('@src/assets/icons/revenue.png'),
      title: 'My Revenue',
      desc: 'Manage your revenue with ease',
    },
  ]

  couponList = [
    {
      icon: require('@src/assets/icons/add-user.png'),
      title: 'GET 10% DISCOUNT COUPON ',
      desc: 'Share your invitation code',
      backgroundImage: require('@src/assets/placeholder/get-coupon-bg.png'),
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
    {
      icon: require('@src/assets/icons/price-tag.png'),
      title: 'Promo Code ',
      desc: 'Enter Promo code and earn gift',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
  ]

  othersList = [
    {
      icon: require('@src/assets/icons/setting.png'),
      title: 'Settings',
      desc: 'View and set your account preferences',
      onPress: () => {
        navigate('Screens', { screen: 'Setting' })
      },
    },
    // {
    //   icon: require('@src/assets/icons/question-circle.png'),
    //   title: 'Help',
    //   desc: 'Find the best answer to your question',
    // },
    {
      icon: require('@src/assets/icons/logout.png'),
      title: 'Log Out',
      desc: 'It’s okay to leave sometimes',
      onPress: async () => {
        navigate('Main', { screen: 'Shop' })
        await this.props.setLogout()
      },
    },
  ]

  gotoFollowPage = followType => () => {
    navigateTo('Screens', 'Follow', {
      followType,
      name: this.props.user.name,
    })
  }

  onPressDetailOrder = () => {
    navigateTo('Screens', 'OrderList', {})
  }
  onPressStatusOrder = (filter, screenName) => () => {
    navigateTo('Screens', screenName, {
      selectedFilter: filter,
      hideHeader: true,
    })
  }
  _openModal = () => this.setState({ isVisible: true })

  _closeModal = () => this.setState({ isVisible: false })
  render() {
    const { finishAnimation, isVisible } = this.state
    const { user } = this.props

    if (!user) {
      return null
    }

    return (
      <View>
        <NavbarTop title="Account Settings" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollView
            style={{
              paddingHorizontal: 16,
              paddingVertical: 26,
            }}>
            <View
              style={{
                marginBottom: 86,
              }}>
              {/* user basic Profile */}
              <View
                style={{
                  marginBottom: 26,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <TouchableWithoutFeedback
                    onPress={user.photo_url ? this._openModal : null}>
                    <Image
                      source={
                        user.photo_url
                          ? { uri: user.photo_url }
                          : require('@src/assets/placeholder/placeholder2.jpg')
                      }
                      style={{ ...styles.image }}
                    />
                  </TouchableWithoutFeedback>
                  <ModalPreviewImage
                    image={[
                      user.photo_url
                        ? {
                            url: changeImageUri(user.photo_url, {
                              width: width,
                              height: width,
                            }),
                          }
                        : {},
                    ]}
                    isVisible={isVisible}
                    onCloseModal={this._closeModal}
                  />
                </View>
                <View style={{ marginLeft: 16 }}>
                  {user.name && (
                    <Text style={{ ...fontStyle.playfairBold, fontSize: 18 }}>
                      {user.name}
                    </Text>
                  )}
                  {user.username && (
                    <Text
                      style={{
                        ...fontStyle.helvetica,
                        fontSize: 14,
                        color: colors.black60,
                        marginTop: 8,
                      }}>
                      {`@${user.username}`}
                    </Text>
                  )}
                </View>
              </View>

              {/* user stats */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <StatsCard
                    desc="Follower"
                    image={require('@assets/icons/follower-add.png')}
                    title={user.follower_count || 0}
                    style={{ marginRight: 4 }}
                    onPress={this.gotoFollowPage('Follower')}
                  />
                  <StatsCard
                    desc="Following"
                    image={require('@assets/icons/follower.png')}
                    title={user.following_count || 0}
                    style={{ marginRight: 4 }}
                    onPress={this.gotoFollowPage('Following')}
                  />
                  <StatsCard
                    desc="Total Post"
                    image={require('@assets/icons/post.png')}
                    title={user.posts_count || 0}
                    style={{ marginRight: 4 }}
                    onPress={() => {}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <StatsCard
                    desc="Total View"
                    image={require('@assets/icons/viewer.png')}
                    title={user.view_count || 0}
                    style={{ marginRight: 4 }}
                    onPress={() => {}}
                  />
                  <StatsCard
                    desc="Total Like"
                    image={require('@assets/icons/like.png')}
                    title={user.like_count || 0}
                    style={{ marginRight: 4 }}
                    onPress={() => {}}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20, marginBottom: 40 }}>
                <EarningsCard />
              </View>
              {/* my shopping */}
              <View>
                <Text
                  style={{
                    ...fontStyle.playfairBold,
                    fontSize: 24,
                    color: colors.black100,
                  }}>
                  My Shopping
                </Text>

                {/* <View
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
                </View> */}
                <View style={{ marginTop: 17 }}>
                  <TransactionOrderAction />
                </View>
                <View style={{ marginTop: 16 }}>
                  {this.myOrderList.map((value, key) => {
                    return (
                      <ActionListCard
                        isFirst
                        key={`orderlist-card-${key}`}
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

              <View style={{ marginTop: 60 }}>
                {this.couponList.map((value, key) => {
                  return (
                    <ActionListCard
                      isFirst
                      key={`orderlist-card-${key}`}
                      backgroundImage={value.backgroundImage}
                      icon={value.icon}
                      borderRadius={8}
                      style={{
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        overflow: 'hidden',
                      }}
                      title={value.title}
                      desc={value.desc}
                      index={key}
                      onPress={value.onPress}
                    />
                  )
                })}
              </View>
              {/* my social  */}
              {/* <View
                style={{
                  marginTop: 54,
                }}>
                <Text
                  style={{
                    ...fontStyle.playfairBold,
                    fontSize: 24,
                    color: colors.black100,
                  }}>
                  My Social
                </Text>

                <View>
                  {this.mySocialList.map((value, key) => {
                    return (
                      <ActionListCard
                        key={`sociallist-card-${key}`}
                        icon={value.icon}
                        title={value.title}
                        desc={value.desc}
                        index={key}
                        onPress={value.onPress}
                      />
                    )
                  })}
                </View>
              </View> */}
              {/* others  */}
              <View
                style={{
                  marginTop: 54,
                  marginBottom: 67,
                }}>
                <Text
                  style={{
                    ...fontStyle.playfairBold,
                    fontSize: 24,
                    color: colors.black100,
                  }}>
                  Others
                </Text>

                <View>
                  {this.othersList.map((value, key) => {
                    return (
                      <ActionListCard
                        key={`otherlist-card-${key}`}
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
        ) : (
          <AccountSettingPageLoader style={{ marginHorizontal: 16 }} />
        )}
      </View>
    )
  }
}
const mapStateToProps = state => {
  if (!state.auth.data.user) {
    return {}
  }

  return {
    user: state.user.data[state.auth.data.user.id] || state.auth.data.user,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLogout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting)
