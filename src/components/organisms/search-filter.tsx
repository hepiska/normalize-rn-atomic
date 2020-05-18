import React, { Component, memo } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ViewStyle,
  StyleSheet,
  TextInputProps,
} from 'react-native'
import Field from '@components/atoms/field'
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
  filterItems,
  inputProps,
}: SearchIconType) => {
  const _onPress = item => () => {
    if (onfilterSelected) {
      onfilterSelected(item)
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
              const isSelected = selectedFilter?.includes(data.value)
              const border = isSelected ? { borderColor: colors.black100 } : {}
              return (
                <Pill
                  onPress={_onPress(data)}
                  key={`item-${index}`}
                  title={data.name}
                  style={{ ...styles.item, ...border }}
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
