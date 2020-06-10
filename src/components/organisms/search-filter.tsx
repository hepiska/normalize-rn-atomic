import React, { Component, memo, useState, useEffect } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import {
  View,
  Text,
  FlatList,
  ViewStyle,
  StyleSheet,
  TextInputProps,
} from 'react-native'
import Field from '@components/atoms/field'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '@utils/constants'
import Pill from '@components/atoms/pill'
import Icon from 'react-native-vector-icons/FontAwesome'

interface FilterItemType {
  name: string
  value: string
}

interface SearchIconType {
  searchKey?: string
  placeholder?: string
  onSearchChange?: (key: string) => void
  filterItems?: Array<FilterItemType>
  selectedFilter: Array<string>
  onfilterSelected?: (FilterItemType) => void
  style?: ViewStyle
  itemStyle?: ViewStyle
  inputProps?: TextInputProps
}

const styles = StyleSheet.create({
  container: {},
  item: {
    marginRight: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
})

const SearchFilter = ({
  searchKey,
  onSearchChange,
  placeholder,
  selectedFilter,
  onfilterSelected,
  style,
  itemStyle,
  filterItems,
  inputProps,
}: SearchIconType) => {
  let timer = null
  const [selected, setSelected] = useState([])
  useEffect(() => {
    setSelected(selectedFilter)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const _onPress = item => () => {
    setSelected([item.value])
    if (timer) {
      timer = null
    } else {
      timer = setTimeout(() => {
        if (onfilterSelected) {
          onfilterSelected(item)
        }
      }, 600)
    }
  }
  return (
    <View style={{ ...styles.container, ...style }}>
      {onSearchChange && (
        <Field
          value={searchKey}
          placeholder={placeholder || 'Search...'}
          onChangeText={onSearchChange}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="search"
              color={colors.black90}
            />
          }
          inputProps={{ ...inputProps }}
        />
      )}
      <View style={{ flexDirection: 'row' }}>
        {filterItems && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            horizontal
            style={onSearchChange ? { marginVertical: 12 } : {}}>
            {filterItems.map((data, index) => {
              const isSelected = selected?.includes(data.value)
              const border = isSelected ? { borderColor: colors.black100 } : {}
              return (
                <Pill
                  onPress={_onPress(data)}
                  key={`item-${index}`}
                  title={data.name}
                  style={{ ...styles.item, ...border, ...itemStyle }}
                />
              )
            })}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

export default memo(SearchFilter)
