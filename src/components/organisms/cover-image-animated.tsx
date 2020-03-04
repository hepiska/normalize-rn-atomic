import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { exp } from 'react-native-reanimated'

const { interpolate, Extrapolate } = Animated

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
})

const CoverImageAnimated = ({ y, height, width, children, images }: any) => {
  const scale: any = interpolate(y, {
    inputRange: [-height, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP,
  })
  const zIndex: any = interpolate(y, {
    inputRange: [0, 10],
    outputRange: [2, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  const zIndexWhiteCover: any = interpolate(y, {
    inputRange: [height * 0.8, height],
    outputRange: [-1, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  const opacity = interpolate(y, {
    inputRange: [-64, height * 0.8, height],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: height,
          zIndex,
          transform: [{ scale }],
        },
      ]}>
      {children}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'white',
          opacity,
          zIndex: zIndexWhiteCover,
        }}
      />
    </Animated.View>
  )
}

export default CoverImageAnimated
