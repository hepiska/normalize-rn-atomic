import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  hasProfilePicture?: boolean
}

const AddAddressForm = (props: LoaderPropsType) => {
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
          <LineLoader style={{ marginTop: 24, width: 220, height: 24 }} />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />

          <LineLoader style={{ marginTop: 48, width: 220, height: 24 }} />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
          <LineLoader
            style={{ marginTop: 28, width: layout.width, height: 48 }}
          />
        </>
      )}
    </SafeAreaView>
  )
}
export default AddAddressForm
