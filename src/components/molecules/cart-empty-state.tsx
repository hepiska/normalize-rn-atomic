import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Font, Image } from '@components/atoms/basic'
import {
  helveticaBlackBold,
  helveticaNormalFont,
  fontStyle,
} from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '@src/components/atoms/button'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  image: {
    width: 182,
    height: 117,
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

const CartEmptyState: React.FC = () => {
  const gotoShop = () => {
    navigate('Main', { screen: 'Shop' })
  }
  return (
    <Div _width="100%" _justify="center" align="center">
      <Image
        source={require('../../assets/placeholder/pale-list-is-empty-1.png')}
        style={styles.image}
      />
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            ...fontStyle.helveticaBold,
            fontSize: 16,
            color: colors.black100,
          }}>
          It looks like your shopping cart is empty
        </Text>
      </View>
      <View style={{ marginHorizontal: 32 }}>
        <Text
          style={{
            ...fontStyle.helvetica,
            fontSize: 12,
            color: colors.gray3,
            lineHeight: 17,
            textAlign: 'center',
          }}>
          There’s nothing here for me on this barren road, there’s no one here
          while the city sleeps
        </Text>
      </View>
      <Button
        title="Shop Now"
        onPress={gotoShop}
        style={styles.button}
        fontStyle={styles.buttonText}
      />
    </Div>
  )
}

export default CartEmptyState
