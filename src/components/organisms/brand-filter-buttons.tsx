import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, ScrollDiv } from '@components/atoms/basic'
import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import { useNavigation } from '@react-navigation/native'
import { changeSearch } from '@modules/brand/action'
import Icon from 'react-native-vector-icons/FontAwesome5'

let timer = null

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
          placeholder="Search brands..."
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
    </Div>
  )
}

const mapStateToProps = state => ({ search: state.brands.search })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeSearch,
    },
    dispatch,
  )
export default connect(mapStateToProps, mapDispatchToProps)(FilterTriger)
