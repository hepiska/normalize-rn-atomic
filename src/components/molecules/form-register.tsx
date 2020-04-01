import React, { useState, useMemo, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button, OutlineButton } from '@components/atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import {
  registerApi,
  setRegisterError,
  setRegisterData,
} from '@modules/register/action'
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

interface FormRegister {
  onChangeModal: any
  onLoginClick: () => void
  setRegisterData: any
  data: any
}

const FormRegister: React.FC<FormRegister> = ({
  onLoginClick,
  onChangeModal,
  setRegisterData,
  data,
}) => {
  const inputSchema = {
    email: {
      required: true,
      pattern: {
        regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address format',
      },
    },
    password: {
      required: true,
      pattern: {
        regEx: /[a-zA-Z0-9]{6,}/,
        message: 'Password must be 6 characters',
      },
    },
    confirmPassword: {
      required: true,
      pattern: {
        condition: (value, { password }) => value === password.value,
        message: 'Passwords don`t match',
      },
    },
  }

  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      onChangeModal('Create new account', true)
      setRegisterData({
        email: state.email.value,
        password: state.password.value,
        confirmPassword: state.confirmPassword.value,
      })
    }
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    inputSchema,
    _onSubmit,
    {
      reduxState: data,
    },
  )

  const [showPassword, setShowPassword] = useState(false)
  const _onShowPassword = () => setShowPassword(prevState => !prevState)

  useEffect(() => {
    return () => {
      setRegisterError(null)
    }
  }, [])

  return useMemo(
    () => (
      <>
        <Div
          justify="flex-start"
          _width="100%"
          _direction="row"
          _margin="0px 0px 32px">
          <Font size="14px" _margin="0px 4px 0px 0px">
            Don’t have an account?
          </Font>
          <PressAbbleDiv onPress={onLoginClick}>
            <Font
              size="14px"
              color={colors.black100}
              weight="bold"
              type="HelveticaNeue">
              Login
            </Font>
          </PressAbbleDiv>
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

        <Div _width="100%" _direction="row" _margin="16px 0px">
          <Div _width="100%" _height="1px" _background={colors.black50} />
          <Font size={14} _margin="0px 16px">
            OR
          </Font>
          <Div _width="100%" _height="1px" _background={colors.black50} />
        </Div>

        <Div _width="100%">
          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="Email"
              value={state.email.value}
              onChangeText={handleOnChange('email')}
              keyboardType="email-address"
              error={state.email.error}
              autoCapitalize="none"
            />
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="Password"
              value={state.password.value}
              onChangeText={handleOnChange('password')}
              secureTextEntry={!showPassword ? true : false}
              autoCapitalize="none"
              error={state.password.error}
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

          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="Confirm Password"
              value={state.confirmPassword.value}
              onChangeText={handleOnChange('confirmPassword')}
              secureTextEntry={true}
              autoCapitalize="none"
              error={state.confirmPassword.error}
            />
          </Div>

          <Button
            title="Register"
            onPress={handleOnSubmit}
            style={styles.btnSubmit}
            fontStyle={styles.btnSubmitText}
          />
        </Div>
      </>
    ),
    [state, showPassword],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerApi,
      setRegisterData,
      setRegisterError,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  data: state.register.data,
})

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister)
