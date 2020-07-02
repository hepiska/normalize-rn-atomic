import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  hasProfilePicture?: boolean
}

const EditPasswordLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <SafeAreaView
      style={{ alignItems: 'flex-start', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <LineLoader style={{ marginTop: 24, width: 240, height: 14 }} />
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
        </>
      )}
    </SafeAreaView>
  )
}
export default EditPasswordLoader
