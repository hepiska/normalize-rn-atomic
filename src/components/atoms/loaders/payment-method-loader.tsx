import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const PaymentMethodLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <LineLoader style={{ width: 141, height: 24 }} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>

      <LineLoader style={{ width: 88, height: 24, marginTop: 32 }} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>

      <LineLoader style={{ width: 117, height: 24, marginTop: 32 }} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <LineLoader style={{ width: 88, height: 66 }} />
        <LineLoader style={{ width: 163, height: 14, marginLeft: 16 }} />
      </View>
    </SafeAreaView>
  )
}
export default PaymentMethodLoader
