import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}

const CourierCardLoader = (props: LoaderPropsType) => {
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
              marginHorizontal: 8,
            }}>
            <LineLoader style={{ width: 88, height: 66 }} />
            <View style={{ marginLeft: 16 }}>
              <LineLoader style={{ width: 89, height: 12 }} />
              <LineLoader style={{ width: 66, height: 14, marginTop: 8 }} />
            </View>
          </View>
        </>
      )}
    </View>
  )
}
export default CourierCardLoader
