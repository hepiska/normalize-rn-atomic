import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: colors.black50,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

const MyTabBar = ({ state, descriptors, navigation }) => {
  const centerIndex = (state.routes.length - 1) / 2

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
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
          const color = isFocused ? colors.purple1 : colors.gray3
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }
          const icon = options.tabBarIcon ? options.tabBarIcon : () => null

          if (centerIndex === index) {
            return (
              <View
                key={'tabroute' + index}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                style={styles.button}>
                {icon({ color })}
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.black100,
                  }}>
                  {label}
                </Text>
              </View>
            )
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={'tabroute' + index}
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {icon({ color })}
              <Text
                style={{
                  fontSize: 10,
                  color,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default MyTabBar
