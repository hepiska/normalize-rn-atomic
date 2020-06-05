import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: colors.black50,
  },
})

const Line = (props: any) => {
  return <View style={{ ...styles.line, ...props.style }} />
}

export default Line
