import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, ScrollDiv } from '@components/atoms/basic'
import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import { changeValue, openFilter } from '@modules/product-filter/action'
import Icon from 'react-native-vector-icons/FontAwesome5'

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
  return (
    <Div _width="100%" bg="white">
      <Div _width="100%" _direction="row" _margin="8px 0px">
        <Field
          value=""
          onChangeText={() => {}}
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
          onPress={() => {
            props.changeValue({ key: 'isOpen', value: true })
          }}
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
      <ScrollDiv _width="100%" horizontal _margin="8px 0px">
        <Button
          title="All Filters"
          onPress={() => {}}
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
        <FilterButton
          title="Brands"
          onPress={() => props.openFilter('brand')}
        />
        <FilterButton
          title="Categories"
          onPress={() => props.openFilter('category')}
        />
        <FilterButton
          title="Prices"
          onPress={() => props.openFilter('price')}
        />
      </ScrollDiv>
    </Div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeValue,
      openFilter,
    },
    dispatch,
  )
export default connect(null, mapDispatchToProps)(FilterTriger)
