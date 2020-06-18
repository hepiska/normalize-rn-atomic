import React from 'react'
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
}

const TabMenuNavigator = ({
  state,
  descriptors,
  navigation,
  position,
  rightAction,
}: DiscoverTapType) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
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
                  paddingHorizontal: 16,
                  borderRadius: 40, // before: 16, real: 40
                  paddingVertical: 8, // before: 4, real: 8
                }}>
                <Animated.View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      opacity,
                      backgroundColor: colors.black100,
                      borderRadius: 16,
                    },
                  ]}
                />
                <Text
                  style={{
                    color: isFocused ? colors.white : colors.black100,
                    ...fontStyle.helveticaBold,
                    fontSize: 14,
                  }}>
                  {label}
                </Text>
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
