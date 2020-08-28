import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
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
          const color = isFocused ? colors.black100 : colors.black60
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }
          const icon = options.tabBarIcon ? options.tabBarIcon : () => null

          const goToCreate = () => {
            navigate('Screens', { screen: 'CreateCollection' })
          }

          if (centerIndex === index) {
            return (
              <TouchableOpacity
                key={'tabroute' + index}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                style={styles.button}
                onPress={goToCreate}>
                {icon({ color })}
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.black80,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
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
