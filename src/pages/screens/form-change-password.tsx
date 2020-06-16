import React, { Component, useMemo, useEffect, useState } from 'react'
import { View, Text, Alert, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors, regex } from '@utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputOutline from '@src/components/atoms/field-floating'
import { formStyles } from '@src/components/commont-styles'
import { useFormValidator } from '@src/hooks/use-form-validator'
import { GradientButton } from '@components/atoms/button'
import { fontStyle } from '@src/components/commont-styles'
import { changePassword } from '@modules/user/action'

import { bindActionCreators } from 'redux'
import FormLoader from '@src/components/atoms/loaders/form'

const ChangePassword = props => {
  const [finishAnimation, setFinishAnimation] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
    })
  }, [])

  const _onSubmit = async ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
      })
      result['old_password'] = result['current_password']
      delete result['current_password']
      delete result['confirm_password']

      await props.changePassword(result)
    }
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      current_password: {
        required: true,
      },
      new_password: {
        required: true,
        pattern: {
          message: 'Must be at least 8 characters!',
          regEx: regex.new_password,
        },
      },
      confirm_password: {
        required: true,
        pattern: {
          condition: (value, { new_password }) => value === new_password.value,
          message: 'Passwords don`t match',
        },
      },
    },
    _onSubmit,
  )

  return useMemo(
    () => (
      <>
        <NavbarTop title="Change Password" leftContent={['back']} />
        {finishAnimation ? (
          <>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 16 }}>
                <Text
                  style={{
                    ...fontStyle.helvetica,
                    fontSize: 14,
                    marginTop: 24,
                    marginBottom: 10,
                  }}>
                  Please enter your new password
                </Text>
                <TextInputOutline
                  label="Current Password"
                  style={formStyles.field}
                  value={state.current_password.value}
                  onChangeText={handleOnChange('current_password')}
                  error={state.current_password.error}
                  autoCapitalize="none"
                />
                <TextInputOutline
                  label="New Password"
                  style={formStyles.field}
                  value={state.new_password.value}
                  onChangeText={handleOnChange('new_password')}
                  error={state.new_password.error}
                  autoCapitalize="none"
                />
                <TextInputOutline
                  label="Confirm Password"
                  style={formStyles.field}
                  value={state.confirm_password.value}
                  onChangeText={handleOnChange('confirm_password')}
                  error={state.confirm_password.error}
                  autoCapitalize="none"
                />
              </View>
            </ScrollView>
            <View style={{ padding: 16 }}>
              <GradientButton
                onPress={handleOnSubmit}
                loading={props.loading}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3067E4', '#8131E2']}
                title="Change Password"
                fontStyle={formStyles.buttonText}
                style={formStyles.button}
                disabled={disable}
              />
            </View>
          </>
        ) : (
          <FormLoader style={{ margin: 16 }} />
        )}
      </>
    ),
    [state, props, disable, finishAnimation],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword,
    },
    dispatch,
  )

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
