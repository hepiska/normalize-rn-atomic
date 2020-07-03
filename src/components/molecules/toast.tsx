import React, { useEffect, useMemo } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { colors } from '@utils/constants'
import Animated, { Easing, cos } from 'react-native-reanimated'

import { fontStyle } from '@components/commont-styles'

const { Value, timing, interpolate, concat, Extrapolate } = Animated

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  closeFont: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.green2,
  },
  title: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.white,
  },
})

const Toast = ({ message, isOpen, toastPos, closeToast }) => {
  const animated = useMemo(() => {
    return {
      toast: new Animated.Value(0),
    }
  }, [])

  useEffect(() => {
    const sheet = timing(animated.toast, {
      duration: 300,
      toValue: isOpen ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    })
    sheet.start()
  }, [isOpen])

  const positionSheet = interpolate(animated.toast, {
    inputRange: [0, 1],
    outputRange: [-200, toastPos || 64],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View
      style={{
        width,
        position: 'absolute',
        bottom: positionSheet,
        minHeight: 80,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'rgba(26, 26, 26, 0.4)',
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          height: '100%',
          width: '80%',
        }}>
        <View>
          <Text style={styles.title}>{message}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={closeToast}>
            <Text style={styles.closeFont}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default Toast
