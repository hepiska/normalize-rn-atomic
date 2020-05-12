import React, { useState, useImperativeHandle } from 'react'
import { Platform, View } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Div } from './basic'

interface Handles {
  open?: () => void
  close?: () => void
}

interface Props {
  datePickerRef: any
  value: any
  onChange: any
  maximumDate?: any
  minimumDate?: any
}

const withModal = Component => (conditionalRendering, show, onClose) => {
  return conditionalRendering ? (
    <Modal
      isVisible={show}
      backdropColor="rgba(0, 0, 0, 0.32)"
      useNativeDriver={true}
      animationInTiming={500}
      onBackdropPress={onClose}
      animationOutTiming={500}>
      <Component />
    </Modal>
  ) : (
    <Component />
  )
}

const DatePicker: React.FC<Props> = ({
  onChange,
  value,
  datePickerRef,
  maximumDate,
  minimumDate,
}) => {
  const [show, setShow] = useState(false)

  const open = () => setShow(true)
  const close = () => setShow(false)

  const onChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || value
    setShow(Platform.OS === 'ios')
    onChange(currentDate)
  }

  useImperativeHandle(datePickerRef, () => ({
    open,
    close,
  }))

  return (
    <Div _width="100%">
      {show &&
        withModal(() => (
          <DateTimePicker
            style={{ width: '100%', backgroundColor: 'white' }}
            testID="dateTimePicker"
            value={value}
            mode="date"
            display="default"
            onChange={onChangeHandler}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
        ))(Platform.OS === 'ios', show, close)}
    </Div>
  )
}

export default DatePicker
