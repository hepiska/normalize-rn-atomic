import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { request } from '@utils/services'
import Line from '@components/atoms/line'
import NavbarTop from '@components/molecules/navbar-top'
import { fontStyle, landingPageStyles } from '@components/commont-styles'
import ReferalInputCard from '@components/molecules/referral-input-card'
import { Button, OutlineButton } from '@components/atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import { CommonActions } from '@react-navigation/native'
import CheckBox from 'react-native-check-box'
import { connect, useSelector, useDispatch, batch } from 'react-redux'
import { useFormValidator } from '@src/hooks/use-form-validator'
import { Div, Font, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import { useDebounce } from '@src/hooks/use-debounce'

const claimReferal = data =>
  request({ url: '/account', method: 'PUT', data: data })

import { colors } from '@utils/constants'
import { editUserProfile, getUser } from '@modules/user/action'
import {
  registerApi,
  setAuthError,
  checkUsernameAvailable,
  _authSelector,
} from '@modules/auth/action'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 46,
  },
  text: {
    ...fontStyle.helvetica,
    color: colors.black70,
    fontSize: 14,
  },
  field: {
    height: 46,
  },
  absBottom: {
    left: 0,
    bottom: 0,
    padding: 16,
    position: 'absolute',
  },
  btncontainer: {
    padding: 16,
    backgroundColor: colors.black50,
    borderRadius: 8,
    marginBottom: 24,
  },
  btnSubmit: {
    width: '100%',
    backgroundColor: colors.black100,

    height: 46,
  },
  socialicon: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: 18,
    right: 16,
  },
  dasedLine: {
    borderColor: colors.black50,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  btnSubmitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

const SocialAuthRef = ({
  email,
  provider,
  referral_code,
  navigation,
  detailUser,
  userId,
}) => {
  const [refcode, setRefCode] = useState(referral_code)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const debounceInputTerm = useDebounce(username, 300)

  useEffect(() => {
    dispatch(getUser(userId, 'id'))
  }, [])

  const { data, error, called, usernameAvalaible } = useSelector(_authSelector)

  const _chageRefCode = useCallback(val => {
    setRefCode(data => val)
  }, [])
  const inputSchema = {
    username: { required: false },
    tnc: {
      required: true,
      message: 'Terms of Use and Privacy Policy must be accepted',
    },
  }

  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      // onChangeModal('Create new account', true)
      setLoading(true)
      claimReferal({ referral_code: refcode })
        .then(res => {
          setLoading(false)
          batch(() => {
            dispatch(
              editUserProfile({
                name: detailUser.name,
                username: state.username.value,
              }),
            )
          })
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: 'Main', params: { screen: 'Shop' } }],
            }),
          )
        })
        .catch(err => {
          setLoading(false)
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: 'Main', params: { screen: 'Shop' } }],
            }),
          )
        })
    }
  }

  const {
    state,
    disable,
    handleOnChange,
    handleOnSubmit,
    setFieldError,
  } = useFormValidator(inputSchema, _onSubmit)

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
    if (debounceInputTerm) {
      dispatch(checkUsernameAvailable(username))
    }
  }, [debounceInputTerm])
  return (
    <>
      <NavbarTop title="Registration" leftContent={['back']} />

      <View style={styles.container}>
        <ReferalInputCard value={refcode} onChangeText={_chageRefCode} />
        <View style={[styles.dasedLine, { marginVertical: 32 }]} />
        <View style={[styles.btncontainer]}>
          <Text style={[styles.text]}>{email}</Text>
          <Image
            style={styles.socialicon}
            source={
              provider === 'google'
                ? require('../../assets/icons/google-icon-login.png')
                : require('../../assets/icons/facebook-icon-login.png')
            }
          />
        </View>

        <View style={styles.input}>
          <TextInputOutline
            label="Username"
            // value={state.username.value}
            style={styles.field}
            onChangeText={value => {
              handleOnChange('username')(value)
              setUsername(value)
            }}
            autoCapitalize="none"
            error={state.username.error}
          />
        </View>
        <View style={styles.absBottom}>
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
          <Button
            title="Register"
            loading={loading}
            onPress={handleOnSubmit}
            style={{ ...styles.btnSubmit }}
            fontStyle={styles.btnSubmitText}
          />
        </View>
      </View>
    </>
  )
}

// const memoizeComp = ()

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    detailUser: state.user.data[state.auth.data.user.id],
    referral_code: state.auth.referral_code,
    provider: state.auth.data.provider,
    email: state.auth.data.user.email,
    userId: state.auth.data.user.id,
  }
}
export default connect(mapStateToProps, null)(SocialAuthRef)
