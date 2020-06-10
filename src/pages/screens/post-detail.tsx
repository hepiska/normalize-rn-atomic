import React, { useEffect, useRef } from 'react'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@utils/constants'
import {
  removeHeaderWebviewScript,
  clearLocalStorageScript,
  injectTokenScript,
} from '@utils/helpers'

const PostDetailPage = props => {
  const mywebView = useRef(null) as any

  const {
    post,
    auth_data: { id_token, user },
  } = props

  const uri =
    Config.SHONET_URI +
    `/articles/` +
    (post.post_type === 'collection' ? `collection/` : '') +
    post.permalink

  useEffect(() => {
    return () => {
      mywebView.current.injectJavaScript(clearLocalStorageScript())
    }
  }, [])

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
        ref={mywebView}
        sharedCookiesEnabled
        injectedJavaScriptBeforeContentLoaded={injectTokenScript(
          id_token,
          user,
        )}
        onLoadEnd={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          if (!nativeEvent.loading) {
            mywebView.current.injectJavaScript(removeHeaderWebviewScript)
          }
        }}
        source={{
          uri,
          headers: {
            Cookie: `tokenId=${id_token}`,
          },
        }}
        originWhitelist={['https://*']}
      />
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  let post = null
  const postId = ownProps.route.params.postId || null

  if (postId) {
    post = state.post.data[postId] || null
  }
  return {
    post,
    auth_data: state.auth.data || {},
  }
}
export default connect(mapStateToProps, null)(PostDetailPage)
