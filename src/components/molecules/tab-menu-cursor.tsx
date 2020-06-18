import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
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
}: DiscoverTapType) => {
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          flexDirection: 'row',
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}>
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
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
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
      </ScrollView>
    </View>
  )
}
export default TabMenuNavigator
