import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { colors } from '@utils/constants'
import NavbarTop from '@src/components/molecules/navbar-top'
import ArticleLoader from '@src/components/atoms/loaders/article'
import { removeHeaderWebviewScript } from '@utils/helpers'

class TermConditionWebView extends Component<any, any> {
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
    const { route } = this.props
    const { title, uri } = route.params || {}

    return (
      <>
        <NavbarTop
          title={title || 'Terms and Condition'}
          leftContent={['back']}
        />
        {finishAnimation ? (
          <WebView
            ref={r => (this.webref = r)}
            source={{
              uri: uri || Config.SHONET_URI + '/terms-and-condition',
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
          <ArticleLoader style={{ marginHorizontal: 16 }} />
        )}
      </>
    )
  }
}

export default TermConditionWebView
