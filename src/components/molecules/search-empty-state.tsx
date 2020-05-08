import React from 'react'
import { StyleSheet } from 'react-native'
import { Div, Font, Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'

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

interface EmptyStateType {
  img: any
  title: string
  description?: string
}

const OrderEmptyState = ({ img, title, description }: EmptyStateType) => {
  return (
    <Div _width="100%" _justify="center" align="center">
      <Image source={img} style={styles.image} />
      <Font
        style={{ ...fontStyle.futuraDemi }}
        colors={colors.black100}
        size={24}
        _margin="0px 0px 16px">
        {title}
      </Font>
      {description && (
        <Font
          size={14}
          textAlign="center"
          color={colors.black80}
          style={{ lineHeight: 17, marginTop: 16, ...fontStyle.helvetica }}
          _margin="0px 32px">
          {description}
        </Font>
      )}
    </Div>
  )
}

export default OrderEmptyState
