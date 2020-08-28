import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { WebView } from 'react-native-webview'
import { colors } from '@utils/constants'
import NavbarTop from '@src/components/molecules/navbar-top'

const WebViewComponent = props => {
  const mywebView = useRef(null) as any

  console.log('props', props.route.params.uri)
  if (!props.route?.params?.uri) {
    return null
  }

  return (
    <>
      <NavbarTop
        title={
          <Image
            source={require('@src/assets/icons/theshonet-logo-black.png')}
            style={{ height: 20, width: 160 }}
          />
        }
        leftContent={['back']}
      />
      <WebView
        ref={mywebView}
        sharedCookiesEnabled
        source={{
          uri: props.route.params.uri,
        }}
        originWhitelist={['https://*']}
      />
    </>
  )
}

export default WebViewComponent
