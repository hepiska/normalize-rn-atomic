import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Animated, { Easing, cos } from 'react-native-reanimated'
import { Button } from '@components/atoms/button'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'

const { Value, timing, interpolate, concat, Extrapolate } = Animated

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 30,
    ...fontStyle.helveticaBold,
  },
  subtitle: {
    fontSize: 14,
    ...fontStyle.helvetica,
  },
})

const ConfirmationBox = ({ title, subtitle, actions }) => {
  return (
    <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 4 }}>
      <Text style={[styles.title, { marginBottom: 15 }]}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 24,
        }}>
        {actions.map(action => {
          return (
            <Button
              leftIcon={null}
              key={action.title}
              onPress={action.onPress}
              title={action.title}
              style={{
                backgroundColor: action.background,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 16,
              }}
              fontStyle={{
                ...styles.subtitle,
                color: action.fontColor,
                marginLeft: 0,
              }}
            />
          )
        })}
      </View>
    </View>
  )
}

export default ConfirmationBox
