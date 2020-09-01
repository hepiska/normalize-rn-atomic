import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@src/components/commont-styles'
import { navigate } from '@src/root-navigation'
import { Button } from '@src/components/atoms/button'

export default class LandingRegister extends Component {
  _triggerRegister = () => {
    navigate('modals', { screen: 'RegisterModal' })
  }

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            height: '85%',
            width: '100%',
            padding: 16,
            backgroundColor: colors.black100,
          }}>
          <Image
            style={{
              width: 150,
              height: 20,
              marginBottom: 24,
              marginTop: '20%',
            }}
            source={require('@assets/icons/the-shonet-logo-white.png')}
          />
          <Text
            style={{
              color: colors.white,
              ...fontStyle.playfairBold,
              fontSize: 28,
            }}>
            Here is how you can earn while sharing what you love!
          </Text>
          <Button
            onPress={this._triggerRegister}
            title={'SIGN UP'}
            style={{
              backgroundColor: 'transparent',
              borderColor: colors.white,
              borderWidth: 1,
              width: '50%',
              marginTop: 32,
            }}
            fontStyle={{ marginLeft: 0, color: colors.white }}
          />
          <Image
            style={{ position: 'absolute', bottom: '-40%', right: 0 }}
            source={require('@assets/placeholder/register-landing.png')}
          />
        </View>
      </SafeAreaView>
    )
  }
}
