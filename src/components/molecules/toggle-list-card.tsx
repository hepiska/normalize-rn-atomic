import React, { useState } from 'react'
import { Text, StyleSheet, View, ViewStyle, Switch } from 'react-native'
import { colors } from '@utils/constants'
import { fontStyle, borderStyle } from '@src/components/commont-styles'

interface ActionListCartType {
  title: string
  desc?: string
  index: number
  isFirst?: Boolean
  backgroundColor?: string
  borderRadius?: number
  style?: ViewStyle
  onPress?: any
  isEnabled: boolean
}

const styles = StyleSheet.create({
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    fontWeight: '500',
  },

  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  button: {
    width: '100%',
    height: 32,
    borderColor: colors.black60,
  },
})

const ToggleListCard = ({
  isFirst,
  title,
  desc,
  index,
  backgroundColor,
  borderRadius,
  style,
  onPress,
  isEnabled,
}: ActionListCartType) => {
  const [isActive, setActive] = useState(isEnabled)
  return (
    <View
      style={{
        ...style,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: isFirst && index === 0 ? colors.black50 : colors.white,
        borderTopWidth: 1,
        ...borderStyle.bottom,
        paddingVertical: 24,
        backgroundColor,
        borderRadius,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0.9,
        }}>
        <View>
          <Text style={{ ...styles.helveticaBold14, color: colors.black100 }}>
            {title}
          </Text>
          {desc && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ ...styles.helvetica12, color: colors.black70 }}>
                {desc}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Switch
        trackColor={{ false: colors.black50, true: colors.blue50 }}
        thumbColor={isActive ? colors.white : colors.black60}
        style={{
          borderColor: isActive ? colors.blue50 : colors.black50,
          borderWidth: 2,
          borderRadius: 16,
          marginLeft: 18,
        }}
        onChange={() => {
          onPress()
          setActive(!isActive)
        }}
        value={isActive}
      />
    </View>
  )
}

export default ToggleListCard
