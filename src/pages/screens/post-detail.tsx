import React, { useEffect, useRef, useState } from 'react'
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
  const [title, setTitle] = useState('')

  const {
    post,
    url,
    auth_data: { id_token, user },
  } = props
  let uri = ''
  if (post) {
    uri =
      Config.SHONET_URI +
      `/articles/` +
      (post.post_type === 'collection' ? `collection/` : '') +
      post.permalink
  }

  useEffect(() => {
    return () => {
      mywebView.current.injectJavaScript(clearLocalStorageScript())
    }
  }, [])

  if (post || url) {
    return (
      <>
        <NavbarTop
          title={post?.title || title}
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
          onLoadStart={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            setTitle(nativeEvent.title)
          }}
          onLoadEnd={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            setTitle(nativeEvent.title)
            if (!nativeEvent.loading) {
              mywebView.current.injectJavaScript(removeHeaderWebviewScript)
            }
          }}
          source={{
            uri: url ? Config.SHONET_URI + '/' + url : uri,
            headers: {
              Cookie: `tokenId=${id_token}`,
            },
          }}
          originWhitelist={['https://*']}
        />
      </>
    )
  }
  return null
}
const mapStateToProps = (state, ownProps) => {
  let post = null
  const { params } = ownProps.route
  const postId = params.postId || null

  if (params.url) {
    return { url: params.url, auth_data: state.auth.data || {} }
  }
  if (postId) {
    post = state.post.data[postId] || null
  }
  return {
    post,
    auth_data: state.auth.data || {},
  }
}
export default connect(mapStateToProps, null)(PostDetailPage)
