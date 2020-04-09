import React from 'react'
import { StyleSheet } from 'react-native'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  rightAction: {
    marginLeft: 24,
  },
  leftAction: {
    marginRight: 24,
  },
  fontStyle: {
    fontWeight: '500',
    color: 'white',
  },
  indikator: {
    position: 'absolute',
    height: 16,
    width: 16,
    top: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    right: -6,
  },
})

const NotificationActionButton = props => {
  const _gotoNotification = () => {
    navigate('Notifications', {})
  }
  return (
    <PressAbbleDiv onPress={_gotoNotification} style={styles.rightAction}>
      <Icon name="bell" size={20} color={colors.black100} />
      {props.hasNotification && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['red', 'red']}
          style={styles.indikator}>
          <Font family="HelveticaNeue" size="10px" style={styles.fontStyle}>
            {props.totalCart || 1}
          </Font>
        </LinearGradient>
      )}
    </PressAbbleDiv>
  )
}

export default connect(null, null)(NotificationActionButton)
