import React, { Component } from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { fontStyle } from '@src/components/commont-styles'
import ActionListCard from '@components/molecules/action-list-card'
import { navigate } from '@src/root-navigation'
import ActionListLoader from '@components/atoms/loaders/action-list-loader'

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
        <NavbarTop
          title="Password &amp; Security"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {finishAnimation ? (
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
        ) : (
          <ActionListLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}
export default PasswordSecurity
