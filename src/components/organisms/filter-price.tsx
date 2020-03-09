import React, { Component, useState, memo } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font } from '@components/atoms/basic'
import { helveticaNormalFont } from '@components/commont-styles'
import Field from '@components/atoms/field'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'
import Slider from '@components/atoms/slider-2-pin'

const { width } = Dimensions.get('screen')

const useBrandFilter = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const _onChangeAlvabet = e => {
    setFilter(e)
  }
  const _onSearchChange = e => {
    setSearch(e)
  }
  return [
    { search, filter },
    { _onSearchChange, _onChangeAlvabet },
  ]
}

const FilterPriceOrg = ({ changeValueUiIneraction }: any) => {
  const [
    { search, filter },
    { _onChangeAlvabet, _onSearchChange },
  ] = useBrandFilter()
  const parentScrollDisabled = value => {
    changeValueUiIneraction({ key: 'isScrollEnabled', value: value })
  }
  const onSliderLeftMove = sliderPos => {
    console.log('left===, ', sliderPos)
  }
  const onSliderRightMove = sliderPos => {
    console.log('rihy===, ', sliderPos)
  }
  return (
    <Div
      _width={width}
      padd="0px 16px"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Slider
        changeParentScroll={parentScrollDisabled}
        numberOfPartisions={15}
        onMoveLeft={onSliderLeftMove}
        onMoveRight={onSliderRightMove}
      />
    </Div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeValueUiIneraction,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(FilterPriceOrg)
