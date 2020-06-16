import React, { Component, useRef, useEffect } from 'react'
import { Alert } from 'react-native'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { urlScreenMap } from '@utils/helpers'

import NavbarTop from '@src/components/molecules/navbar-top'
import { colors, nestedScreenMap } from '@utils/constants'
import {
  removeHeaderWebviewScript,
  clearLocalStorageScript,
  injectTokenScript,
} from '@utils/helpers'

const run = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
  var mainWrapper = document.getElementsByClassName("main-wrapper");
  mainWrapper[0].style.paddingTop = "0px";
  true
})()`

const UserDetail = props => {
  const mywebView = useRef(null)
  useEffect(() => {
    return () => {
      mywebView.current.injectJavaScript(clearLocalStorageScript())
    }
  }, [])

  const _navChange = navState => {
    if (!navState.url.includes('?initial=true')) {
      const urlArr = urlScreenMap(navState.url)

      const params: any = {}
      if (urlArr[0] === 'users' || urlArr[0] === 'insiders') {
        params.username = urlArr[1]
      } else if (urlArr[0] === 'posts' || urlArr[0] === 'articles') {
        params.url = urlArr.join('/')
      }
      const screen = nestedScreenMap(urlArr[0], params)
      props.navigation.push(screen.screen, screen.params)
    }
  }

  const {
    username,
    auth_data: { id_token, user },
  } = props
  if (!username) {
    return null
  }
  return (
    <>
      <NavbarTop title={username} leftContent={['back']} />
      <WebView
        ref={mywebView}
        sharedCookiesEnabled
        injectedJavaScriptBeforeContentLoaded={injectTokenScript(
          id_token,
          user,
        )}
        source={{
          uri: Config.SHONET_URI + '/users/' + username + '?initial=true',
          headers: {
            Cookie: `tokenId=${id_token}`,
          },
        }}
        onNavigationStateChange={_navChange}
        onLoadEnd={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          if (!nativeEvent.loading) {
            mywebView.current.injectJavaScript(removeHeaderWebviewScript)
          }
        }}
        originWhitelist={['https://*']}
      />
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.route.params.userId || null
  let username = null
  if (userId) {
    username = state.user.data[userId]?.username
  }
  if (ownProps.route.params.username) {
    username = ownProps.route.params.username
  }

  return {
    username,
    auth_data: state.auth.data || {},
  }
}
export default connect(mapStateToProps, null)(UserDetail)
