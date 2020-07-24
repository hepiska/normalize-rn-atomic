import React from 'react'
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native'
import { fontStyle } from '@components/commont-styles'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    height: 15,
    width: 45,
    position: 'absolute',
  },
  text: {
    ...fontStyle.helvetica,
    marginLeft: 14,
    fontSize: 8,
    color: 'white',
  },
})

interface type {
  value: number
  style: ViewStyle
}

const DiscountTag: React.FC<type> = ({ value, style }) => {
  const text = Math.round(value * 100) + '%'
  return (
    <View style={[styles.container, StyleSheet.flatten(style)]}>
      <Image
        source={require('@assets/icons/gold-tag.png')}
        style={styles.image}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default DiscountTag
