import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Animated, { Extrapolate } from 'react-native-reanimated'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import { setTabName } from '@src/modules/post-discover/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.black100,
  },
  fontActive: {
    color: colors.white,
  },
})

interface TabMenuUnderlineType {
  state: any
  descriptors: any
  navigation: any
  position: any
  rightAction?: any
  onChangeTab?: (activeTab: any) => void
  setTabName?: (argh: any) => void
}

class TabMenuUnderline extends React.PureComponent<TabMenuUnderlineType, any> {
  render() {
    const {
      state,
      descriptors,
      navigation,
      position,
      rightAction,
      onChangeTab,
    } = this.props
    return (
      <>
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
                      paddingHorizontal: 16,
                      borderRadius: 40, // before: 16, real: 40
                      paddingVertical: 8, // before: 4, real: 8
                    }}>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {
                          opacity,
                        },
                      ]}
                    />
                    <Text
                      style={{
                        color: isFocused ? colors.black100 : colors.black60,
                        ...fontStyle.helveticaBold,
                        fontSize: 14,
                        fontWeight: isFocused ? '500' : '400',
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
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setTabName }, dispatch)

export default connect(null, mapDispatchToProps)(TabMenuUnderline)
