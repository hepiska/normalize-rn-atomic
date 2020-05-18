import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'

interface ActionItemType {
  name: string
  value: string
  action?: (item: any) => void
}

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2,
    borderColor: colors.black100,
    borderStyle: 'solid',
  },
  button: {
    padding: 4,
    marginHorizontal: 8,
  },
  scrollWrapper: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  tabBarFont: {
    ...fontStyle.futuraDemi,
    fontSize: 16,
  },
})

const getActiveStyle = (item, selectedItem) =>
  item.value === selectedItem ? styles.active : {}

interface ActionTabMenuPropsType {
  items: Array<ActionItemType>
  selecteditemValue?: string
  onPress?: (item: any) => void
}

const ActionTabMenu = ({
  items,
  selecteditemValue,
  onPress,
}: ActionTabMenuPropsType) => {
  return (
    <View>
      <ScrollView horizontal style={styles.scrollWrapper}>
        {items.map(_item => (
          <TouchableOpacity
            onPress={() =>
              _item.action ? _item.action(_item) : onPress && onPress(_item)
            }
            style={[styles.button, getActiveStyle(_item, selecteditemValue)]}
            key={_item.value}>
            <Text style={styles.tabBarFont}>{_item.name} </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
export default ActionTabMenu
