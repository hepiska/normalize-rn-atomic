import React from 'react'
import { ViewStyle, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

interface ListItemCardType {
  leftContent: any
  rightContent?: any
  style?: ViewStyle
  onPress?: () => void
  activeOpacity?: number
}

const ListItemCard = ({
  leftContent,
  rightContent,
  style,
  onPress,
  activeOpacity,
}: ListItemCardType) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity || 0.2}>
      <View style={{ ...styles.container, ...style }}>
        {leftContent && leftContent}
        {rightContent && rightContent}
      </View>
    </TouchableOpacity>
  )
}

export default ListItemCard
