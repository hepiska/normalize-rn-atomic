import React from 'react'
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  Text,
} from 'react-native'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import Icon from 'react-native-vector-icons/FontAwesome'

interface BottonItem {
  name: string
  color?: string
  onPress: () => void
  icon?: string
  iconColor?: string
}

interface ButtonGroupProps {
  style?: ViewStyle
  items: Array<BottonItem>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: '#BBB',
  },
  lastButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  fontStyle: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    marginLeft: 10,
    color: colors.black100,
  },
})

const ButtonGroup = ({ items, style }: ButtonGroupProps) => {
  const composeStyle = [styles.container, style]
  return (
    <View style={composeStyle}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={`button-group-${index}`}
          onPress={item.onPress}
          style={items.length - 1 > index ? styles.button : styles.lastButton}>
          {item.icon && (
            <Icon
              name={item.icon}
              size={16}
              color={item.iconColor || colors.black100}
            />
          )}
          <Text
            style={{
              ...styles.fontStyle,
              ...fontStyle.helvetica,
              color: item.color,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ButtonGroup
