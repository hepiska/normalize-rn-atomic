import React from 'react'
import { Dimensions, ViewStyle, View, StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

interface SearchResultCardType {
  leftContent: any
  rightContent?: any
  style?: ViewStyle
  onPress?: () => void
}

const SearchResultCard = ({
  leftContent,
  rightContent,
  style,
  onPress = null,
}: SearchResultCardType) => {
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.2 : 1}>
      <View style={{ ...styles.container, ...style }}>
        {leftContent && leftContent}
        {rightContent && rightContent}
      </View>
    </TouchableOpacity>
  )
}

export default SearchResultCard
