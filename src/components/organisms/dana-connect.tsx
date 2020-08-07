import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontStyle } from '../commont-styles'
import { colors, regex } from '@src/utils/constants'
import { Button } from '../atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import { useFormValidator } from '@src/hooks/use-form-validator'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    paddingTop: 32,
    flex: 1,
  },
  h1: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
    marginBottom: 4,
    color: colors.black100,
  },
  h2: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black60,
  },
  button: {
    width: '100%',
    backgroundColor: colors.black100,
    marginTop: 32,
    height: 42,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  field: {
    height: 46,
  },
})

const HeaderComponent = () => {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={styles.h1}>Enter Phone Number</Text>
      <Text style={styles.h2}>
        Make sure the phone number you enter is right, because for the further
        you can't change the number
      </Text>
    </View>
  )
}

const DanaConnect = () => {
  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
        Keyboard.dismiss()
      })
    }
  }
  const { state, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      phoneNumber: {
        required: true,
        pattern: {
          message: 'Please input correct phone number',
          regEx: regex.phoneNumber,
        },
      },
    },
    _onSubmit,
  )
  return (
    <KeyboardAvoidingView
      style={styles.layout}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.container}>
        <HeaderComponent />
        <TextInputOutline
          label="Phone Number"
          keyboardType="numeric"
          style={styles.field}
          value={state.phoneNumber.value}
          onChangeText={handleOnChange('phoneNumber')}
          error={state.phoneNumber.error}
        />
      </View>
      <SafeAreaView>
        <Button
          title="Submit"
          onPress={handleOnSubmit}
          style={styles.button}
          fontStyle={styles.buttonText}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default DanaConnect
