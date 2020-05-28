import React, { Component } from 'react'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import { removeHeaderWebviewScript } from '@utils/helpers'

class PostDetailPage extends Component<any, any> {
  webref = null

  render() {
    const { post } = this.props
    if (!post) {
      return null
    }
    return (
      <>
        <NavbarTop
          title={post.title}
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <WebView
          ref={r => (this.webref = r)}
          source={{
            uri: Config.SHONET_URI + `/${post.post_type}s/` + post.permalink,
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
const mapStateToProps = (state, ownProps) => {
  let post = null
  const postId = ownProps.route.params.postId || null

  if (postId) {
    post = state.post.data[postId] || null
  }
  return {
    post,
  }
}
export default connect(mapStateToProps, null)(PostDetailPage)
