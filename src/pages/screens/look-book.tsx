import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { WebView } from 'react-native-webview'
import { colors } from '@utils/constants'
import jwtDecode from 'jwt-decode'
import { removeHeaderWebviewScript } from '@utils/helpers'
import NavbarTop from '@src/components/molecules/navbar-top'
import { images } from '@utils/constants'

const injectToken = (token, user, expiresAt) => `
  (function(){
    document.cookie="tokenId=${token}"
    localStorage.setItem("tokenId", "${token}")
    localStorage.setItem("user", JSON.stringify(${user}))
    localStorage.setItem("expiresAt", "${expiresAt}")

    window.ReactNativeWebView.postMessage(JSON.stringify(localStorage.getItem("user")))

  })();
  true;
`

const LookBookDetail = props => {
  const mywebView = useRef(null) as any

  const { id_token, user } = props.auth_data
  const token: { exp: number } = jwtDecode(id_token)
  const expiresAt = JSON.stringify(token.exp * 1000)
  // console.log(`"${JSON.stringify(user)}"`)
  return (
    <>
      <NavbarTop
        title="Lookbook"
        leftContent={['back']}
        style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
      />
      <WebView
        ref={mywebView}
        sharedCookiesEnabled
        injectedJavaScript={injectToken(
          id_token,
          JSON.stringify(user),
          expiresAt,
        )}
        // injectedJavaScriptBeforeContentLoaded={injectToken(id_token, user)}
        onLoadEnd={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          if (!nativeEvent.loading) {
            mywebView.current.injectJavaScript(removeHeaderWebviewScript)
          }
        }}
        source={{
          uri: 'https://shonet.dev/lookbook/december-2019',
          headers: {
            Cookie: `tokenId=${id_token}`,
          },
        }}
        originWhitelist={['https://*']}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth_data: state.auth.data || {},
  }
}

export default connect(mapStateToProps, null)(LookBookDetail)
