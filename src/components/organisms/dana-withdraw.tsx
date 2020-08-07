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
import { Image } from '@components/atoms/basic'
import TextInputOutline from '@src/components/atoms/field-floating'
import { useFormValidator } from '@src/hooks/use-form-validator'
import DanaCardProfile from '../molecules/dana-card-profile'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 16,
  },
  wrapImage: {
    paddingHorizontal: 24,
  },
  ammount: {
    flex: 1,
    paddingVertical: 24,
    borderTopColor: colors.black10,
    borderTopWidth: 1,
  },
  textAccent: {
    ...fontStyle.helvetica,
    color: colors.black60,
    marginBottom: 20,
  },

  button: {
    width: '100%',
    backgroundColor: colors.black100,
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
  fee: {
    ...fontStyle.helveticaThin,
    fontSize: 12,
    marginTop: 8,
  },
})

const DanaWithdraw = () => {
  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
      })
      Keyboard.dismiss()
      goToConfirmation()
    }
  }

  const goToConfirmation = () => {
    console.log('its work')

    navigate('Screens', {
      screen: 'DanaConfirmation',
    })
  }

  const { state, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      ammount: { required: true },
    },
    _onSubmit,
  )

  const showNote = false

  return (
    <KeyboardAvoidingView
      style={styles.layout}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <DanaCardProfile />
      <View style={styles.ammount}>
        <Text style={styles.textAccent}>
          Available earnings at The Shonet{' '}
          <Text style={{ color: colors.darkCream }}>IDR 1.764.000</Text>
        </Text>
        <TextInputOutline
          label="Ammount to Withdraw"
          keyboardType="numeric"
          style={styles.field}
          placeholder="IDR"
          floatingLabel={true}
          value={state.ammount.value}
          onChangeText={handleOnChange('ammount')}
          error={state.ammount.error}
        />
        {showNote ? (
          <Text style={styles.fee}>
            *Admin Fee <Text style={fontStyle.helveticaBold}>IDR 1.000</Text>
          </Text>
        ) : null}
      </View>
      <SafeAreaView>
        <Button
          title="Withdraw"
          onPress={handleOnSubmit}
          style={styles.button}
          fontStyle={styles.buttonText}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default DanaWithdraw
