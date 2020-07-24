import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { fontStyle } from '../commont-styles'
import { useDispatch } from 'react-redux'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { changeOpenPopUp } from '@modules/pop-up-modals/action'
import Gradient from 'react-native-linear-gradient'
import { navigate } from '@src/root-navigation'
import { Button } from '@components/atoms/button'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 32,
    color: colors.white,
    marginTop: 32,
  },
  desc: {
    ...fontStyle.helvetica,
    marginVertical: 16,
    fontSize: 14,
    color: colors.black10,
  },
  image: {
    alignSelf: 'center',
    marginTop: 86,
  },
  container: {
    padding: 16,

    flex: 1,
    backgroundColor: '#000',
  },
  buttontext: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  button: {
    marginTop: 24,
    height: 46,
  },
})

const ModalReferrals = (props: any) => {
  const dispatch = useDispatch()
  const _goToReferal = useCallback(() => {
    dispatch(changeOpenPopUp())
    navigate('Screens', { screen: 'Referrals' })
  }, [])

  const _closeModal = useCallback(() => {
    dispatch(changeOpenPopUp())
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <IconFa
          size={20}
          color={colors.black60}
          name="close"
          onPress={_closeModal}
        />
      </View>
      <View style={styles.image}>
        <Image source={require('@assets/placeholder/ticket-image.png')} />
        <Gradient
          style={StyleSheet.absoluteFill}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        />
      </View>

      <Text style={styles.title}>Get Unlimited Checkout Discount</Text>
      <Text style={styles.desc}>
        Earn coupon checkout shonet commerce for each friends you invited,
        UNLIMITED!!
      </Text>
      <Button
        onPress={_goToReferal}
        style={styles.button}
        fontStyle={styles.buttontext}
        title="GET IT NOW"
      />
    </View>
  )
}
export default ModalReferrals
