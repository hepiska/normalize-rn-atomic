import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { Button } from '@components/atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import {
  loginApi,
  setAuthError,
  _authSelector,
  oauthApi,
} from '@modules/auth/action'
import { useFormValidator } from '@src/hooks/use-form-validator'
import {
  ButtonFacebookSignin,
  ButtonGoogleSignIn,
} from '@components/atoms/button-social-auth'

const styles = StyleSheet.create({
  width100: {
    width: '100%',
  },
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
})

interface FormLogin {
  navigation: any
  loading: boolean
  onForgotPassword: () => void
}

const FormLogin: React.FC<FormLogin> = ({ navigation, onForgotPassword }) => {
  const dispatch = useDispatch()
  const { data, error, called, loading } = useSelector(_authSelector)

  const [showPassword, setShowPassword] = useState(false)

  const _onShowPassword = useCallback(
    () => setShowPassword(prevState => !prevState),
    [showPassword],
  )

  const _onSubmit = async ({ isValid, state }) => {
    if (isValid) {
      await dispatch(
        loginApi({
          email: state.username.value,
          password: state.password.value,
        }),
      )
    }
  }

  const _onRegisterClick = () => {
    navigation.navigate('modals', {
      screen: 'Register',
    })
  }

  const _onBack = () => {
    navigation.goBack()
  }

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

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      username: { required: true },
      password: { required: true },
    },
    _onSubmit,
  )

  useEffect(() => {
    if (data?.id_token && called && !error) {
      navigation.goBack()
    }
  }, [called])

  useEffect(() => {
    return () => {
      dispatch(setAuthError(null))
    }
  }, [])

  return useMemo(
    () => (
      <Div _flex={1} _width="100%" _padding="16px" bg="rgba(255,255,255, 0.5)">
        <Div
          _background="white"
          _margin="16px"
          _padding="16px"
          radius="4px"
          _width="100%">
          <Div
            _width="100%"
            _direction="row"
            justify="space-between"
            _margin="0px 0px 16px">
            <Font
              size="24"
              fontFamily="Futura"
              weight="500"
              color={colors.black100}>
              Login
            </Font>
            {/* <PressAbbleDiv onPress={_onBack}>
              <Icon name="close" size={24} color={colors.black70} />
            </PressAbbleDiv> */}
          </Div>
          <Div
            justify="flex-start"
            _width="100%"
            _direction="row"
            _margin="0px 0px 24px">
            <Font size="14px" _margin="0px 4px 0px 0px">
              Don???t have an account?
            </Font>
            <PressAbbleDiv onPress={_onRegisterClick}>
              <Font
                size="14px"
                color={colors.black100}
                weight="bold"
                type="HelveticaNeue">
                Register
              </Font>
            </PressAbbleDiv>
          </Div>

          <Div _width="100%">
            {error && (
              <Div
                align="flex-start"
                borderRadius="5px"
                _width="100%"
                _background="rgba(225, 54, 97, 0.25)"
                _padding="8px"
                _margin="0px 0px 24px">
                <Font size={11} color={colors.redBookmark}>
                  {error}
                </Font>
              </Div>
            )}

            <Div _width="100%" _margin="0px 0px 24px">
              <TextInputOutline
                label="Username"
                value={state.username.value}
                onChangeText={handleOnChange('username')}
                error={state.username.error}
                autoCapitalize="none"
              />
            </Div>

            <Div _width="100%" _margin="0px 0px 8px">
              <TextInputOutline
                key="pass"
                label="Password"
                value={state.password.value}
                onChangeText={handleOnChange('password')}
                secureTextEntry={!showPassword ? true : false}
                error={state.password.error}
                autoCapitalize="none"
                rightIcon={
                  <PressAbbleDiv onPress={_onShowPassword}>
                    <Icon
                      name={showPassword ? 'eye' : 'eye-slash'}
                      size={22}
                      color={colors.black80}
                    />
                  </PressAbbleDiv>
                }
              />
            </Div>

            <Div _width="100%" align="flex-end" _margin="0px 0px 24px">
              <PressAbbleDiv onPress={onForgotPassword}>
                <Font size="14px" color={colors.black100}>
                  Forgot Password?
                </Font>
              </PressAbbleDiv>
            </Div>

            <Button
              title="Login"
              onPress={handleOnSubmit}
              style={styles.btnSubmit}
              fontStyle={styles.btnSubmitText}
              loading={loading}
              loaderColor={colors.white}
            />

            <Div _width="100%" _direction="row" _margin="16px 0px">
              <Div _width="100%" _height="1px" _background={colors.black50} />
              <Font size={14} _margin="0px 16px">
                OR
              </Font>
              <Div _width="100%" _height="1px" _background={colors.black50} />
            </Div>

            <Div _width="100%" _direction="row" justify="space-between">
              <ButtonGoogleSignIn onSuccess={_handleGoogleSignIn} />
              <ButtonFacebookSignin onSuccess={_handleFacebookSignIn} />
            </Div>
          </Div>
        </Div>
      </Div>
    ),
    [state, error, showPassword, loading],
  )
}

export default withNavigation(FormLogin)
