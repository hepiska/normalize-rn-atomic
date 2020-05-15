import React, { ReactElement } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Div, Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import BottomSheet from 'reanimated-bottom-sheet'
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
  snapPoints: Array<number>
  children: ReactElement
  leftAction?: ReactElement
  bottomSheetProps?: any
  title?: string
}

const BottomSheetLay = ({
  leftAction,
  title,
  onClose,
  snapPoints,
  children,
  initialSnap,
  bottomSheetProps,
}: BottomSheetModalType) => {
  return (
    <>
      <BottomSheet
        {...bottomSheetProps}
        onCloseEnd={onClose}
        enabledContentGestureInteraction={false}
        initialSnap={initialSnap}
        renderHeader={() => <Header leftAction={leftAction} title={title} />}
        snapPoints={snapPoints}
        renderContent={() => children}
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <Div bg="rgba(0,0,0,0.7)" _height={height} _width="100%" />
      </TouchableWithoutFeedback>
    </>
  )
}

export default BottomSheetLay
