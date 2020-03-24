import React from 'react'
import { StyleSheet } from 'react-native'
import { Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { OutlineButton } from '@components/atoms/button'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 36,
    borderColor: '#EFEFEF',
  },
  buttonText: {
    fontSize: 12,
    color: colors.black80,
    marginLeft: 8,
    fontWeight: 'bold',
  },
})

const AddToCartButton = () => {
  return (
    <Div _flex={1} justify="flex-end" _margin="16px 0px 0px">
      <OutlineButton
        title="Add to Cart"
        onPress={() => {}}
        leftIcon={<Icon name="shopping-bag" size={12} color={colors.black80} />}
        style={styles.button}
        fontStyle={styles.buttonText}
      />
    </Div>
  )
}

export default AddToCartButton
