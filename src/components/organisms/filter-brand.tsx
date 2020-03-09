import React, { Component, useState, memo } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { helveticaNormalFont } from '@components/commont-styles'
import Field from '@components/atoms/field'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AlvabetSelectorMol from '@components/molecules/alvabet-selector'

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

const FilterBrandOrg = ({}: any) => {
  const [
    { search, filter },
    { _onChangeAlvabet, _onSearchChange },
  ] = useBrandFilter()

  return (
    <Div
      _width={width}
      padd="0px 16px"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Div _width="100%" _height="32px">
        <Field
          style={{ width: '100%' }}
          value={search}
          onChangeText={_onSearchChange}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="search"
              color={colors.black90}
            />
          }
        />
      </Div>
      <AlvabetSelectorMol onSelect={_onChangeAlvabet} />
    </Div>
  )
}

export default FilterBrandOrg
