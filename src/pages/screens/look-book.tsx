import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { WebView } from 'react-native-webview'
import { colors } from '@utils/constants'
import {
  removeHeaderWebviewScript,
  clearLocalStorageScript,
  injectTokenScript,
} from '@utils/helpers'
import NavbarTop from '@src/components/molecules/navbar-top'
import { images } from '@utils/constants'
import jwtDecode from 'jwt-decode'

const LookBookDetail = props => {
  const mywebView = useRef(null) as any

  const { id_token, user } = props.auth_data
  const token: { exp: number } = jwtDecode(id_token)

  const expiresAt = JSON.stringify(token.exp * 1000)

  useEffect(() => {
    return () => {
      mywebView.current.injectJavaScript(clearLocalStorageScript())
    }
  }, [])

  return (
    <>
      <NavbarTop title="Lookbook" leftContent={['back']} />
      <WebView
        ref={mywebView}
        sharedCookiesEnabled
        injectedJavaScriptBeforeContentLoaded={injectTokenScript(
          id_token,
          user,
        )}
        onLoadEnd={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          injectTokenScript(id_token, user)
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
