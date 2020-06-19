import React, {
  Component,
  useState,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from 'react'
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
import Icon from 'react-native-vector-icons/FontAwesome5'
import AlvabetSelectorMol from '@components/molecules/alvabet-selector'
import FilterBrandItem from '@components/molecules/filter-brand-item'
import { fontStyle } from '../commont-styles'
import { deepClone } from '@src/utils/helpers'

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
    props.fetchCountProduct({
      collection_ids: props.activeCollection,
      brands: props.selectedBrand,
      category_ids: props.selectedCategory || props.activeCategory,
      ...props.selectedPrice,
    })
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

  let _brands = useMemo(() => {
    let tembrands = (props.brands.length ? deepClone(props.brands) : []).map(
      brandSection => {
        brandSection.data = brandSection.data.filter(brand => {
          return brand.name.toLowerCase().includes(search.toLowerCase())
        })
        return brandSection
      },
    )

    return [...tembrands]
  }, [search])

  let brands = useMemo(
    () =>
      _brands.filter(brandSection => {
        if (!brandSection.data.length) {
          return false
        }
        return filter ? brandSection.title === filter : true
      }),
    [filter, _brands],
  )

  const _renderItem = useMemo(
    () => ({ item }) => {
      const selectedBrand = props.selectedBrand
        .split(',')
        .map(value => parseInt(value))
      return (
        <FilterBrandItem
          key={'key-brand' + item.id}
          fontStyle={fontStyle.helvetica}
          onPress={brand => props.changeSelectedBrand(brand.id)}
          isSelected={selectedBrand.includes(item.id)}
          item={item}
        />
      )
    },
    [props.selectedBrand],
  )

  return (
    <Div
      _width={width}
      _flex="1"
      _height="100%"
      radius="0"
      _background="white"
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

const memoizeFilterOrg = memo(FilterBrandOrg, (currentProp, nextProp) => {
  return currentProp.selectedBrand === nextProp.selectedBrand
})

const mapStateToProps = state => ({
  brands: state.productFilter.data.brands || [],
  selectedPrice: state.productFilter.selected.price,
  activeCollection: state.productFilter.activePage.collection_ids || '',
  selectedBrand: state.productFilter.selected.brand_ids
    ? state.productFilter.selected.brand_ids
    : '',
  activeCategory: state.productFilter.activePage.category_ids || '',
  selectedCategory: state.productFilter.selected.category_ids
    ? state.productFilter.selected.category_ids
    : '',
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSelectedBrand, fetchCountProduct }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(memoizeFilterOrg)
