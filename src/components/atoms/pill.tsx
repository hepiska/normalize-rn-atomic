import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
  item?: ReactElement
}

const Pill = ({ onPress, title, style, item }: PillType) => {
  const composeStyle = { ...styles.container, ...style }
  return (
    <TouchableOpacity style={composeStyle} onPress={onPress}>
      {item || <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default Pill
