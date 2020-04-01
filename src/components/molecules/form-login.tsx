import React, { useState, useMemo, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { Button, OutlineButton } from '@components/atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import { loginApi, setLoginError } from '@modules/login/action'
import { useFormValidator } from '@components/atoms/use-form-validator'

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
  loginApi: any
  setLoginError: any
  error: any
  onRegisterClick: () => void
}

const FormLogin: React.FC<FormLogin> = ({
  loginApi,
  error,
  onRegisterClick,
  setLoginError,
}) => {
  const inputSchema = {
    username: {
      required: true,
    },
    password: {
      required: true,
      pattern: {
        regEx: /[a-zA-Z0-9]{8,}/,
        message: 'Your password must be at least 8 characters',
      },
    },
  }

  const _onSubmit = async ({ isValid, state }) => {
    if (isValid) {
      await loginApi({
        email: state.username.value,
        password: state.password.value,
      })
    }
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    inputSchema,
    _onSubmit,
  )

  const [showPassword, setShowPassword] = useState(false)
  const onShowPassword = () => setShowPassword(prevState => !prevState)

  useEffect(() => {
    return () => {
      setLoginError(null)
    }
  }, [])

  return useMemo(
    () => (
      <>
        <Div
          justify="flex-start"
          _width="100%"
          _direction="row"
          _margin="0px 0px 24px">
          <Font size="14px" _margin="0px 4px 0px 0px">
            Don’t have an account?
          </Font>
          <PressAbbleDiv onPress={onRegisterClick}>
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
                <PressAbbleDiv onPress={onShowPassword}>
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
            <PressAbbleDiv onPress={null}>
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
          />

          <Div _width="100%" _direction="row" _margin="16px 0px">
            <Div _width="100%" _height="1px" _background={colors.black50} />
            <Font size={14} _margin="0px 16px">
              OR
            </Font>
            <Div _width="100%" _height="1px" _background={colors.black50} />
          </Div>

          <Div _width="100%" _direction="row" justify="space-between">
            <OutlineButton
              title="Google"
              onPress={null}
              leftIcon={
                <Image
                  source={require('../../assets/icons/google-icon.png')}
                  style={styles.googleIcon}
                />
              }
              style={styles.btnSocialMedia}
              fontStyle={styles.btnSocialMediaText}
            />
            <OutlineButton
              title="Facebook"
              onPress={null}
              leftIcon={
                <Image
                  source={require('../../assets/icons/facebook-icon.png')}
                  style={styles.fbIcon}
                />
              }
              style={styles.btnSocialMedia}
              fontStyle={styles.btnSocialMediaText}
            />
          </Div>
        </Div>
      </>
    ),
    [state, error, showPassword],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginApi,
      setLoginError,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  data: state.login.data,
  loading: state.login.loading,
  error: state.login.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)
