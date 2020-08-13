import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import NavbarTop from '@src/components/molecules/navbar-top'
import { fontStyle } from '@src/components/commont-styles'
import { colors, coneectDanaCalback } from '@src/utils/constants'
import { Div, Image } from '@components/atoms/basic'
import { Button } from '@src/components/atoms/button'
import DanaConnect from './dana-connect'

const styles = StyleSheet.create({
  h1: {
    ...fontStyle.playfairMedium,
    fontSize: 24,
    color: colors.black100,
    textAlign: 'center',
    marginBottom: 20,
  },
  h2: {
    ...fontStyle.helveticaThin,
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: 350,
  },
  button: {
    width: '100%',
    backgroundColor: colors.black100,
    marginTop: 32,
    height: 42,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

class InitialConnectDana extends React.Component<any, any> {
  state: {
    showInitialState: boolean
    redirect_url: string
  }
  constructor(props) {
    super(props)
    this.state = {
      showInitialState: true,
      redirect_url: '',
    }
  }

  goToConnectDana = () => {
    this.setState({ showInitialState: !this.state.showInitialState })
  }

  connectPhoneNumber = url => {
    this.setState({ redirect_url: url.redirect_url })
  }

  _redirect = navState => {
    if (navState.url === coneectDanaCalback) {
      this.props.changeConectedana()
    }
  }

  render() {
    if (this.state.redirect_url) {
      return (
        <WebView
          originWhitelist={['https://*']}
          source={{ uri: this.state.redirect_url }}
          onNavigationStateChange={this._redirect}
        />
      )
    }
    if (this.state.showInitialState) {
      return (
        <>
          <Div _width="100%" _justify="center" align="center" _padding="16px">
            <Image
              source={require('../../assets/placeholder/dana-illustration.png')}
              style={styles.image}
            />
            <Text style={styles.h1}>
              Withdrawal process {'\n'}need connect to Dana
            </Text>
            <Text style={styles.h2}>
              Balance that you withdraw will immediately realese to {'\n'} your
              Dana account, so we need connect to your Dana {'\n'} account
              first.
            </Text>
            <Button
              title="Connect To Dana"
              onPress={this.goToConnectDana}
              style={styles.button}
              fontStyle={styles.buttonText}
            />
          </Div>
        </>
      )
    }
    return <DanaConnect connectPhoneNumber={this.connectPhoneNumber} />
  }
}

export default InitialConnectDana
