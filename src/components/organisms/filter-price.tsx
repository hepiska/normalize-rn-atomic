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
import { changePrice } from '@modules/product-filter/action'

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

const PriceComponent = ({ label, curency = 'Rp', value }: any) => {
  return (
    <Div _flex="1" align="flex-start">
      <Font>{label}</Font>
      <Div _direction="row">
        <Div
          _border={`1px solid ${colors.black90}`}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          radius="8px"
          padd="8px 16px">
          <Font>{curency}</Font>
        </Div>
        <Div
          _border={`1px solid ${colors.black90}`}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            transform: [{ translateX: -1 }],
          }}
          radius="8px"
          padd="8px 16px">
          <Font>{value}</Font>
        </Div>
      </Div>
    </Div>
  )
}

let timer = null

const FilterPriceOrg = ({
  changeValueUiIneraction,
  min,
  max,
  changePrice,
}: any) => {
  // const [
  //   { search, filter },
  //   { _onChangeAlvabet, _onSearchChange },
  // ] = useBrandFilter()
  const parentScrollDisabled = value => {
    changeValueUiIneraction({ key: 'isScrollEnabled', value: value })
  }
  const onSliderLeftMove = sliderPos => {
    console.log('sliderPos', sliderPos)

    changePrice({ type: 'min', value: sliderPos.value * 10000000 })
  }
  const onSliderRightMove = sliderPos => {
    console.log('sliderPos', sliderPos)
    changePrice({ type: 'max', value: sliderPos.value * 10000000 })
  }
  console.log('price.max', min, max)
  return (
    <Div
      _width={width}
      padd="0px 16px"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Div _direction="row">
        <PriceComponent label="Minimum Price " value={min} />
        <PriceComponent label="Maximum Price " value={max} />
      </Div>
      <Slider
        changeParentScroll={parentScrollDisabled}
        numberOfPartisions={10}
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
      changePrice,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  min: state.productFilter.selected.price.min,
  max: state.productFilter.selected.price.max,
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPriceOrg)
