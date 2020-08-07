import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '@src/components/atoms/button'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 32,
    marginBottom: 32,
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
})

const EarningsEmptyState: React.FC = () => {
  const goToEarn = () => {
    navigate('Main', { screen: 'Shop' })
  }
  return (
    <Div _width="100%" _justify="center" _padding="16px" align="center">
      <Image
        source={require('../../assets/placeholder/no-earnings.png')}
        style={styles.image}
      />
      <Text
        style={[
          fontStyle.helveticaThin,
          { fontSize: 12, textAlign: 'center', width: '70%' },
        ]}>
        No earnings yet, let’s get share some product or collection to get
        earnings
      </Text>
      <Button
        title="Start Earning Now"
        onPress={goToEarn}
        style={styles.button}
        fontStyle={styles.buttonText}
      />
    </Div>
  )
}

export default EarningsEmptyState
