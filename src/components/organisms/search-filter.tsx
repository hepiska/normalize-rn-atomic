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
import { fontStyle } from '../commont-styles'

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
  onfilterClicked?: () => void
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
  onfilterClicked,
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
    if (onfilterClicked) {
      onfilterClicked()
    }
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
              const border = isSelected
                ? { borderColor: colors.black100 }
                : { borderColor: colors.black50 }
              const font = isSelected
                ? {
                    ...fontStyle.helvetica,
                    fontSize: 12,
                    color: colors.black100,
                  }
                : {
                    ...fontStyle.helvetica,
                    fontSize: 12,
                    color: colors.black70,
                  }
              const background = isSelected
                ? { backgroundColor: colors.black10 }
                : { backgroundColor: colors.white }
              const padding = {
                paddingHorizontal: 12,
                paddingVertical: 8,
              }
              const margin = {
                marginRight: 8,
              }
              return (
                <Pill
                  onPress={_onPress(data)}
                  key={`item-${index}`}
                  title={data.name}
                  style={{
                    ...styles.item,
                    ...border,
                    ...background,
                    ...padding,
                    ...margin,
                    ...itemStyle,
                  }}
                  item={<Text style={{ ...font }}>{data.name}</Text>}
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
