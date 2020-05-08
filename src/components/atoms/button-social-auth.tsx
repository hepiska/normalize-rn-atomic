import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@src/utils/constants'
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import Config from 'react-native-config'

const facebookGetData = async (fields, callback) => {
  const accessData = await AccessToken.getCurrentAccessToken()
  // Create a graph request asking for user information

  const infoRequest = new GraphRequest(
    '/me',
    {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields,
        },
      },
    },
    function(error, success) {
      callback({ profile: success, tokens: { token: accessData.accessToken } })
    },
  )
  // Execute the graph request created above
  new GraphRequestManager().addRequest(infoRequest).start()
}

const facebookLoginHandler = callback => async () => {
  await LoginManager.logOut()
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    result => {
      if (result.isCancelled) {
        // console.log('Login cancelled')
      } else {
        facebookGetData('id, email, first_name, last_name', callback)
      }
    },
    error => {
      // console.log({ error })
    },
  )
}

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
})
// GoogleSignin.configure()

const googleSignIn = action => async () => {
  let output
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    const tokens = await GoogleSignin.getTokens()
    const { id, givenName, familyName, email } = userInfo.user
    output = {
      profile: {
        id,
        first_name: givenName,
        last_name: familyName,
        email,
      },
      tokens,
    }
    // this.setState({ userInfo })
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      // console.log('canceled')
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
      // console.log('in progress')
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      // console.log('not available')
    } else {
      // some other error happened
      // console.log({ error })
    }
  }
  action(output)
}

const styles = StyleSheet.create({
  fbIcon: {
    width: 11,
    height: 18,
    position: 'absolute',
    left: 12,
  },
  googleIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 12,
  },
  btnSocialMedia: {
    width: '48%',
    height: 46,
    borderColor: colors.black50,
  },
  btnSocialMediaText: {
    color: colors.black80,
    fontSize: 14,
    fontWeight: '500',
  },
})

export const ButtonGoogleSignIn = ({ onSuccess }: any) => {
  return (
    <OutlineButton
      title="Google"
      onPress={googleSignIn(onSuccess)}
      leftIcon={
        <Image
          source={require('../../assets/icons/google-icon-login.png')}
          style={styles.googleIcon}
        />
      }
      style={styles.btnSocialMedia}
      fontStyle={styles.btnSocialMediaText}
    />
  )
}

export const ButtonFacebookSignin = ({ onSuccess }: any) => {
  return (
    <OutlineButton
      title="Facebook"
      onPress={facebookLoginHandler(onSuccess)}
      leftIcon={
        <Image
          source={require('../../assets/icons/facebook-icon-login.png')}
          style={styles.fbIcon}
        />
      }
      style={styles.btnSocialMedia}
      fontStyle={styles.btnSocialMediaText}
    />
  )
}
