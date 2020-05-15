import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { fontStyle, borderStyle } from '@src/components/commont-styles'

interface ActionListCartType {
  source?: string
  icon: string
  title: string
  desc?: string
  index: number
  isFirst?: Boolean
  backgroundColor?: string
  borderRadius?: number
  style?: ViewStyle
  onPress?: any
}

const styles = StyleSheet.create({
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
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

const ActionListCard = ({
  isFirst,
  source,
  icon,
  title,
  desc,
  index,
  backgroundColor,
  borderRadius,
  style,
  onPress,
}: ActionListCartType) => {
  const IconComponent = source === 'material-icon' ? IconMi : Icon
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...style,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopColor:
            isFirst && index === 0 ? colors.black50 : colors.white,
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
          }}>
          <IconComponent name={icon} size={18} color={colors.black100} />
          <View style={{ marginLeft: 22 }}>
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
        <Icon name="chevron-right" size={16} color={colors.black100} />
      </View>
    </TouchableOpacity>
  )
}

export default ActionListCard
