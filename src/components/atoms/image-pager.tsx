import React, { memo } from 'react'
import { ViewStyle, StyleSheet, View, Text } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'

interface FieldType {
  page: number
  totalPage: number
  style?: ViewStyle
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(26, 26, 26, 0.6)',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 34,
  },
})

const ImagePager = ({ page, totalPage, style }: FieldType) => {
  return (
    <View style={{ ...style, ...styles.container }}>
      <Text
        style={{
          ...fontStyle.helvetica,
          fontSize: 12,
          color: colors.white,
        }}>{`${page}/${totalPage}`}</Text>
    </View>
  )
}

export default memo(ImagePager)
