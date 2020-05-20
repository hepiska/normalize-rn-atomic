import React, { Component } from 'react'

import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { colors } from '@utils/constants'
import NavbarTop from '@src/components/molecules/navbar-top'

const run = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
  var mainWrapper = document.getElementsByClassName("main-wrapper");
  mainWrapper[0].style.paddingTop = "15px";
  var footer = document.getElementsByClassName("footer-nav"); 
  footer[0].remove();
  true
})()`

class SizeGuideWebView extends Component<any, any> {
  webref = null

  render() {
    return (
      <>
        <NavbarTop
          title="Size Guide"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <WebView
          ref={r => (this.webref = r)}
          source={{
            uri: Config.SHONET_URI + '/size-guide',
          }}
          onLoadEnd={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            if (!nativeEvent.loading) {
              this.webref.injectJavaScript(run)
            }
          }}
          originWhitelist={['https://*']}
        />
      </>
    )
  }
}

export default SizeGuideWebView
