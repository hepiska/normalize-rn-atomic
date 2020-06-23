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

const CreateCollection = props => {
  const {
    auth_data: { id_token, user },
  } = props

  const mywebView = useRef(null) as any
  useEffect(() => {
    return () => {
      mywebView.current.injectJavaScript(clearLocalStorageScript())
    }
  }, [])
  return (
    <>
      <NavbarTop title="Write Collection" leftContent={['back']} />
      <WebView
        ref={mywebView}
        sharedCookiesEnabled
        injectedJavaScriptForMainFrameOnly={true}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly={true}
        injectedJavaScriptBeforeContentLoaded={injectTokenScript(
          id_token,
          user,
        )}
        onLoadStart={() => {
          mywebView.current.injectJavaScript(injectTokenScript(id_token, user))
          mywebView.current.injectJavaScript(
            `window.location.replace(${Config.SHONET_URI +
              '/write/collection'})`,
          )
        }}
        onLoadEnd={syntheticEvent => {
          const { nativeEvent } = syntheticEvent

          if (!nativeEvent.loading) {
            mywebView.current.injectJavaScript(removeHeaderWebviewScript)
          }
        }}
        source={{
          uri: Config.SHONET_URI + '/write/collection',
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
  return {
    auth_data: state.auth.data || {},
  }
}
export default connect(mapStateToProps, null)(CreateCollection)
