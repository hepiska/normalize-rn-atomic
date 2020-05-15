import React, { Component, useState, useEffect, memo, useCallback } from 'react'
import { Dimensions, StyleSheet, SectionList } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { brandListData } from '@hocs/data/brand'
import Field from '@components/atoms/field'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@utils/constants'
import {
  changeSelectedBrand,
  fetchCountProduct,
} from '@modules/product-filter/action'
import { deepClone } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AlvabetSelectorMol from '@components/molecules/alvabet-selector'
import FilterBrandItem from '@components/molecules/filter-brand-item'
import { fontStyle } from '../commont-styles'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
})
const getAlfabetFromBrandSection = brands => {
  const alfabet = brands.reduce((acc, brand) => acc + brand.title, '#')
  return alfabet
}

const useBrandFilter = (props: any) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [availableAlfabet, setAvailableAlfabet] = useState('#')
  const _onChangeAlvabet = e => {
    if (e === '#') setFilter('')
    else setFilter(e)
  }

  useEffect(() => {
    setAvailableAlfabet(getAlfabetFromBrandSection(props.brands))
  }, [props.brands])
  useEffect(() => {
    props.fetchCountProduct({ brands: props.selectedBrand })
  }, [props.selectedBrand])
  const _onSearchChange = e => {
    setSearch(e)
  }
  return [
    { search, filter, availableAlfabet },
    { _onSearchChange, _onChangeAlvabet },
  ]
}

const FilterBrandOrg = (props: any) => {
  const [
    { search, filter, availableAlfabet },
    { _onChangeAlvabet, _onSearchChange },
  ] = useBrandFilter(props)

  let brands = deepClone(props.brands || []).map(brandSection => {
    brandSection.data = brandSection.data.filter(brand => {
      return brand.name.toLowerCase().includes(search.toLowerCase())
    })
    return brandSection
  })
  brands = brands.filter(brandSection => {
    if (!brandSection.data.length) {
      return false
    }
    return filter ? brandSection.title === filter : true
  })

  const _renderItem = ({ item }) => (
    <FilterBrandItem
      fontStyle={fontStyle.helvetica}
      onPress={brand => props.changeSelectedBrand(brand.id)}
      key={item.id}
      isSelected={props.selectedBrand.includes(item.id)}
      item={item}
    />
  )

  return (
    <Div
      _width={width}
      _flex="1"
      _height="100%"
      radius="0"
      justify="flex-start"
      align="flex-start">
      <Div _width="100%" _height="32px" _padding="0px 16px">
        <Field
          style={{ width: '100%' }}
          value={search}
          placeholder="Search Brand..."
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
      <AlvabetSelectorMol
        style={styles.container}
        onSelect={_onChangeAlvabet}
        available={availableAlfabet}
      />
      <SectionList
        style={styles.sectionContainer}
        renderSectionHeader={({ section: { title } }) => (
          <Div _width="100%" bg="white" padd="8px 0px" align="flex-start">
            <Font _padding="16px 0px 0px" style={fontStyle.helvetica}>
              {title}
            </Font>
          </Div>
        )}
        sections={brands}
        renderItem={_renderItem}
      />
    </Div>
  )
}

const mapStateToProps = state => ({
  brands: state.productFilter.data.brands || [],
  selectedBrand: state.productFilter.selected.brand_ids
    ? state.productFilter.selected.brand_ids
    : '',
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSelectedBrand, fetchCountProduct }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilterBrandOrg)
