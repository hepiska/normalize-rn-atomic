import React from 'react'
import { View, Text, ScrollView, StyleSheet, ViewStyle } from 'react-native'
import Pill from '@components/atoms/pill'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  pill: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black50,
    // backgroundColor: colors.black10,
    backgroundColor: colors.white,

    marginRight: 12, // real: 22
    paddingVertical: 8, // real: 13
    // paddingHorizontal: 15, // real: 15
  },
})

interface SelectAbleFillInterface {
  style?: ViewStyle
  onPress: (data: any) => void
  data: Array<any>
}

const SelectAbleFill = ({ style, data, onPress }: SelectAbleFillInterface) => {
  const onSelecPill = category => () => {
    onPress(category)
  }
  return (
    <ScrollView style={style} horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item, index) => {
        return (
          <Pill
            title={item.title}
            key={'selectable-pill-' + index}
            style={{
              ...styles.pill,
              backgroundColor: item.isSelected ? colors.black10 : colors.white,
            }}
            item={
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 14,
                  color: item.color,
                }}>
                {item.title}
              </Text>
            }
            onPress={onSelecPill(item)}
          />
        )
      })}
    </ScrollView>
  )
}

export default SelectAbleFill
