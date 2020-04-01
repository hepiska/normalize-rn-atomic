import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from '@components/atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import {
  registerApi,
  setRegisterError,
  setRegisterData,
} from '@modules/register/action'
import { checkUsernameAvailable } from '@modules/user/action'
import { useFormValidator } from '@components/atoms/use-form-validator'
import { useDebounce } from '@components/atoms/use-debounce'
import PickerPopup from '@components/molecules/picker'
import DatePicker from '@components/atoms/datepicker'

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

interface FormRegisterBasicInformation {
  registerApi: any
  setRegisterData: any
  checkUsernameAvailable: any
  usernameAvalaible: boolean
  data: any
  loading: boolean
  error: any
}

const FormRegisterBasicInformation = ({
  registerApi,
  checkUsernameAvailable,
  usernameAvalaible,
  data,
  error,
  loading,
}) => {
  let pickerRef = null
  let datePickerRef = null
  let scrollRef = useRef<ScrollView>(null)

  const inputSchema = {
    email: { required: true },
    firstName: { required: true },
    lastName: { required: true },
    gender: { required: true },
    dateOfBirth: { required: true },
    username: { required: true },
  }

  const [username, setUsername] = useState('')
  const debounceInputTerm = useDebounce(username, 300)

  const [showPassword, setShowPassword] = useState(false)
  const _onShowPassword = () => setShowPassword(prevState => !prevState)

  const scrollToTop = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
  }

  const _onSubmit = useCallback(
    ({ isValid, state }) => {
      if (isValid) {
        const {
          email,
          username,
          firstName,
          lastName,
          dateOfBirth,
          gender,
        } = state
        const { password, confirmPassword } = data
        const params = {
          email: email.value,
          password,
          repassword: confirmPassword,
          username: username.value,
          name: `${firstName.value} ${lastName.value}`,
          date_of_birth: new Date(dateOfBirth.value),
          gender: gender.value,
        }
        registerApi(params)
      }
    },
    [data],
  )

  const {
    state,
    handleOnChange,
    handleOnSubmit,
    setFieldError,
  } = useFormValidator(inputSchema, _onSubmit, {
    reduxState: data,
  })

  useEffect(() => {
    if (error) {
      scrollToTop()
    }
  }, [error, loading])

  useEffect(() => {
    if (username.length && !usernameAvalaible) {
      setFieldError({
        field: 'username',
        message: 'Username already taken!',
      })
    }
  }, [usernameAvalaible])

  useEffect(() => {
    if (debounceInputTerm) {
      checkUsernameAvailable(username)
    }
  }, [debounceInputTerm])

  useEffect(() => {
    return () => {
      setRegisterError(null)
    }
  }, [])

  return useMemo(
    () => (
      <ScrollDiv
        ref={scrollRef}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}>
        <Div _width="100%" _padding="0px 0px 24px">
          {error && (
            <Div
              align="flex-start"
              borderRadius="5px"
              _width="100%"
              _background="rgba(225, 54, 97, 0.25)"
              _padding="8px"
              _margin="0px 0px -24px">
              <Font size={11} color={colors.redBookmark}>
                {error}
              </Font>
            </Div>
          )}

          <Div _width="100%" _margin="32px 0px 24px">
            <TextInputOutline
              label="Your Email"
              value={state.email.value}
              onChangeText={handleOnChange('email')}
              keyboardType="email-address"
              error={state.email.error}
              autoCapitalize="none"
              disabled
              rightIcon={
                <PressAbbleDiv onPress={_onShowPassword}>
                  <Font
                    size={14}
                    color={colors.black100}
                    weight="bold"
                    type="HelveticaNeue">
                    Change
                  </Font>
                </PressAbbleDiv>
              }
            />
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="First Name"
              value={state.firstName.value}
              onChangeText={handleOnChange('firstName')}
              autoCapitalize="none"
              error={state.firstName.error}
            />
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="Last Name"
              value={state.lastName.value}
              onChangeText={handleOnChange('lastName')}
              autoCapitalize="none"
              error={state.lastName.error}
            />
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <TextInputOutline
              label="Username"
              value={state.username.value}
              onChangeText={value => {
                handleOnChange('username')(value)
                setUsername(value)
              }}
              autoCapitalize="none"
              error={state.username.error}
            />
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <PickerPopup
              pickerRef={e => (pickerRef = e)}
              value={null}
              title={'Select a gender'}
              items={[
                { label: 'Male', value: 'm' },
                { label: 'Female', value: 'f' },
              ]}
              onValueChange={(value, index, data) => {
                handleOnChange('gender')(data.label)
              }}
            />
            <PressAbbleDiv
              style={{ width: '100%' }}
              onPress={() => pickerRef.show()}>
              <TextInputOutline
                label="Gender"
                value={state.gender.value}
                error={state.gender.error}
                disabled
                rightIcon={
                  <Icon name={'caret-down'} size={22} color={colors.black80} />
                }
              />
            </PressAbbleDiv>
          </Div>

          <Div _width="100%" _margin="0px 0px 24px">
            <DatePicker
              datePickerRef={e => (datePickerRef = e)}
              value={
                state.dateOfBirth.value
                  ? new Date(state.dateOfBirth.value)
                  : new Date()
              }
              onChange={date =>
                handleOnChange('dateOfBirth')(date.toLocaleDateString())
              }
            />
            <PressAbbleDiv
              onPress={() => datePickerRef.open()}
              style={{ width: '100%' }}>
              <TextInputOutline
                label="Date Of Birth"
                value={state.dateOfBirth.value}
                error={state.dateOfBirth.error}
                disabled
                rightIcon={
                  <Icon name={'calendar'} size={22} color={colors.black80} />
                }
              />
            </PressAbbleDiv>
          </Div>

          <Div _width="100%" _margin="0px 0px 24px" _direction="row">
            <Font size={12}>By register you agree to The Shonet </Font>
            <PressAbbleDiv style={{ borderBottomWidth: 1 }}>
              <Font color={colors.black100}>Terms of Use</Font>
            </PressAbbleDiv>
            <Font> and </Font>
            <PressAbbleDiv style={{ borderBottomWidth: 1 }}>
              <Font color={colors.black100}>Privacy Policy</Font>
            </PressAbbleDiv>
          </Div>

          <Button
            title="Register"
            onPress={handleOnSubmit}
            style={styles.btnSubmit}
            fontStyle={styles.btnSubmitText}
          />
        </Div>
      </ScrollDiv>
    ),
    [state, showPassword, error],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerApi,
      setRegisterData,
      setRegisterError,
      checkUsernameAvailable,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  loading: state.register.loading,
  data: state.register.data,
  error: state.register.error,
  usernameAvalaible: state.user.usernameAvalaible,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormRegisterBasicInformation)
