import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import ModalReferrals from '@components/organisms/modal-referrals'
import dayjs from 'dayjs'
import ModalRegisterNow from '@components/organisms/modal-register-now'

const styles = StyleSheet.create({
  modalMargin: { margin: 0 },
})

const modalTypeComponentMap = {
  referrals: <ModalReferrals />,
  'register-now': <ModalRegisterNow />,
}

const PopUpModal: React.SFC<any> = ({ isOpen, data }) => {
  if (!data) {
    return null
  }
  return (
    <Modal isVisible={isOpen} style={styles.modalMargin}>
      {modalTypeComponentMap[data.id]}
    </Modal>
  )
}

const mapStateToProps = state => {
  const activeModal = state.popupModals.data.filter(_data => {
    let closeDuration = null
    let currentDate = dayjs()

    if (_data.lastClose) {
      let lastClose = dayjs(_data.lastClose)
      closeDuration = currentDate.diff(lastClose, 'day')
    }

    if (_data.interval === 'once' && _data.lastClose) {
      return false
    }

    if (
      _data.interval === 'daily' &&
      closeDuration !== null &&
      closeDuration < 1
    ) {
      return false
    }

    if (_data.openAuth) {
      return state.auth.isAuth
    }
    if (_data.openunAuth) {
      return !state.auth.isAuth
    }

    return true
  })
  return { isOpen: activeModal.length, data: activeModal[0] }
}

export default connect(mapStateToProps, null)(PopUpModal)
