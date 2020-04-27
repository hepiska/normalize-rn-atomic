import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Font, Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '@src/components/atoms/button'

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

const OrderEmptyState: React.FC = () => {
  return (
    <Div _width="100%" _justify="center" align="center">
      <Image
        source={require('../../assets/placeholder/greeting-card-before-login.png')}
        style={styles.image}
      />
      <Font
        style={{ ...fontStyle.futuraBold }}
        colors={colors.black100}
        size={24}
        _margin="0px 0px 16px">
        No Order yet...
      </Font>
      <Font
        size={14}
        textAlign="center"
        color={colors.black80}
        style={{ lineHeight: 17, marginTop: 16, ...fontStyle.helvetica }}
        _margin="0px 32px">
        Let’s find out product you love at shop page
      </Font>
    </Div>
  )
}

export default OrderEmptyState
