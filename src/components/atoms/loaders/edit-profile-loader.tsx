import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import CircleLoader from './circle-loader'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  hasProfilePicture?: boolean
}

const EditProfileLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <SafeAreaView
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <View style={{ width: layout.width }}>
            <CircleLoader r={45} />
          </View>
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
          <LineLoader
            style={{ marginTop: 31, width: layout.width, height: 46 }}
          />
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
export default EditProfileLoader
