import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native'
import { colors } from '@utils/constants'
import Icon from '@assets/fonts/custom-icons'
import IconM from 'react-native-vector-icons/FontAwesome5'
import { fontStyle, borderStyle } from '@src/components/commont-styles'
import ListItemCard from '@src/components/molecules/list-item-card'

interface ActionListCartType {
  source?: string
  icon?: any
  title: string
  desc?: string
  index: number
  isFirst?: Boolean
  backgroundColor?: string
  backgroundImage?: string
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
  source,
  icon,
  title,
  desc,
  backgroundColor,
  backgroundImage,
  borderRadius,
  style,
  onPress,
}: ActionListCartType) => {
  return (
    <ListItemCard
      onPress={onPress}
      backgroundImage={backgroundImage}
      leftContent={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name={icon} size={18} color={colors.black100} />
          <View style={{ marginLeft: icon ? 22 : 0 }}>
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
      }
      rightContent={
        <IconM name="chevron-right" size={16} color={colors.black100} />
      }
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor,
        borderRadius,
        ...style,
      }}
    />
  )
}

export default ActionListCard
