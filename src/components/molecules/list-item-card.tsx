import React from 'react'
import { ViewStyle, View, StyleSheet, Image } from 'react-native'
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
  backgroundImage?: any
  style?: ViewStyle
  onPress?: () => void
  activeOpacity?: number
}

const ListItemCard = ({
  leftContent,
  rightContent,
  style,
  backgroundImage,
  onPress,
  activeOpacity,
}: ListItemCardType) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity || 0.2}>
      <View style={{ ...styles.container, ...style }}>
        {leftContent && leftContent}
        {rightContent && rightContent}
      </View>
      {backgroundImage && (
        <Image style={StyleSheet.absoluteFillObject} source={backgroundImage} />
      )}
    </TouchableOpacity>
  )
}

export default ListItemCard
