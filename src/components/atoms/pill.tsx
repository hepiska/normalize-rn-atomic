import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  text: { ...fontStyle.helvetica, fontSize: 14 },
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
