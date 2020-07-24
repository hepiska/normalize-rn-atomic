import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import ModalReferrals from '@components/organisms/modal-referrals'

const styles = StyleSheet.create({
  modalMargin: { margin: 0 },
})

const PopUpModal: React.SFC<any> = ({ isOpen }) => {
  return (
    <Modal isVisible={isOpen} style={styles.modalMargin}>
      <ModalReferrals />
    </Modal>
  )
}

const mapStateToProps = state => ({ isOpen: state.popupModals.open })

export default connect(mapStateToProps, null)(PopUpModal)
