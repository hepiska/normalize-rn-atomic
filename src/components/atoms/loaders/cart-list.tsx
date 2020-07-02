import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'
import CartCardLoader from './cart-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const CartListLoader = (props: LoaderPropsType) => {
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
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <LineLoader style={{ width: 14, height: 14, marginRight: 16 }} />
              <LineLoader style={{ width: 67, height: 14 }} />
            </View>
            <LineLoader style={{ width: 55, height: 16 }} />
          </View>
          <CartCardLoader style={{ width: layout.width }} />
          <CartCardLoader style={{ width: layout.width }} />
          <CartCardLoader style={{ width: layout.width }} />
          <CartCardLoader style={{ width: layout.width }} />
          <CartCardLoader style={{ width: layout.width }} />
        </>
      )}
    </SafeAreaView>
  )
}
export default CartListLoader
