import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import { fontStyle } from '@components/commont-styles'
import TextInputOutline from '@src/components/atoms/field-floating'
import { Button, OutlineButton } from '@components/atoms/button'
import { useDispatch, useSelector } from 'react-redux'
import Line from '@components/atoms/line'
import { colors } from '@utils/constants'
import { useFormValidator } from '@src/hooks/use-form-validator'
import {
  ButtonFacebookSignin,
  ButtonGoogleSignIn,
} from '@components/atoms/button-social-auth'
import {
  loginApi,
  setAuthError,
  _authSelector,
  oauthApi,
} from '@modules/auth/action'

const styles = StyleSheet.create({
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 24,
    color: colors.black100,
  },
  text: {
    ...fontStyle.helvetica,
    color: colors.black70,
    fontSize: 14,
  },
  section: {
    marginVertical: 8,
  },
  container: {
    paddingTop: 40,
    flex: 1,
    paddingHorizontal: 16,
  },
  separator: {
    alignItems: 'center',
    marginVertical: 23,
  },
  btnSubmit: {
    width: '100%',
    backgroundColor: colors.black100,
    height: 46,
  },
  btnSubmitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lineText: {
    zIndex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  line: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    zIndex: 0,
  },
})

const inputSchema = {
  email: {
    required: true,
    pattern: {
      regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address format',
    },
  },
}

const LoginRegister = (props: any) => {
  const dispatch = useDispatch()

  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      // onChangeModal('Create new account', true)
      props.navigation.navigate('modals', {
        screen: 'RegisterModal',
        params: { email: state.email.value },
      })
    }
  }
  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    inputSchema,
    _onSubmit,
  )

  const _handleGoogleSignIn = async data => {
    if (data) {
      const oauthPayload = {
        provider: 'google',
        token: data.tokens.idToken,
      }
      await dispatch(oauthApi(oauthPayload))
    }
  }
  const _handleFacebookSignIn = async data => {
    if (data) {
      const oauthPayload = {
        provider: 'facebook',
        token: data.tokens.token,
      }
      await dispatch(oauthApi(oauthPayload))
    }
  }
  return (
    <>
      <NavbarTop
        title={
          <Image
            style={{ width: 130, height: 19 }}
            source={require('@assets/icons/theshonet-logo-black.png')}
          />
        }
      />
      <View style={styles.container}>
        <Text style={[styles.title, styles.section]}>
          Join our community now!!
        </Text>
        <View style={[styles.section, { flexDirection: 'row' }]}>
          <Text style={[styles.text]}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.text,
                {
                  ...fontStyle.helveticaBold,
                  marginHorizontal: 4,
                  color: colors.black100,
                },
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <TextInputOutline
          label="Email"
          style={styles.section}
          value={state.email.value}
          onChangeText={handleOnChange('email')}
          keyboardType="email-address"
          error={state.email.error}
          autoCapitalize="none"
        />
        <Button
          title="Register"
          onPress={handleOnSubmit}
          style={{ ...styles.btnSubmit, marginVertical: 16 }}
          fontStyle={styles.btnSubmitText}
        />
        <View style={{ ...styles.separator }}>
          <Text style={[styles.lineText, styles.text]}>OR</Text>
          <Line style={styles.line} />
        </View>

        <View style={{ flexDirection: 'row', ...styles.section }}>
          <ButtonGoogleSignIn
            style={{ marginRight: 8 }}
            onSuccess={_handleGoogleSignIn}
          />
          <ButtonFacebookSignin
            style={{ marginLeft: 8 }}
            onSuccess={_handleFacebookSignIn}
          />
        </View>
      </View>
    </>
  )
}
export default LoginRegister
