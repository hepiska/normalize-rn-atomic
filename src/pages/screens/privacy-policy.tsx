import React, { Component } from 'react'
import { removeHeaderWebviewScript } from '@utils/helpers'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { colors } from '@utils/constants'
import NavbarTop from '@src/components/molecules/navbar-top'

class PrivacyPolicyWebView extends Component<any, any> {
  webref = null

  render() {
    return (
      <>
        <NavbarTop
          title="Privacy Policy"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <WebView
          ref={r => (this.webref = r)}
          source={{
            uri: Config.SHONET_URI + '/privacy',
          }}
          onLoadEnd={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            if (!nativeEvent.loading) {
              this.webref.injectJavaScript(removeHeaderWebviewScript)
            }
          }}
          originWhitelist={['https://*']}
        />
      </>
    )
  }
}

export default PrivacyPolicyWebView
