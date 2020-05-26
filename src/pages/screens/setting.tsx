import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { fontStyle } from '@src/components/commont-styles'
import ActionListCard from '@components/molecules/action-list-card'
import { navigate } from '@src/root-navigation'

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
  render() {
    return (
      <>
        <NavbarTop
          title="Settings"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
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
      </>
    )
  }
}
export default Settings
