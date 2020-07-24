import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 4,
    backgroundColor: colors.gold,
  },
})

const Baner: React.SFC<any> = ({ isOpen }) => {
  return (
    <View style={styles.container}>
      <Text>baner</Text>
    </View>
  )
}

const mapStateToProps = state => ({ isOpen: state.popupModals.open })

export default connect(mapStateToProps, null)(Baner)
