import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Font, Image } from '@components/atoms/basic'
import {
  helveticaBlackBold,
  helveticaNormalFont,
} from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '@src/components/atoms/button'

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
  const navigation = useNavigation()
  return (
    <Div _width="100%" _justify="center" align="center">
      <Image
        source={require('../../assets/placeholder/pale-list-is-empty-1.png')}
        style={styles.image}
      />
      <Font {...helveticaBlackBold} size={16} _margin="0px 0px 16px">
        It looks like your shopping cart is empty
      </Font>
      <Font
        {...helveticaNormalFont}
        size={12}
        textAlign="center"
        _margin="0px 32px">
        There’s nothing here for me on this barren road, there’s no one here
        while the city sleeps
      </Font>
      <Button
        title="Shop Now"
        onPress={() => navigation.navigate('ProductList')}
        style={styles.button}
        fontStyle={styles.buttonText}
      />
    </Div>
  )
}

export default CartEmptyState
