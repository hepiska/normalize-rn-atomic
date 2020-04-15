import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { connect } from 'react-redux'
import { colors } from '@utils/constants'
import { bindActionCreators } from 'redux'
import { getFeaturedCategories } from '@modules/category/action'

const styles = StyleSheet.create({
  text: { fontFamily: 'Helvetica Neue', fontSize: 14 },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.black10,
    borderStyle: 'solid',
    borderColor: colors.black50,
    borderWidth: 1,
  },
})

interface PillType {
  onPress: () => void
  title: string
  style: ViewStyle
}

const Pill = ({ onPress, title, style }: PillType) => {
  const composeStyle = { ...styles.container, ...style }
  return (
    <TouchableOpacity style={composeStyle} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Pill
