import React, { Component, useState, memo } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet } from 'react-native'
import {
  Div,
  Font,
  TouchableWithoutFeedback,
  PressAbbleDiv,
} from '@components/atoms/basic'
import { helveticaNormalFont } from '@components/commont-styles'

const { width, height } = Dimensions.get('screen')

const FilterBrandOrg = () => {
  return (
    <Div
      _width={width}
      _padding="0px 16px"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Font {...helveticaNormalFont} weight="bold">
        Tilte
      </Font>
    </Div>
  )
}

export default FilterBrandOrg
