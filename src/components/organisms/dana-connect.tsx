import React, { Component, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontStyle } from '../commont-styles'
import { colors, regex, coneectDanaCalback } from '@src/utils/constants'
import Toast from 'react-native-root-toast'
import { reqPostConnectDana } from '@utils/services'
import { Button } from '../atoms/button'
import TextInputOutline from '@src/components/atoms/field-floating'
import { useFormValidator } from '@src/hooks/use-form-validator'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
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

const DanaConnect = ({ connectPhoneNumber }: any) => {
  const [loading, setLoading] = useState(false)
  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
        setLoading(true)
        reqPostConnectDana({
          ...result,
          redirect_url: coneectDanaCalback,
        })
          .then(res => {
            connectPhoneNumber(res)
            setLoading(false)
          })
          .catch(err => {
            if (err.message.includes('422')) {
              Toast.show('Phone number invalid', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                backgroundColor: colors.red1,
                animation: true,
                hideOnPress: true,
              })
            } else if (err.message.includes('503')) {
              Toast.show('Something goes wrong with DANA', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                backgroundColor: colors.red1,
                animation: true,
                hideOnPress: true,
              })
            }
            setLoading(false)
          })
        Keyboard.dismiss()
      })
    }
  }
  const { state, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      phone_number: {
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
          value={state.phone_number.value}
          onChangeText={handleOnChange('phone_number')}
          error={state.phone_number.error}
        />
      </View>
      <View style={{ paddingBottom: 16 }}>
        <Button
          title="Submit"
          onPress={handleOnSubmit}
          loading={loading}
          style={styles.button}
          fontStyle={styles.buttonText}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default DanaConnect
