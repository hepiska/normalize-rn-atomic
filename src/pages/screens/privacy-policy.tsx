import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { removeHeaderWebviewScript } from '@utils/helpers'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { colors } from '@utils/constants'
import NavbarTop from '@src/components/molecules/navbar-top'
import ArticleLoader from '@src/components/atoms/loaders/article'

class PrivacyPolicyWebView extends Component<any, any> {
  webref = null
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
          title="Privacy Policy"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {finishAnimation ? (
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
        ) : (
          <ArticleLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

export default PrivacyPolicyWebView
