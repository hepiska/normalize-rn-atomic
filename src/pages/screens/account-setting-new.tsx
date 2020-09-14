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
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@src/assets/fonts/custom-icons'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

const StatsCard = ({ title, icon, desc, onPress }) => {
  const fullWidth = width - 32

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: fullWidth / 3, height: 52 }}>
        <Text style={{ ...styles.helveticaBold14 }}>{title}</Text>
        <View
          style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={icon} size={10} color={colors.black70} />
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
}

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
      icon: 'map-marker',
      title: 'My Delivery Address',
      desc: 'Add or edit your delivery address',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    {
      icon: 'return',
      title: 'My Return or Exchange',
      desc: 'Track your past and current return or exchange',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    {
      icon: 'label',
      title: 'Promo Code',
      desc: 'Enter promo code and earn gift',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    {
      icon: 'coupon',
      title: 'Coupon',
      desc: 'My Coupon',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
  ]

  mySocialList = [
    {
      icon: 'gift',
      title: 'Referals',
      desc: 'Share your code and get 10% discount',
      onPress: () => navigateTo('Screens', 'BeautyProfile', {}),
    },
    {
      icon: 'bookmark',
      title: 'Bookmark',
      desc: 'List of your bookmark post',
      onPress: () => navigateTo('Screens', 'TopicInterest', {}),
    },
    {
      icon: 'register-edit',
      title: 'Draft Post',
      desc: 'List of your draft post',
    },
    {
      icon: 'register',
      title: 'Submitted Post',
      desc: 'List of your submitted post',
    },
    {
      icon: 'calendar',
      title: 'Schedule Publication',
      desc: 'Set up your schedule publication',
    },
    {
      icon: 'document-format',
      title: 'Archived',
      desc: 'List of your archived post',
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

  supportList = [
    {
      icon: 'undo',
      title: 'Return and Exchange Policy',
      desc: 'Read our return & exchange policy',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
    {
      icon: 'shield',
      title: 'Privacy Policy',
      desc: 'Read our privacy policy',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
    {
      icon: 'info-circle',
      title: 'Terms and Condition',
      desc: 'Read our terms and condition',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
    {
      icon: 'question-circle',
      title: 'FAQ',
      desc: 'Find the best answer to your question',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
    {
      icon: 'phone',
      title: 'Contact Us',
      desc: 'Let us know when you need help',
      onPress: () => navigateTo('Screens', 'PromoCode', {}),
    },
  ]

  othersList = [
    {
      icon: 'cog',
      title: 'Settings',
      desc: 'View and set your account preferences',
      onPress: () => {
        navigate('Screens', { screen: 'Setting' })
      },
    },
    {
      icon: 'building',
      title: 'About Us',
      desc: 'Find out what The Shonet is',
      onPress: () => {
        navigate('Screens', { screen: 'Setting' })
      },
    },
    {
      icon: 'turn-off',
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

    const TitleHeader = ({ title }) => {
      return (
        <Text
          style={{
            ...fontStyle.playfair,
            fontSize: 20,
            color: colors.black100,
          }}>
          {title}
        </Text>
      )
    }

    const statusList = [
      {
        desc: 'Followers',
        icon: 'add-user',
        title: user.follower_count || 0,
        onPress: this.gotoFollowPage('Follower'),
      },
      {
        desc: 'Following',
        icon: 'user',
        title: user.following_count || 0,
        onPress: this.gotoFollowPage('Following'),
      },
      {
        desc: 'Total Post',
        icon: 'conversation',
        title: user.posts_count || 0,
        onPress: () => {},
      },
      {
        desc: 'Total Views',
        icon: 'viewer',
        title: user.posts_count || 0,
        onPress: () => {},
      },
      {
        desc: 'Total Likes',
        icon: 'like',
        title: user.like_count || 0,
        onPress: () => {},
      },
    ]

    return (
      <SafeAreaView style={{ paddingTop: 0, flex: 1 }}>
        <NavbarTop title="Account Settings" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}>
            {/* user basic Profile */}
            <View
              style={{
                marginBottom: 24,
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
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {statusList?.map((res, idx) => {
                return (
                  <StatsCard
                    desc={res.desc}
                    icon={res.icon}
                    title={res.title}
                    onPress={res.onPress}
                  />
                )
              })}
            </View>

            {/* earning cards  */}
            <View style={{ marginTop: 16, marginBottom: 24 }}>
              <EarningsCard />
            </View>
            {/* my shopping */}
            <View style={{ marginBottom: 24 }}>
              <TitleHeader title={'My Shopping'}></TitleHeader>
              <View style={{ marginVertical: 16 }}>
                <TransactionOrderAction />
              </View>

              <View>
                {this.myOrderList.map((value, idx) => {
                  return (
                    <ActionListCard
                      key={`orderlist-card-${idx}`}
                      icon={value.icon}
                      title={value.title}
                      desc={value.desc}
                      index={idx}
                      onPress={value.onPress}
                      style={{
                        borderBottomColor:
                          idx === this.myOrderList.length - 1
                            ? colors.white
                            : colors.black50,
                        borderBottomWidth: 1,
                      }}
                    />
                  )
                })}
              </View>
            </View>
            {/* My Social */}
            <View style={{ marginBottom: 24 }}>
              <TitleHeader title={'My Social'}></TitleHeader>
              <>
                {this.mySocialList.map((value, idx) => {
                  return (
                    <ActionListCard
                      key={`sociallist-card-${idx}`}
                      icon={value.icon}
                      title={value.title}
                      desc={value.desc}
                      index={idx}
                      onPress={value.onPress}
                      style={{
                        borderBottomColor:
                          idx === this.mySocialList.length - 1
                            ? colors.white
                            : colors.black50,
                        borderBottomWidth: 1,
                      }}
                    />
                  )
                })}
              </>
            </View>
            {/* Support */}
            <View style={{ marginBottom: 24 }}>
              <TitleHeader title={'Support'}></TitleHeader>
              <>
                {this.supportList.map((value, idx) => {
                  return (
                    <ActionListCard
                      key={`support-card-${idx}`}
                      icon={value.icon}
                      title={value.title}
                      desc={value.desc}
                      index={idx}
                      onPress={value.onPress}
                      style={{
                        borderBottomColor:
                          idx === this.supportList.length - 1
                            ? colors.white
                            : colors.black50,
                        borderBottomWidth: 1,
                      }}
                    />
                  )
                })}
              </>
            </View>

            <View>
              <Text
                style={{
                  ...fontStyle.playfair,
                  fontSize: 20,
                  color: colors.black100,
                }}>
                Others
              </Text>

              <View>
                {this.othersList.map((value, idx) => {
                  return (
                    <ActionListCard
                      key={`otherlist-card-${idx}`}
                      icon={value.icon}
                      title={value.title}
                      desc={value.desc}
                      index={idx}
                      onPress={value.onPress}
                      style={{
                        borderBottomColor:
                          idx === this.othersList.length - 1
                            ? colors.white
                            : colors.black50,
                        borderBottomWidth: 1,
                      }}
                    />
                  )
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <AccountSettingPageLoader style={{ marginHorizontal: 16 }} />
        )}
      </SafeAreaView>
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
