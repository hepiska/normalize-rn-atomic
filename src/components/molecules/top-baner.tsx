import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { useSelector } from 'react-redux'
import { navigate } from '@src/root-navigation'
import { fontStyle } from '@components/commont-styles'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#FFF7E7',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: colors.black100,
    ...fontStyle.helveticaBold,
  },
  specialtext: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 0,
    height: 8,
    backgroundColor: colors.gold,
  },
  close: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
})

const TopBaner = (props: any) => {
  const { isAuth } = useSelector(state => {
    return { isAuth: state.auth.isAuth }
  })
  const [isOpen, setisOpen] = useState(true)
  const _goToReferal = useCallback(() => {
    navigate('Screens', { screen: 'Referrals' })
  }, [])
  if (!isOpen || !isAuth) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Invite Your Friend and</Text>
      <View style={{ marginHorizontal: 6 }}>
        <Text style={[styles.text, { zIndex: 1 }]}>Get 10%</Text>
        <View style={styles.specialtext} />
      </View>
      <Text style={[styles.text, { zIndex: 1 }]}>OFF. </Text>

      <TouchableOpacity onPress={_goToReferal}>
        <Text
          style={[styles.text, { zIndex: 1, textDecorationLine: 'underline' }]}>
          Invite Now
        </Text>
      </TouchableOpacity>
      <IconFa
        onPress={() => setisOpen(false)}
        name="close"
        size={12}
        style={[styles.close]}
      />
    </View>
  )
}
export default TopBaner
