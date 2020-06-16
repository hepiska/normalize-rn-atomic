import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated'
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
  navigationState: any
  jumpTo: any
  position: any
  rightAction?: any
  contentHeight: number
  y: any
}

const TabMenuCursorNavigator = ({
  navigationState,
  jumpTo,
  position,
  rightAction,
  y,
  contentHeight,
}: DiscoverTapType) => {
  const tabPosition = interpolate(y, {
    inputRange: [0, contentHeight],
    outputRange: [contentHeight, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  const state = navigationState
  return (
    <Animated.View
      style={{
        position: 'absolute',
        zIndex: 2,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        transform: [{ translateY: tabPosition }],
      }}>
      {state.routes.map((route, index) => {
        const label = route.title

        const isFocused = state.index === index

        const onPress = () => {
          if (!isFocused) {
            jumpTo(route.key)
          }
        }

        const inputRange = state.routes.map((_, i) => i)
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          extrapolate: Extrapolate.CLAMP,
        })
        const fontOpacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.8)),
          extrapolate: Extrapolate.CLAMP,
        })

        return (
          <TouchableOpacity
            key={'tab-menu' + index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}>
            <View
              style={{
                marginRight: 16,
              }}>
              <View
                style={{
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                }}>
                <Animated.Text
                  style={{
                    color: colors.black100,
                    ...fontStyle.helveticaBold,
                    fontSize: 14,
                    opacity: fontOpacity,
                  }}>
                  {label}
                </Animated.Text>
              </View>
              <Animated.View
                style={{
                  width: '100%',
                  height: 2,
                  opacity,
                  backgroundColor: colors.black100,
                  borderRadius: 16,
                }}
              />
            </View>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}
export default TabMenuCursorNavigator
