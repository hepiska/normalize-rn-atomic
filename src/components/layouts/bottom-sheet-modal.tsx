import React, { ReactElement } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Div, Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import BottomSheet from 'reanimated-bottom-sheet'
import Modal from 'react-native-modal'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  bottomSheetHeader: {
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tab: {
    paddingHorizontal: 16,
  },
})

const { height } = Dimensions.get('screen')

const Header = props => {
  const text = props.title
  return (
    <Div
      _background="white"
      _padding="16px 0px 0px"
      style={styles.bottomSheetHeader}>
      <Div
        _width="40px"
        _height="4px"
        _background={colors.black90}
        radius="2"
      />
      <Div
        _direction="row"
        _width="100%"
        _padding="16px 0px"
        justify="space-between">
        {props.leftAction}

        <Div _flex="1">
          <Font
            style={{
              fontSize: 18,
              color: colors.black100,
              fontWeight: 'bold',
              transform: props.leftAction ? [{ translateX: -8 }] : [],
            }}>
            {text}
          </Font>
        </Div>
      </Div>
    </Div>
  )
}

interface BottomSheetModalType {
  initialSnap: number
  onClose: () => void
  isOpen: boolean
  snapPoints: Array<number>
  children: ReactElement
  content?: () => ReactElement
  leftAction?: ReactElement
  bottomSheetProps?: any
  title?: string
}

const BottomSheetModal = ({
  leftAction,
  title,
  onClose,
  snapPoints,
  children,
  isOpen,
  initialSnap,
  bottomSheetProps,
  content,
}: BottomSheetModalType) => {
  return (
    <Modal isVisible={isOpen} style={{ margin: 0, paddingBottom: 100 }}>
      <BottomSheet
        {...bottomSheetProps}
        enabledContentGestureInteraction={false}
        onCloseEnd={onClose}
        initialSnap={initialSnap}
        renderHeader={() => <Header leftAction={leftAction} title={title} />}
        snapPoints={snapPoints}
        renderContent={content ? content : () => children}
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <Div bg="rgba(69,69,69,0.6)" _height={height} _width="100%" />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default BottomSheetModal
