import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'

interface HowToCartType {
  image?: any
  title?: string
  desc?: string
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    padding: 16,
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 18,
    color: colors.black100,
    width: 226,
  },
  desc: {
    ...fontStyle.helvetica,
    fontSize: 14,
    width: 248,
    color: colors.black70,
    marginTop: 8,
  },
  image: {
    height: 60,
    width: 60,
    marginBottom: 16,
  },
})

const HowToCard = ({ image, title, desc }: HowToCartType) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  )
}

export default HowToCard
