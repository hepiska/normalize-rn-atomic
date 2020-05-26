import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { fontStyle } from '@src/components/commont-styles'
import ActionListCard from '@components/molecules/action-list-card'
import { navigate } from '@src/root-navigation'

const securityMenu = [
  {
    title: 'Password',
    onPress: () => {
      navigate('Screens', { screen: 'FormChangePassword' })
    },
  },
  {
    title: 'PIN',
    onPress: () => {},
  },
]

class PasswordSecurity extends Component<any, any> {
  render() {
    return (
      <>
        <NavbarTop
          title="Password &amp; Security"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            {securityMenu &&
              securityMenu.map((item, key) => (
                <ActionListCard
                  key={`setting-${key}`}
                  title={item.title}
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
export default PasswordSecurity
