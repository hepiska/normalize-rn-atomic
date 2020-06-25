import React, { Component } from 'react'
import { Alert } from 'react-native'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'

const run = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
  var mainWrapper = document.getElementsByClassName("main-wrapper");
  mainWrapper[0].style.paddingTop = "0px";
  true
})()`

class Articles extends Component<any, any> {
  webref = null

  render() {
    const { postType, postSlug, postTitle } = this.props
    if (!postType && !postSlug && !postTitle) {
      return null
    }
    return (
      <>
        <NavbarTop
          title={postTitle}
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <WebView
          ref={r => (this.webref = r)}
          source={{
            uri: Config.SHONET_URI + '/articles/' + postType + '/' + postSlug,
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

const mapStateToProps = (state, ownProps) => {
  const postType = ownProps.route.params.postType
  const postSlug = ownProps.route.params.postSlug
  const postTitle = ownProps.route.params.postTitle

  return {
    postType,
    postSlug,
    postTitle,
  }
}
export default connect(mapStateToProps, null)(Articles)
