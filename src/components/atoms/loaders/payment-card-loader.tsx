import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}

const PaymentCardLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      onLayout={_setLayout}
      style={{
        ...props.style,
      }}>
      {layout && (
        <>
          <LineLoader style={{ height: 34, width: layout.width }} />

          {/* picture product  */}
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ height: 32, width: 45, marginTop: 21 }} />

            <View style={{ marginLeft: 21, marginTop: 21 }}>
              <LineLoader style={{ height: 10, width: 64 }} />
              <LineLoader style={{ height: 14, width: 85, marginTop: 8 }} />
              <LineLoader style={{ height: 10, width: 107, marginTop: 16 }} />
              <LineLoader style={{ height: 12, width: 102, marginTop: 4 }} />
              <LineLoader style={{ height: 10, width: 77, marginTop: 16 }} />
              <LineLoader style={{ height: 12, width: 124, marginTop: 4 }} />
            </View>
          </View>

          {/* total  */}
          <LineLoader
            style={{ height: 32, width: layout.width, marginTop: 24 }}
          />
        </>
      )}
    </View>
  )
}
export default PaymentCardLoader
