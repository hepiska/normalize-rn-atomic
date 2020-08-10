import React, { useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { goBack } from '@src/root-navigation'
import { changesRightSideBar } from '@modules/ui-interaction/action'
import { connect, useDispatch } from 'react-redux'

import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black50,
    borderBottomWidth: 1,
    position: 'relative',
  },
  title: { ...fontStyle.playfair, fontSize: 24 },
  rightAction: {
    // backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    zIndex: 2,
    height: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
})

const NavbarModal = ({ title }: any) => {
  const dispatch = useDispatch()
  const _close = () => {
    dispatch(changesRightSideBar(false))
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.rightAction}>
        <IconMa name="close" size={32} onPress={_close} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
export default NavbarModal
