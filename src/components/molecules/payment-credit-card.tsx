import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { colors, regex } from '@src/utils/constants'
import TextInputOutline from '@src/components/atoms/field-floating'
import { useFormValidator } from '@src/hooks/use-form-validator'
import { payTransaction } from '@modules/transaction/action'

const PaymentCreditCard = ({ onChangeCreditCard }) => {
  const dispatch = useDispatch()

  const _onSubmit = async ({ isValid, state }) => {
    if (isValid) {
      // notes: dihapus saja kalau gak dipakai
    }
  }

  const onChangeCallback = (disable, state) => {
    onChangeCreditCard(disable, state)
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      card_number: {
        required: true,
        pattern: {
          message: 'Please input correct card number',
          regEx: regex.card_number,
        },
      },
      expired_date: {
        required: true,
        pattern: {
          message: 'Please input correct expired date',
          regEx: regex.expired_date,
        },
      },
      cvv: {
        required: true,
        pattern: {
          message: 'Please input correct CVV',
          regEx: regex.cvv,
        },
      },
    },
    _onSubmit,
    null,
    { onChangeCallback },
  )

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{ width: '100%' }}>
        <View style={{ marginTop: 24, width: '100%' }}>
          <TextInputOutline
            label="Card Number"
            value={state.card_number.value.replace(/(\d{4}(?!\s))/g, '$1 ')}
            onChangeText={handleOnChange('card_number')}
            error={state.card_number.error}
            autoCapitalize="none"
            maxLength={20}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: 22, width: '100%', flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <TextInputOutline
              label="Expired Date"
              value={state.expired_date.value.replace(
                /^(\d{2})(\d{2})/,
                '$1/$2',
              )}
              onChangeText={handleOnChange('expired_date')}
              error={state.expired_date.error}
              autoCapitalize="none"
              maxLength={5}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 0.5, marginLeft: 16 }}>
            <TextInputOutline
              label="CVV"
              value={state.cvv.value}
              onChangeText={handleOnChange('cvv')}
              error={state.cvv.error}
              secureTextEntry
              autoCapitalize="none"
              maxLength={3}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      payTransaction,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(PaymentCreditCard)
