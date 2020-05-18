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
import MultiSlider from '@ptomasroos/react-native-multi-slider'
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
const maxSlider = 10

const FilterPriceOrg = ({
  changeValueUiIneraction,
  maximum_price,
  minimum_price,
  setSelectedPrice,
  colectionPrices,
  fetchCountProduct,
}: any) => {
  const delta = colectionPrices.maximum_price - colectionPrices.minimum_price

  const [multiSlider, changeMultiSlider] = useState([0, maxSlider])
  let timeout = null

  useEffect(() => {
    fetchCountProduct({ maximum_price, minimum_price })
  }, [maximum_price, minimum_price])
  const parentScrollDisabled = value => {
    changeValueUiIneraction({ key: 'isScrollEnabled', value: value })
  }

  useEffect(() => {
    const initialCursorMin = Math.round(
      ((minimum_price - colectionPrices.minimum_price) / delta) * maxSlider,
    )
    const initialCursorMax = Math.round(
      ((colectionPrices.maximum_price - minimum_price) / delta) * maxSlider,
    )
    changeMultiSlider([initialCursorMin, initialCursorMax])
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const _chageSlider = pos => {
    changeMultiSlider(pos)
    if (timeout) {
      timeout = null
    }

    timeout = setTimeout(() => {
      setSelectedPrice({
        type: 'minimum_price',
        value: Math.floor(
          colectionPrices.minimum_price + (pos[0] / maxSlider) * delta,
        ),
      })
      setSelectedPrice({
        type: 'maximum_price',
        value: Math.floor(
          colectionPrices.minimum_price + (pos[1] / maxSlider) * delta,
        ),
      })
    }, 500)
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
      <Div _width="100%">
        <MultiSlider
          values={multiSlider}
          isMarkersSeparated={true}
          sliderLength={width * 0.8}
          max={maxSlider}
          trackStyle={{
            height: 4,
          }}
          selectedStyle={{
            backgroundColor: 'black',
          }}
          unselectedStyle={{
            backgroundColor: 'silver',
          }}
          onValuesChange={_chageSlider}
          onValuesChangeStart={() => parentScrollDisabled(false)}
          onValuesChangeFinish={() => parentScrollDisabled(true)}
        />
      </Div>
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
  colectionPrices: state.productFilter.data.prices || {},
  minimum_price: state.productFilter.selected.prices.minimum_price,
  maximum_price: state.productFilter.selected.prices.maximum_price,
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPriceOrg)
