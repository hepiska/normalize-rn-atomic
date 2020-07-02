import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'
import AddressCardLoader from '@components/atoms/loaders/address-card-loader'
import ItemCheckoutCardLoader from './item-checkout-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const CheckoutLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...props.style }} onLayout={_setLayout}>
      {layout && (
        <>
          <LineLoader style={{ width: 185, height: 24, marginTop: 12 }} />
          <AddressCardLoader style={{ marginTop: 24 }} disableTooltip />
          <ItemCheckoutCardLoader style={{ marginTop: 40 }} />
          <LineLoader style={{ width: 134, height: 16, marginTop: 60 }} />
          <LineLoader
            style={{ width: layout.width, height: 45, marginTop: 24 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 40, marginTop: 16 }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 42,
            }}>
            <LineLoader style={{ width: 71, height: 16 }} />
            <LineLoader style={{ width: 97, height: 16 }} />
          </View>
        </>
      )}
    </SafeAreaView>
  )
}
export default CheckoutLoader
