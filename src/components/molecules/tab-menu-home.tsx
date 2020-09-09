import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import Animated, { Extrapolate } from 'react-native-reanimated'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.black100,
  },
  fontActive: {
    color: colors.white,
  },
})

interface DiscoverTapType {
  state: any
  descriptors: any
  navigation: any
  position: any
  rightAction?: any
  onChangeTab?: (activeTab: any) => void
}

const TabMenuNavigator = ({
  state,
  descriptors,
  navigation,
  position,
  rightAction,
  onChangeTab,
}: DiscoverTapType) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.black50,
        borderBottomWidth: 2,
      }}>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (onChangeTab) {
              onChangeTab(index)
            }

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          const inputRange = state.routes.map((_, i) => i)
          if (inputRange.length < 2) {
            inputRange.push(1)
          }
          // console.log(
          //   '====',
          //   inputRange,
          //   inputRange.map(i => (i === index ? 1 : 0)),
          // )
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            extrapolate: Extrapolate.CLAMP,
          })

          return (
            <TouchableOpacity
              key={'tab-menu' + index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <View
                style={{
                  padding: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    color: isFocused ? colors.black100 : colors.black60,
                    ...fontStyle.helveticaBold,
                    fontSize: 18,
                  }}>
                  {label}
                </Text>
                {isFocused && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: 30,
                      height: 4,
                      backgroundColor: colors.black100,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      {rightAction && rightAction}
    </View>
  )
}
export default TabMenuNavigator
