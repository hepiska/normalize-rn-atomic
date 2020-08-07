import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Image } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  wrapImage: {
    paddingHorizontal: 12,
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  h1: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
    color: colors.black80,
  },
})
export default class DanaCardProfile extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.wrapImage}>
          <Image
            source={require('../../assets/placeholder/dana-logo.png')}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.h1}>DANA</Text>
          <Text style={styles.h1}>+62-812-8222-2134</Text>
        </View>
      </View>
    )
  }
}
