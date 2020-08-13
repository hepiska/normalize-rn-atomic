import React, { Component, useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { reqGetDanaAcount } from '@utils/services'
import { StackActions } from '@react-navigation/native'
import { fontStyle } from '../commont-styles'
import { colors, regex, danafee } from '@src/utils/constants'
import { useDispatch, connect } from 'react-redux'
import { Button } from '../atoms/button'
import { Image } from '@components/atoms/basic'
import { getEarningHistory } from '@modules/earnings/action'
import { formatCur } from '@utils/helpers'
import TextInputOutline from '@src/components/atoms/field-floating'
import { useFormValidator } from '@src/hooks/use-form-validator'
import DanaCardProfile from '../molecules/dana-card-profile'

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

const DanaWithdraw = ({ earningSummary, navigation }) => {
  const dispatch = useDispatch()
  const [danaacc, setDanaAcc] = useState(null)
  useEffect(() => {
    reqGetDanaAcount.then(data => {
      setDanaAcc(data)
    })
    dispatch(getEarningHistory({}))
  }, [])
  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result: any = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
      })
      Keyboard.dismiss()
      goToConfirmation(result.ammount)
    }
  }

  const goToConfirmation = amount => {
    navigation.dispatch(
      StackActions.replace('Screens', {
        screen: 'DanaConfirmation',
        params: {
          amount,
        },
      }),
    )
    // replace('Screens', {
    //   screen: 'DanaConfirmation',
    //   params: {
    //     amount,
    //   },
    // })
  }

  const { state, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      ammount: {
        required: true,
        pattern: {
          condition: val => {
            return (
              Number(val) + Number(danafee) <= Number(earningSummary.balance)
            )
          },
          message: 'Withdraw more than balance',
        },
      },
    },
    _onSubmit,
  )

  const showNote = false

  return (
    <KeyboardAvoidingView
      style={styles.layout}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <DanaCardProfile phone_number={danaacc?.phone_number} />
      <View style={styles.ammount}>
        <Text style={styles.textAccent}>
          Available earnings at The Shonet{' '}
          <Text style={{ color: colors.gold100 }}>IDR {formatCur(earningSummary.balance)}</Text>
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
      <View style={{ paddingBottom: 16 }}>
        <Button
          title="Withdraw"
          onPress={handleOnSubmit}
          style={styles.button}
          fontStyle={styles.buttonText}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = state => ({
  earningSummary: state.earnings.summary,
})

export default connect(mapStateToProps)(DanaWithdraw)
