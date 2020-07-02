import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const PaymentDetailLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...props.style }} onLayout={_setLayout}>
      {layout && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
              paddingHorizontal: 16,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <LineLoader style={{ width: 65, height: 16 }} />
              <LineLoader style={{ width: 12, height: 12, marginLeft: 6 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <LineLoader style={{ width: 97, height: 16 }} />
              <LineLoader style={{ width: 12, height: 12, marginLeft: 8 }} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
              paddingHorizontal: 16,
            }}>
            <LineLoader style={{ width: 142, height: 14 }} />
            <LineLoader style={{ width: 85, height: 14 }} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
              paddingHorizontal: 16,
            }}>
            <LineLoader style={{ width: 89, height: 14 }} />
            <LineLoader style={{ width: 65, height: 14 }} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
              paddingHorizontal: 16,
            }}>
            <LineLoader style={{ width: 118, height: 14 }} />
            <LineLoader style={{ width: 46, height: 14 }} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
              paddingHorizontal: 16,
            }}>
            <LineLoader style={{ width: 118, height: 14 }} />
            <LineLoader style={{ width: 83, height: 14 }} />
          </View>

          <View
            style={{
              width: layout.width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 90,
            }}>
            <LineLoader style={{ width: 90, height: 16 }} />
            <LineLoader style={{ width: 47, height: 16 }} />
          </View>

          <LineLoader style={{ width: 321, height: 14, marginTop: 48 }} />
          <LineLoader style={{ width: 152, height: 14, marginTop: 16 }} />

          <LineLoader
            style={{ width: layout.width, height: 14, marginTop: 250 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 46, marginTop: 24 }}
          />
        </>
      )}
    </SafeAreaView>
  )
}
export default PaymentDetailLoader
