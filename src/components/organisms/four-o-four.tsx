import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  BigFont: {
    fontSize: 68,
    marginVertical: 8,
    fontFamily: 'FuturaDemi',
  },
  largeFont: {
    marginVertical: 8,

    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
  smallFont: {
    fontSize: 14,
    marginVertical: 8,
    fontFamily: 'Helvetica Neue',
  },
  action: {
    marginVertical: 8,
    fontFamily: 'Helvetica Neue',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 14,
  },
})

const ErrorOrg = ({ onBack }: { onBack?: () => void }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.BigFont}>4</Text>
        <Text style={{ ...styles.BigFont, color: colors.black70 }}>0</Text>
        <Text style={styles.BigFont}>4</Text>
      </View>
      <Text style={styles.largeFont}>Oops, something went wrong...</Text>

      <Text style={styles.smallFont}>
        The page you are looking for is not here
      </Text>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.action}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ErrorOrg
