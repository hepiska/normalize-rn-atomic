import React, { Component, useState, memo } from 'react'
import { Dimensions, FlatList, Modal } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import styled from 'styled-components/native'
import { Button, OutlineButton } from '@components/atoms/button'
import BottomSheet from 'reanimated-bottom-sheet'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { changeValue } from '@modules/product-filter/action'

const { height } = Dimensions.get('screen')

const FilterContent = () => {
  console.log('===')
  return (
    <Div _width="100%" _background="white" _height="100%">
      <Font>sasa</Font>
    </Div>
  )
}

const Header = () => {
  return (
    <Div _height="40px" radius="20 0 0 20" _background="white">
      <Div
        _width="40px"
        _height="4px"
        _background={colors.black90}
        radius="2"
      />
    </Div>
  )
}

const FilterBottomSheet = props => {
  const { isOpen } = props
  return (
    <Modal transparent visible={isOpen}>
      <BottomSheet
        onCloseEnd={() => props.changeValue({ key: 'isOpen', value: false })}
        initialSnap={0}
        renderHeader={Header}
        snapPoints={[450, 300, 0]}
        renderContent={FilterContent}
      />
      <TouchableWithoutFeedback
        onPress={() => props.changeValue({ key: 'isOpen', value: false })}>
        <Div bg="rgba(0,0,0,0.7)" _height={height} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const mapStateToProps = (state: any) => ({ ...state.productFilter })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeValue,
    },
    dispatch,
  )

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(FilterBottomSheet),
)
