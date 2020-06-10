import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  InteractionManager,
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

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

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

class AccountSetting extends Component<any, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }
  myOrderList = [
    {
      icon: require('@src/assets/icons/mapmarker.png'),
      title: 'My Delivery Address',
      desc: 'Add or edit your delivery address',
      onPress: () => navigateTo('Screens', 'ChooseAddress', {}),
    },
    {
      icon: require('@src/assets/icons/return-or-exchange.png'),
      title: 'My Return or Exchange',
      desc: 'Track your past and current return or exchange',
      onPress: () => {},
    },
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

  othersList = [
    {
      icon: require('@src/assets/icons/setting.png'),
      title: 'Settings',
      desc: 'View and set your account preferences',
      onPress: () => {
        navigate('Screens', { screen: 'Setting' })
      },
    },
    {
      icon: require('@src/assets/icons/question-circle.png'),
      title: 'Help',
      desc: 'Find the best answer to your question',
    },
    {
      icon: require('@src/assets/icons/logout.png'),
      title: 'Log Out',
      desc: 'It’s okay to leave sometimes',
      onPress: async () => {
        await this.props.setLogout()
        navigate('Main', { screen: 'Shop' })
      },
    },
  ]

  onPressDetailOrder = () => {
    navigateTo('Screens', 'OrderList', {})
  }
  onPressStatusOrder = (filter, screenName) => () => {
    navigateTo('Screens', screenName, {
      selectedFilter: filter,
      hideHeader: true,
    })
  }
  render() {
    const { finishAnimation } = this.state
    return (
      <View>
        <NavbarTop title="Account Settings" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollView
            style={{
              paddingHorizontal: 16,
              paddingVertical: 26,
            }}>
            <View style={{ marginBottom: 86 }}>
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
              </View>
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
          <AccountSettingPageLoader style={{ margin: 16 }} />
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLogout }, dispatch)

export default connect(null, mapDispatchToProps)(AccountSetting)
