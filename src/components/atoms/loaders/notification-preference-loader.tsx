import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
}

const SettingLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <View
        style={{
          ...props.style,
        }}>
        <>
          <LineLoader style={{ width: 287, height: 24, marginTop: 24 }} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 24,
            }}>
            <View>
              <LineLoader style={{ width: 80, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 70,
            }}>
            <View>
              <LineLoader style={{ width: 120, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
              <LineLoader style={{ width: 40, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 70,
            }}>
            <View>
              <LineLoader style={{ width: 120, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
        </>
        <>
          <LineLoader style={{ width: 180, height: 24, marginTop: 70 }} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 24,
            }}>
            <View>
              <LineLoader style={{ width: 80, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 70,
            }}>
            <View>
              <LineLoader style={{ width: 120, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 70,
            }}>
            <View>
              <LineLoader style={{ width: 120, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 36,
              marginTop: 70,
            }}>
            <View>
              <LineLoader style={{ width: 120, height: 14 }} />
              <LineLoader style={{ width: 249, height: 14, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 52, height: 28, borderRadius: 100 }} />
          </View>
        </>
      </View>
    </SafeAreaView>
  )
}
export default SettingLoader
