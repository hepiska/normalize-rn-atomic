import React, { Component, useState, memo, useEffect } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font } from '@components/atoms/basic'
import { helveticaNormalFont } from '@components/commont-styles'
import Field from '@components/atoms/field'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'
import {
  setSelectedPrice,
  fetchCountProduct,
} from '@modules/product-filter/action'

import Slider from '@components/atoms/slider-2-pin'

const { width } = Dimensions.get('screen')

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
  maximum_price,
  minimum_price,
  setSelectedPrice,
  colectionPrices,
  fetchCountProduct,
}: any) => {
  // const [
  //   { search, filter },
  //   { _onChangeAlvabet, _onSearchChange },
  // ] = useBrandFilter()

  useEffect(() => {
    fetchCountProduct({ maximum_price, minimum_price })
  }, [maximum_price, minimum_price])
  const delta = colectionPrices.maximum_price - colectionPrices.minimum_price
  const parentScrollDisabled = value => {
    changeValueUiIneraction({ key: 'isScrollEnabled', value: value })
  }
  const onSliderLeftMove = sliderPos => {
    setSelectedPrice({
      type: 'minimum_price',
      value: colectionPrices.minimum_price + sliderPos.value * delta,
    })
  }
  const onSliderRightMove = sliderPos => {
    setSelectedPrice({
      type: 'maximum_price',
      value: colectionPrices.minimum_price + sliderPos.value * delta,
    })
  }
  return (
    <Div
      _width={width}
      padd="0px 16px"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Div _direction="row">
        <PriceComponent label="Minimum Price " value={minimum_price} />
        <PriceComponent label="Maximum Price " value={maximum_price} />
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
      setSelectedPrice,
      fetchCountProduct,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  colectionPrices: state.productFilter.data.prices,
  minimum_price: state.productFilter.selected.prices.minimum_price,
  maximum_price: state.productFilter.selected.prices.maximum_price,
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPriceOrg)
