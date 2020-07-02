import React, { Component } from 'react'
import { View, InteractionManager } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import ActionListCard from '@components/molecules/action-list-card'
import { navigate } from '@src/root-navigation'
import SettingLoader from '@components/atoms/loaders/setting-loader'

const settingMenu = [
  {
    title: 'Password & Security',
    desc: 'What am I supposed to do when the best part of me',
    onPress: () => navigate('Screens', { screen: 'PasswordSecurity' }),
  },
  {
    title: 'Notifications Preferences',
    onPress: () => navigate('Screens', { screen: 'NotificationPreference' }),
  },
  {
    title: 'Terms & Conditions',
    onPress: () => navigate('Screens', { screen: 'TermsCondition' }),
  },
  {
    title: 'Privacy Policy',
    onPress: () => navigate('Screens', { screen: 'PrivacyPolicy' }),
  },
]

class Settings extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }
  render() {
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop title="Settings" leftContent={['back']} />
        {finishAnimation ? (
          <ScrollView>
            <View style={{ paddingHorizontal: 16 }}>
              {settingMenu &&
                settingMenu.map((item, key) => (
                  <ActionListCard
                    key={`setting-${key}`}
                    title={item.title}
                    desc={item.desc}
                    index={key}
                    onPress={item.onPress}
                  />
                ))}
            </View>
          </ScrollView>
        ) : (
          <SettingLoader style={{ marginHorizontal: 8 }} />
        )}
      </>
    )
  }
}
export default Settings
