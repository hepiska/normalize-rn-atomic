import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInputOutline from '@src/components/atoms/field-floating'
import { GradientButton } from '@components/atoms/button'
import { addNewAddress } from '@modules/address/action'
// import CirleLoader from '@src/components/atoms/loaders/circle-loader'
import { Checkbox } from '@components/atoms/checkbox'
import { useFormValidator } from '@src/hooks/use-form-validator'

import { colors, regex } from '@utils/constants'

const styles = StyleSheet.create({
  boldFont: {
    fontFamily: 'Futura',
    fontSize: 18,
    marginVertical: 12,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  loader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  field: { marginVertical: 16, height: 48 },

  bottomSheet: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1.0,
    shadowColor: colors.black50,
    elevation: 4,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.black50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    marginVertical: 16,
    backgroundColor: '#8131E2',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    borderColor: colors.black50,
    borderBottomWidth: 1,
  },
  infoFont: {
    marginTop: 4,
    marginVertical: 12,
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    color: colors.black60,
  },
  smallFont: {
    marginVertical: 12,
    fontFamily: 'Helvetica Neue',
    lineHeight: 14,
    fontSize: 12,
    color: colors.black60,
  },
})

const RecepientData = (props: any) => {
  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
      })
    }
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      label: {
        required: true,
      },
      recipient_name: { required: true },
      email: {
        required: true,
        pattern: {
          message: 'please input correct email',
          regEx: regex.email,
        },
      },
      phone_number: {
        required: true,
        pattern: {
          message: 'please input correct phone number',
          regEx: regex.phoneNumber,
        },
      },
      is_primary: {
        initialValue: false,
        pattern: {
          message: 'please input correct phone number',
          regEx: regex.phoneNumber,
        },
      },
    },
    _onSubmit,
  )

  const { address } = props

  return useMemo(
    () => (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingTop: 8,
        }}>
        <Text style={styles.boldFont}>{address.name}</Text>
        <Text style={styles.smallFont}>{address.formatted_address}</Text>
        <Text style={styles.boldFont}>Address Label</Text>
        <TextInputOutline
          label="Address Label"
          style={styles.field}
          value={state.label.value}
          onChangeText={handleOnChange('label')}
          desc="Example: Office, Apartment, Friends Home"
          error={state.label.error}
          autoCapitalize="none"
        />

        <Text style={{ ...styles.boldFont, marginBottom: 0, marginTop: 16 }}>
          Recepient Information
        </Text>
        <TextInputOutline
          label="Recepient Name"
          style={styles.field}
          value={state.recipient_name.value}
          onChangeText={handleOnChange('recipient_name')}
          error={state.recipient_name.error}
          autoCapitalize="none"
        />
        <TextInputOutline
          label="email"
          style={styles.field}
          value={state.email.value}
          onChangeText={handleOnChange('email')}
          error={state.email.error}
          autoCapitalize="none"
        />
        <TextInputOutline
          label="Phone Number"
          keyboardType="numeric"
          style={styles.field}
          value={state.phone_number.value}
          onChangeText={handleOnChange('phone_number')}
          error={state.phone_number.error}
          autoCapitalize="none"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            marginBottom: 16,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Checkbox
            isChecked={state.is_primary.value}
            onPress={() =>
              handleOnChange('is_primary')(!state.is_primary.value)
            }
          />
          <Text
            style={{ ...styles.smallFont, marginLeft: 8, marginVertical: 0 }}>
            Set as primary address
          </Text>
        </View>

        <GradientButton
          onPress={handleOnSubmit}
          loading={props.loading}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3067E4', '#8131E2']}
          title="Add and Use Address"
          fontStyle={styles.buttonText}
          style={styles.button}
          disabled={disable}
        />
        <View style={{ height: 64 }} />
      </ScrollView>
    ),
    [state],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewAddress }, dispatch)

export default connect(null, mapDispatchToProps)(RecepientData)
