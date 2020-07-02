import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
}

const ActivityCardLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <View
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <LineLoader style={{ width: 117, height: 20 }} />
        <LineLoader style={{ width: 38, height: 20 }} />
      </View>
      <LineLoader style={{ width: layout.width, height: 50, marginTop: 16 }} />
      <LineLoader style={{ width: layout.width, height: 50, marginTop: 16 }} />
      <LineLoader style={{ width: layout.width, height: 50, marginTop: 16 }} />
    </View>
  )
}
export default ActivityCardLoader
