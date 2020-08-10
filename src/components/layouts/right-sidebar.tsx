import React, { useMemo, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { changesRightSideBar } from '@modules/ui-interaction/action'

import { connect, useDispatch } from 'react-redux'
import Modal from 'react-native-modal'
import GlobalCart from '@components/organisms/global-cart'
import { product } from '@src/modules/normalize-schema'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: '90%',
    height: '100%',
  },
  saveArea: { backgroundColor: 'white' },
})

const sidebarSectionMap = {
  'global-cart': <GlobalCart />,
}

const RightSideBar = (props: any) => {
  const dispatch = useDispatch()
  const _closeModal = useCallback(() => {
    dispatch(changesRightSideBar(false))
  }, [])

  return (
    <Modal
      isVisible={props.isOpen}
      style={{ margin: 0 }}
      animationIn="slideInRight"
      // onSwipeComplete={_closeModal}
      // swipeDirection={['right']}
      animationOut="slideOutRight">
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          height: '100%',
          width: '90%',
          backgroundColor: 'white',
        }}>
        {sidebarSectionMap[props.section]}
      </View>
    </Modal>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isOpen: state.uiInteraction.rightSidebar.isOpen,
    section: state.uiInteraction.rightSidebar.section,
  }
}

export default connect(mapStateToProps)(RightSideBar)
