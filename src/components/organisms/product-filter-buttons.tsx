import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, ScrollDiv } from '@components/atoms/basic'
import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import { useNavigation } from '@react-navigation/native'
import {
  changeValue,
  openFilter,
  changeSearch,
} from '@modules/product-filter/action'
import Icon from 'react-native-vector-icons/FontAwesome5'

let timer = null

const FilterButton = ({ title, onPress }) => {
  return (
    <OutlineButton
      title={title}
      onPress={onPress}
      fontStyle={{ color: colors.black90 }}
      style={{ marginRight: 8, borderColor: colors.black90 }}
      rightIcon={
        <Icon
          style={{ marginLeft: 8 }}
          name="sort-down"
          color={colors.black90}
        />
      }
    />
  )
}
const FilterTriger = (props: any) => {
  const navigation = useNavigation()
  const [searchKey, setSearchKey] = useState(props.search)

  useEffect(() => {
    setSearchKey(props.search)
  }, [props.search])

  useEffect(() => {
    timer = setTimeout(() => {
      props.changeSearch(searchKey)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchKey])

  const _openFilter = (section?: any) => () => {
    if (section) {
      props.openFilter(section)
    }
    navigation.navigate('modals', { screen: 'ProductFilter' })
  }

  return (
    <Div _width="100%" bg="white" style={props.style}>
      <Div _width="100%" _direction="row" _margin="8px 0px">
        <Field
          value={searchKey}
          placeholder="Search for products..."
          onChangeText={setSearchKey}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="search"
              color={colors.black90}
            />
          }
        />
        <Button
          title="Sort"
          onPress={_openFilter('sort')}
          fontStyle={{ color: colors.white }}
          style={{ marginLeft: 8, backgroundColor: colors.black100 }}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="sort-amount-down"
              color={colors.white}
            />
          }
        />
      </Div>
      <ScrollDiv
        _width="100%"
        horizontal
        _margin="8px 0px"
        showsHorizontalScrollIndicator={false}>
        <Button
          title="All Filters"
          onPress={_openFilter()}
          fontStyle={{ color: colors.white }}
          style={{ marginRight: 8, backgroundColor: colors.black100 }}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="filter"
              color={colors.white}
            />
          }
        />
        <FilterButton title="Brands" onPress={_openFilter('brand')} />
        <FilterButton title="Categories" onPress={_openFilter('category')} />
        <FilterButton title="Prices" onPress={_openFilter('price')} />
      </ScrollDiv>
    </Div>
  )
}

const mapStateToProps = state => ({ search: state.productFilter.search })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeValue,
      openFilter,
      changeSearch,
    },
    dispatch,
  )
export default connect(mapStateToProps, mapDispatchToProps)(FilterTriger)
