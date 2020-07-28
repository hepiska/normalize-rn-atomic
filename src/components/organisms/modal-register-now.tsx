import React from 'react'
import { fontStyle } from '@components/commont-styles'
import { View, Text, StyleSheet, Image } from 'react-native'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { navigate, dispatch } from '@src/root-navigation'
import { closeModal } from '@modules/pop-up-modals/action'

import { useDispatch } from 'react-redux'
import { Button } from '@components/atoms/button'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  innerContainer: {
    backgroundColor: '#FFF7E7',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    color: colors.black100,
    ...fontStyle.playfairBold,
    fontSize: 24,
  },
  desc: {
    ...fontStyle.helveticaThin,
    fontSize: 12,
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  specialtext: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    zIndex: 0,
    width: 160,
    height: 8,
    backgroundColor: colors.gold,
  },
  btnSubmit: {
    backgroundColor: colors.black100,
    height: 46,
    marginHorizontal: 16,
  },
  btnSubmitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  absImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})

const ModalRegisterNow = () => {
  const dispatch = useDispatch()
  const _closeModal = () => {
    dispatch(closeModal('register-now'))
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <IconMa
          size={14}
          style={styles.close}
          name="close"
          onPress={_closeModal}
        />
        <View style={{ marginLeft: 112, marginVertical: 24 }}>
          <Text style={styles.title}>Register Now and</Text>
          <View>
            <Text style={[styles.title, { zIndex: 1 }]}>Get 10% OFF!!</Text>
            <View style={styles.specialtext} />
          </View>
          <Text style={[styles.desc, { marginVertical: 16 }]}>
            Register Now and Get 10% off discount for your first purchase
          </Text>
          <Button
            title={'Register'}
            onPress={() => {
              _closeModal()
              navigate('Screens', { screen: 'LoginRegister' })
            }}
            style={styles.btnSubmit}
            fontStyle={styles.btnSubmitText}
            loaderColor={colors.white}
          />
        </View>
        <Image
          style={styles.absImage}
          source={require('@assets/placeholder/register-now-image.png')}
        />
      </View>
    </View>
  )
}
export default ModalRegisterNow
