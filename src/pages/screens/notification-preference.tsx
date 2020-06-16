import React, { Component } from 'react'
import { View, Text, StyleSheet, InteractionManager } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { fontStyle } from '@src/components/commont-styles'
import ToggleListCard from '@src/components/molecules/toggle-list-card'
import {
  getNotificationPreferences,
  setNotificationSetting,
} from '@modules/user/action'
import { bindActionCreators } from 'redux'
import { deepClone } from '@src/utils/helpers'
import ActionListLoader from '@components/atoms/loaders/action-list-loader'

const styles = StyleSheet.create({
  playfair24: {
    ...fontStyle.playfairBold,
    fontSize: 24,
    color: colors.black100,
  },
})

class NotificationPreferene extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })

      this.props.getNotificationPreferences()
    })
  }

  handleSwitchToggle = key => {
    let newSetting = deepClone(this.props.notificationSetting)
    newSetting[key] = !newSetting[key]
    delete newSetting.created_at
    delete newSetting.updated_at
    delete newSetting.user_id
    this.props.setNotificationSetting(newSetting)
  }
  render() {
    const { notificationSetting } = this.props
    const { finishAnimation } = this.state

    const notificationMenu = [
      {
        title: 'Push Notification Settings',
        subMenu: [
          {
            title: 'Post Likes',
            desc: 'Send push notifications when user liked your posts',
            onPress: () => {
              this.handleSwitchToggle('notification_like_push')
            },
            isEnabled: notificationSetting.notification_like_push,
          },
          {
            title: 'Post Comments',
            desc: 'Send push notifications when user commented your post',
            onPress: () => {
              this.handleSwitchToggle('notification_comment_push')
            },
            isEnabled: notificationSetting.notification_comment_push,
          },
          {
            title: 'New Followers',
            desc: 'Send notifications when a user followed your profile',
            onPress: () => {
              this.handleSwitchToggle('notification_follow_push')
            },
            isEnabled: notificationSetting.notification_follow_push,
          },
        ],
      },
      {
        title: 'Email Settings',
        subMenu: [
          {
            title: 'Post Likes',
            desc: 'Send email when user liked your posts',
            onPress: () => {
              this.handleSwitchToggle('notification_like_email')
            },
            isEnabled: notificationSetting.notification_like_email,
          },
          {
            title: 'Post Comments',
            desc: 'Send email when user commented on your posts',
            onPress: () => {
              this.handleSwitchToggle('notification_comment_email')
            },
            isEnabled: notificationSetting.notification_comment_email,
          },
          {
            title: 'New Followers',
            desc: 'Send email when user followed your profile',
            onPress: () => {
              this.handleSwitchToggle('notification_follow_email')
            },
            isEnabled: notificationSetting.notification_follow_email,
          },
          {
            title: 'Weekly Overview',
            desc: 'Send email of your profile overview every week',
            onPress: () => {
              this.handleSwitchToggle('notification_weekly_overview_email')
            },
            isEnabled: notificationSetting.notification_weekly_overview_email,
          },
        ],
      },
    ]
    return (
      <>
        <NavbarTop title="Notifications Preferences" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollView>
            <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
              {notificationMenu.map((item, key) => (
                <View
                  key={`notification-preference-${key}`}
                  style={{ marginVertical: 20 }}>
                  <Text style={{ ...styles.playfair24 }}>{item.title}</Text>
                  {item.subMenu.map((subItem, subKey) => (
                    <ToggleListCard
                      title={subItem.title}
                      desc={subItem.desc}
                      index={subKey}
                      key={`${item.title}-${subKey}`}
                      onPress={subItem.onPress}
                      isEnabled={subItem.isEnabled}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <ActionListLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getNotificationPreferences, setNotificationSetting },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  return {
    notificationSetting: state.user.notification,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationPreferene)
