import React, {
  Component,
  useState,
  memo,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { Dimensions, TextInput } from 'react-native'
import { batch } from 'react-redux'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@utils/constants'

import MultiSlider from '@ptomasroos/react-native-multi-slider'

const { width } = Dimensions.get('screen')

const PriceComponent = ({ label, curency = 'Rp', value, onChange }: any) => {
  return (
    <Div _flex="1" align="flex-start">
      <Font>{label}</Font>
      <Div _direction="row" _margin="4px 0px 0px 0px">
        <Div
          _height="38px"
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
          _height="38px"
          _width="96px"
          radius="8px"
          padd="0px 8px">
          <TextInput
            keyboardType="numeric"
            value={String(value)}
            onChangeText={onChange}
            style={{ width: '100%', height: '100%', fontSize: 10 }}
          />
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
  selectedCategory,
  activeCollection,
  selectedBrand,
}: any) => {
  const delta = colectionPrices.maximum_price - colectionPrices.minimum_price
  const [locPrice, setLocPrice] = useState({
    max: maximum_price,
    min: minimum_price,
  })

  const [multiSlider, changeMultiSlider] = useState([0, maxSlider])
  let timeout = null

  useEffect(() => {
    const initialCursorMin = Math.round(
      ((minimum_price - colectionPrices.minimum_price) / delta) * maxSlider,
    )
    const initialCursorMax = Math.round(
      ((maximum_price - colectionPrices.minimum_price) / delta) * maxSlider,
    )

    changeMultiSlider([initialCursorMin, initialCursorMax])

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (timeout) {
      timeout = null
    }
    timeout = setTimeout(() => {
      batch(() => {
        setSelectedPrice({
          type: 'minimum_price',
          value: locPrice['min'],
        })
        setSelectedPrice({
          type: 'maximum_price',
          value: locPrice.max,
        })
      })
    }, 500)
  }, [locPrice])

  const _ontextChanged = type => val => {
    const newLocPrice = { ...locPrice }
    const newpos = [...multiSlider]
    if (
      val >= colectionPrices.minimum_price &&
      val <= colectionPrices.maximum_price
    ) {
      newLocPrice[type] = Number(val)
      const initialCursorMin = Math.round(
        ((newLocPrice[type] - colectionPrices.minimum_price) / delta) *
          maxSlider,
      )
      if (type === 'max') {
        newpos[1] = initialCursorMin
      } else {
        newpos[0] = initialCursorMin
      }
    }
    setLocPrice(newLocPrice)
    changeMultiSlider(newpos)
  }

  const _chageSlider = useCallback(pos => {
    changeMultiSlider(pos)
    const minPrice = Math.floor(
      colectionPrices.minimum_price + (pos[0] / maxSlider) * delta,
    )
    const maxPrice = Math.floor(
      colectionPrices.minimum_price + (pos[1] / maxSlider) * delta,
    )

    setLocPrice({ max: maxPrice, min: minPrice })
  }, [])

  console.log('====locpice', locPrice)

  return (
    <Div
      _width={width}
      padd="0px 16px"
      _height="100%"
      radius="0"
      _background={colors.white}
      justify="flex-start"
      align="flex-start">
      <Div _direction="row">
        <PriceComponent
          label="Minimum Price "
          value={locPrice.min}
          onChange={_ontextChanged('min')}
        />
        <PriceComponent
          label="Maximum Price "
          value={locPrice.max}
          onChange={_ontextChanged('max')}
        />
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
        />
      </Div>
    </Div>
  )
}

const memoizeFilterOrg = memo(FilterPriceOrg, (prevProps, nextProp) => {
  if (prevProps.minimum_price !== nextProp.minimum_price) {
    return false
  }
  if (prevProps.maximum_price !== nextProp.maximum_price) {
    return false
  }
  return true
})

export default memoizeFilterOrg
