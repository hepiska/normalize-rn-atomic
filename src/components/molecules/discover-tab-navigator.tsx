import React, { ReactElement, useRef, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import Animated from 'react-native-reanimated'
import { colors } from '@utils/constants'
import { onScroll } from 'react-native-redash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { futuraBoldFont16, fontStyle } from '@components/commont-styles'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.black100,
  },
  fontActive: {
    color: colors.white,
  },
})

const getActiveStyle = (item, selectedItem) =>
  item.name === selectedItem ? styles.active : {}
const getActiveFont = (item, selectedItem) =>
  item.name === selectedItem ? styles.fontActive : {}

const TabMenuNavigator = ({
  onChangeTab,
  items,
  x,
  selectedItem,
  selectedIndex,
  rightAction,
}: any) => {
  const _onChangeTab = item => () => {
    if (onChangeTab) onChangeTab(item)
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 8,
        paddingHorizontal: 16,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{ flexDirection: 'row' }}>
        {items.map(item => (
          <TouchableOpacity
            key={item.name}
            onPress={_onChangeTab(item)}
            style={{
              ...getActiveStyle(item, selectedItem),
              paddingHorizontal: 16,
              borderRadius: 16,
              paddingVertical: 8,
            }}>
            <Font
              style={{
                ...getActiveFont(item, selectedItem),
                ...fontStyle.helveticaBold,
                fontSize: 14,
              }}>
              {item.title}
            </Font>
          </TouchableOpacity>
        ))}
      </View>
      {rightAction && rightAction}
    </View>
  )
}

export default TabMenuNavigator
