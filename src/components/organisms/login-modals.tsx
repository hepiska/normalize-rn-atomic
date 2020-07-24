import React, { useState, useMemo } from 'react'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { request } from '@utils/services'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import AlertCard from '@components/molecules/alert-card'
import TextInputOutline from '@src/components/atoms/field-floating'
import { navigate } from '@src/root-navigation'
import { setAuthError } from '@modules/auth/action'
import { useFormValidator } from '@src/hooks/use-form-validator'

const styles = StyleSheet.create({
  modalMargin: { margin: 0 },
  modalContent: { padding: 16 },
  text: {
    fontSize: 14,
    marginTop: 16,

    ...fontStyle.helvetica,
    color: colors.black70,
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  fieldContainer: {
    height: 46,
  },
})

const resetPassword = email => {
  return request({ url: '/account/recovery', params: { email } })
}

const LoginModals: React.SFC<any> = ({
  isOpen,
  onClose,
  onChangeSection,
  section,
}) => {
  const [loading, setLoading] = useState(false)
  const _onSubmit = async ({ isValid, state }) => {
    if (isValid) {
      setLoading(true)
      resetPassword(state.email.value)
        .then(res => {
          onChangeSection('send')
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)

          setFieldError(err.message)
        })
    }
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
        initialValue: '',
        pattern: {
          regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address format',
        },
      },
    },
    _onSubmit,
  )

  const optionsData = useMemo(
    () => ({
      nonexist: {
        title: 'Sorry we didn’t recognize that account',
        action: {
          title: 'Register',
          onPress: () => {
            onClose()
            navigate('modals', { screen: 'RegisterModal' })
            setAuthError(null)
          },
        },
        desc: (
          <Text style={styles.text}>
            Would you like to create a new The Shonet account? And continue with
            this email{' '}
            <Text style={{ ...fontStyle.helveticaBold }}>
              usershonet@gmail.com
            </Text>
          </Text>
        ),
      },
      forgotPassword: {
        title: 'Forgot Password?',
        action: {
          title: 'Send',
          loading: loading,
          onPress: () => {
            handleOnSubmit()
          },
        },
        tittleDescComp: (
          <Text
            style={[
              styles.text,
              fontStyle.helveticaBold,
              { marginTop: 0, marginBottom: 0, color: colors.black80 },
            ]}>
            Don’t worry, we got you.
          </Text>
        ),
        descActionComp: (
          <View style={[styles.fieldContainer, { marginBottom: 24 }]}>
            <TextInputOutline
              label="email"
              style={[styles.fieldContainer]}
              value={state.email.value}
              onChangeText={handleOnChange('email')}
              error={state.email.error}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.text,
                {
                  marginTop: 0,
                  color: colors.black100,
                  alignSelf: 'flex-end',
                },
              ]}>
              Back to Login
            </Text>
          </View>
        ),
        desc:
          'Enter the email address associated with your account. We will email you a link to reset your password.',
      },
      send: {
        title: 'Email Send!',
        desc:
          'We’ve sent you email with a link to reset your password. Please click the link when you get it.',
        action: {
          title: 'Back to Login',
          loading: loading,
          onPress: () => {
            onClose()
          },
        },
        afterActionComponent: (
          <View style={[styles.rowContainer, { alignSelf: 'center' }]}>
            <Text style={[styles.text, { marginTop: 4 }]}>
              If you don’t receive the email, just{' '}
            </Text>
            <TouchableOpacity onPress={handleOnSubmit}>
              <Text
                style={[
                  styles.text,
                  {
                    marginTop: 4,
                    ...fontStyle.helveticaBold,
                    color: colors.black100,
                  },
                ]}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        ),
      },
    }),
    [state.email.value, loading],
  )
  const active = optionsData[section]
  return (
    <Modal isVisible={isOpen} style={styles.modalMargin}>
      <View style={styles.modalContent}>
        <AlertCard {...active} onClose={onClose} />
      </View>
    </Modal>
  )
}

const mapStateToProps = state => ({ isOpen: state.popupModals.open })

export default LoginModals
