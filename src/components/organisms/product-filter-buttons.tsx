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
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const onSearch = e => {
    setSearchKey(e)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      props.changeSearch(e)
    }, 600)
  }

  const _openFilter = (section?: any) => () => {
    if (section) {
      // props.openFilter(section)
      navigation.navigate('modals', {
        screen: 'ProductFilter',
        params: { section },
      })
    }
  }

  const goToSort = () => {
    navigation.navigate('modals', { screen: 'ProductSort' })
  }

  return (
    <Div _width="100%" bg="white" style={props.style}>
      <Div _width="100%" _direction="row" _margin="8px 0px">
        <Field
          value={searchKey}
          placeholder="Search for products..."
          onChangeText={onSearch}
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
          onPress={goToSort}
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
          onPress={_openFilter('category')}
          fontStyle={{ color: colors.white }}
          style={{ marginRight: 8, backgroundColor: colors.black100 }}
          leftIcon={
            <Icon
              // style={{ marginRight: 8 }}
              name="filter"
              color={colors.white}
            />
          }
        />
        <FilterButton title="Brands" onPress={_openFilter('Brand')} />
        <FilterButton title="Categories" onPress={_openFilter('Category')} />
        <FilterButton title="Prices" onPress={_openFilter('Price')} />
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
