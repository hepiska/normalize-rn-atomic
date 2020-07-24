import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Div, Font, Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'

const { height } = Dimensions.get('window')

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
  img?: any
  title: any
  description?: any
  button?: any
  isHideImage?: boolean
}

const OrderEmptyState = ({
  img,
  title,
  description,
  button,
  isHideImage,
}: EmptyStateType) => {
  return (
    <Div
      _width="100%"
      _height={height - 140}
      _flex={1}
      alignItems="center"
      justifyContent="flex-start">
      <Div alignItems="center">
        {!isHideImage && (
          <Image
            source={
              img ||
              require('../../assets/placeholder/greeting-card-before-login.png')
            }
            style={styles.image}
          />
        )}
        {typeof title === 'string' ? (
          <Font
            style={{ ...fontStyle.playfairBold }}
            colors={colors.black100}
            size={24}
            _margin="0px 0px 16px">
            {title}
          </Font>
        ) : (
          title
        )}
        {typeof description === 'string' ? (
          <Font
            size={14}
            textAlign="center"
            color={colors.black80}
            style={{ lineHeight: 17, marginTop: 16, ...fontStyle.helvetica }}
            _margin="0px 32px">
            {description}
          </Font>
        ) : (
          description
        )}
      </Div>
      {button && (
        <View
          style={{
            width: '100%',
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 0,
          }}>
          {button}
        </View>
      )}
    </Div>
  )
}

export default OrderEmptyState
