import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}

const OneColumnListLoader = (props: LoaderPropsType) => {
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

          <LineLoader style={{ height: 16, width: 81, marginTop: 16 }} />
          <LineLoader style={{ height: 12, width: 177, marginTop: 8 }} />

          {/* picture product  */}
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ height: 88, width: 66, marginTop: 16 }} />

            <View style={{ marginLeft: 16, marginTop: 16 }}>
              <LineLoader style={{ height: 12, width: 65 }} />
              <LineLoader style={{ height: 12, width: 172, marginTop: 8 }} />
              <LineLoader style={{ height: 10, width: 83, marginTop: 16 }} />
            </View>
          </View>

          {/* divider  */}
          <LineLoader
            style={{ height: 1, width: layout.width, marginVertical: 16 }}
          />

          {/* total  */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <LineLoader style={{ height: 14, width: 89 }} />
            <LineLoader style={{ height: 14, width: 74 }} />
          </View>
        </>
      )}
    </View>
  )
}
export default OneColumnListLoader
