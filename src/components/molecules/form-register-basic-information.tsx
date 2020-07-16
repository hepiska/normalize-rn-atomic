import React, { useRef, useState, useMemo, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from 'react-native-check-box'
import Config from 'react-native-config'
import ReCaptcha, { IProps } from '@components/atoms/recaptcha'
import { Div, Font, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from '@components/atoms/button'
import { fontStyle } from '@components/commont-styles'
import TextInputOutline from '@src/components/atoms/field-floating'
import {
  registerApi,
  setAuthError,
  checkUsernameAvailable,
  _authSelector,
} from '@modules/auth/action'
import { useFormValidator } from '@src/hooks/use-form-validator'
import { useDebounce } from '@src/hooks/use-debounce'
import PickerPopup from '@components/molecules/picker'
import DatePicker from '@components/atoms/datepicker'
import { calculateYear } from '@utils/helpers'

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
  field: {
    height: 46,
  },
  boldText: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  disabled: {
    paddingVertical: 8,
    backgroundColor: colors.black10,
  },
  disabledText: {
    ...fontStyle.helveticaBold,
    color: colors.black80,
    fontSize: 14,
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

interface FormRegisterBasicInformationType {
  navigation: any
  route: any
}

const gender = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
]

const FormRegisterBasicInformation: React.FC<FormRegisterBasicInformationType> = ({
  navigation,
  route,
}) => {
  let pickerRef = null
  let datePickerRef = null
  let recapthcaRef: any = useRef(null)
  let scrollRef = useRef<ScrollView>(null)
  let defaultEmail: string = route.params?.email || ''
  const dispatch = useDispatch()
  const { data, loading, error, called, usernameAvalaible } = useSelector(
    _authSelector,
  )

  const [username, setUsername] = useState('')
  const [recaptcha, setRecaptcha] = useState('')
  const [isEmailDisabeled, setIsEmailDisabeled] = useState(!!defaultEmail)
  const debounceInputTerm = useDebounce(username, 300)
  const [showPassword, setShowPassword] = useState(false)

  const _onShowPassword = () => setShowPassword(prevState => !prevState)

  const _scrollToTop = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
  }

  const _getCapthca = (token: string) => {
    if (!token) {
      recapthcaRef.current.refreshToken()
    } else {
      setRecaptcha(token)
    }
  }

  const _onSubmit = ({ isValid, state }) => {
    recapthcaRef.refreshToken()()
    if (isValid) {
      const {
        email,
        password,
        confirmPassword,
        username,
        firstName,
        lastName,
        dateOfBirth,
        gender,
      } = state
      const params = {
        email: email.value,
        password: password.value,
        repassword: confirmPassword.value,
        username: username.value,
        name: `${firstName.value} ${lastName.value}`,
        date_of_birth: new Date(dateOfBirth.value),
        gender: gender.value,
        recaptcha,
      }
      dispatch(registerApi(params))
    } else {
      if (!recaptcha) {
        recapthcaRef.current.refreshToken()
      }
      _scrollToTop()
    }
  }

  const _onBack = () => {
    navigation.goBack()
  }

  const {
    state,
    handleOnChange,
    handleOnSubmit,
    setFieldError,
  } = useFormValidator(
    {
      email: {
        required: false,
        initialValue: defaultEmail,
        pattern: {
          regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address format',
        },
      },
      password: {
        required: false,
        pattern: {
          regEx: /[a-zA-Z0-9]{6,}/,
          message: 'Password must be 6 characters',
        },
      },
      confirmPassword: {
        required: false,
        pattern: {
          condition: (value, { password }) => value === password.value,
          message: 'Passwords don`t match',
        },
      },
      firstName: { required: true },
      lastName: { required: false },
      gender: { required: false },
      dateOfBirth: { required: false },
      username: { required: false },
      tnc: {
        required: true,
        message: 'Terms of Use and Privacy Policy must be accepted',
      },
    },
    _onSubmit,
  )

  useEffect(() => {
    if (error) {
      _scrollToTop()
    }
  }, [error, loading])

  useEffect(() => {
    if (username.length) {
      setFieldError({
        field: 'username',
        pattern: {
          condition: username.length && !usernameAvalaible,
          message: 'Username already taken!',
        },
      })
    }
  }, [usernameAvalaible])

  useEffect(() => {
    if (data?.user?.id && called) {
      navigation.navigate('Profile')
    }
  }, [called])

  useEffect(() => {
    if (debounceInputTerm) {
      dispatch(checkUsernameAvailable(username))
    }
  }, [debounceInputTerm])

  useEffect(() => {
    if (recapthcaRef) {
      recapthcaRef.current.refreshToken()
    }
    return () => {
      dispatch(setAuthError(null))
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Div _flex={1} _width="100%" _padding="16px">
        {/* <Div
          _width="100%"
          _direction="row"
          justify="space-between"
          _margin="0px 0px 16px">
          <Font
            size="24"
            fontFamily="Futura"
            weight="500"
            color={colors.black100}>
            Create New Account
          </Font>
          <PressAbbleDiv onPress={_onBack}>
            <Icon name="close" size={24} color={colors.black70} />
          </PressAbbleDiv>
        </Div> */}
        <ScrollDiv
          ref={scrollRef}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}>
          <Div _width="100%" _padding="0px 0px 24px">
            {(state.tnc.error || error) && (
              <Div
                align="flex-start"
                borderRadius="5px"
                _width="100%"
                _background="rgba(225, 54, 97, 0.25)"
                _padding="8px"
                _margin="0px 0px -16px">
                <Font size={11} color={colors.redBookmark}>
                  {state.tnc.error || error}
                </Font>
              </Div>
            )}

            <Div _width="100%" _margin="32px 0px 24px">
              <TextInputOutline
                label="Your Email"
                value={state.email.value}
                onChangeText={handleOnChange('email')}
                disabled={isEmailDisabeled}
                style={
                  isEmailDisabeled
                    ? {
                        ...styles.field,
                        backgroundColor: colors.black10,
                        height: 48,
                      }
                    : styles.field
                }
                rightIcon={
                  <TouchableOpacity>
                    <Text style={[styles.boldText, { fontSize: 12 }]}>
                      Change
                    </Text>
                  </TouchableOpacity>
                }
                keyboardType="email-address"
                error={state.email.error}
                autoCapitalize="none"
              />
            </Div>

            <Div _width="100%" _margin="0px 0px 24px">
              <TextInputOutline
                label="First Name"
                style={styles.field}
                value={state.firstName.value}
                onChangeText={handleOnChange('firstName')}
                autoCapitalize="none"
                error={state.firstName.error}
              />
            </Div>

            <Div _width="100%" _margin="0px 0px 24px">
              <TextInputOutline
                label="Last Name"
                style={styles.field}
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
                style={styles.field}
                onChangeText={value => {
                  handleOnChange('username')(value)
                  setUsername(value)
                }}
                autoCapitalize="none"
                error={state.username.error}
              />
            </Div>

            <Div _width="100%" _margin="0px 0px 24px">
              <TextInputOutline
                label="Password"
                value={state.password.value}
                style={styles.field}
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
                style={styles.field}
                onChangeText={handleOnChange('confirmPassword')}
                secureTextEntry={true}
                autoCapitalize="none"
                error={state.confirmPassword.error}
              />
            </Div>

            <Div _width="100%" _margin="0px 0px 24px">
              <PickerPopup
                pickerRef={e => (pickerRef = e)}
                value={null}
                title={'Select a gender'}
                items={gender}
                onValueChange={(value, index, data) => {
                  handleOnChange('gender')(value)
                }}
              />
              <PressAbbleDiv
                style={{ width: '100%' }}
                onPress={() => pickerRef.show()}>
                <TextInputOutline
                  label="Gender"
                  style={styles.field}
                  value={
                    state.gender.value
                      ? gender.find(x => x.value === state.gender.value).label
                      : null
                  }
                  error={state.gender.error}
                  disabled
                  rightIcon={
                    <Icon
                      name={'caret-down'}
                      size={22}
                      color={colors.black80}
                    />
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
                maximumDate={new Date(calculateYear(10))}
              />
              <PressAbbleDiv
                onPress={() => datePickerRef.open()}
                style={{ width: '100%' }}>
                <TextInputOutline
                  label="Date Of Birth"
                  value={state.dateOfBirth.value}
                  style={styles.field}
                  error={state.dateOfBirth.error}
                  disabled
                  rightIcon={
                    <Icon name={'calendar'} size={22} color={colors.black80} />
                  }
                />
              </PressAbbleDiv>
            </Div>

            <Div
              width="100%"
              _direction="row"
              _padding="0px 22px"
              _justify="center"
              align="flex-start">
              <CheckBox
                onClick={() => {
                  handleOnChange('tnc')(!state.tnc.value)
                }}
                isChecked={!!state.tnc.value}
              />
              <Div
                _width="100%"
                _margin="0px 0px 24px 12px"
                _direction="row"
                justify="flex-start"
                style={{
                  flexWrap: 'wrap',
                  widht: '100%',
                }}>
                <Font size={12}>By register you agree to The Shonet </Font>
                <PressAbbleDiv style={{ borderBottomWidth: 1 }}>
                  <Font color={colors.black100}>Terms of Use</Font>
                </PressAbbleDiv>
                <Font> and </Font>
                <PressAbbleDiv style={{ borderBottomWidth: 1 }}>
                  <Font color={colors.black100}>Privacy Policy</Font>
                </PressAbbleDiv>
              </Div>
            </Div>
            <ReCaptcha
              recaptchaRef={e => {}}
              ref={recapthcaRef}
              captchaDomain={Config.SHONET_URI}
              siteKey={Config.SHONET_SITEKEY}
              onReceiveToken={_getCapthca}
            />
            <Button
              title="Register"
              onPress={handleOnSubmit}
              style={styles.btnSubmit}
              fontStyle={styles.btnSubmitText}
            />
          </Div>
        </ScrollDiv>
      </Div>
    </SafeAreaView>
  )
}

export default FormRegisterBasicInformation
