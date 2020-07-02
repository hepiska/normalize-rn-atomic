import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const PaymentWaitingLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...props.style }} onLayout={_setLayout}>
      {layout && (
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <LineLoader style={{ width: 90, height: 18 }} />
            <LineLoader style={{ width: 32, height: 18 }} />
          </View>
          <LineLoader
            style={{
              width: layout.width,
              height: 37,
              marginTop: 24,
              marginBottom: 16,
            }}
          />
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <LineLoader
              style={{ width: 200, height: 15, paddingHorizontal: 16 }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <LineLoader
                style={{
                  width: layout.width / 3 - 16,
                  height: 24,
                  marginRight: 16,
                }}
              />
              <LineLoader
                style={{
                  width: layout.width / 3 - 16,
                  height: 24,
                  marginRight: 16,
                }}
              />
              <LineLoader
                style={{
                  width: layout.width / 3 - 16,
                  height: 24,
                  marginRight: 16,
                }}
              />
            </View>
            <LineLoader style={{ width: 300, height: 12, marginTop: 36 }} />
          </View>
          <LineLoader style={{ width: 272, height: 18, marginTop: 40 }} />
          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LineLoader style={{ width: 50, height: 42 }} />
              <LineLoader style={{ width: 135, height: 16, marginLeft: 16 }} />
            </View>
            <LineLoader style={{ width: 85, height: 28 }} />
          </View>
          <View
            style={{
              marginTop: 48,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <LineLoader style={{ width: 95, height: 14 }} />
            <LineLoader style={{ width: 85, height: 14 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: layout.width,
              marginTop: 28,
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
            }}>
            <LineLoader style={{ width: 118, height: 14 }} />
            <LineLoader style={{ width: 83, height: 14 }} />
          </View>

          <View
            style={{
              width: layout.width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 48,
            }}>
            <LineLoader style={{ width: 90, height: 16 }} />
            <LineLoader style={{ width: 47, height: 16 }} />
          </View>
          <LineLoader style={{ width: 170, height: 14, marginTop: 24 }} />
          <LineLoader style={{ width: 290, height: 14, marginTop: 8 }} />
          <LineLoader style={{ width: 230, height: 14, marginTop: 8 }} />
          <LineLoader style={{ width: 250, height: 14, marginTop: 8 }} />
          <LineLoader style={{ width: 120, height: 14, marginTop: 8 }} />
        </>
      )}
    </SafeAreaView>
  )
}
export default PaymentWaitingLoader
