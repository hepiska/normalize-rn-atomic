import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import LineLoader from '@components/atoms/loaders/line'
import CourierCardLoader from '@components/atoms/loaders/courier-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const AddressDetailLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...props.style }} onLayout={_setLayout}>
      {layout && (
        <>
          <LineLoader
            style={{ marginTop: 24, height: 45, width: layout.width }}
          />
          <LineLoader style={{ marginTop: 16, height: 24, width: 82 }} />
          <CourierCardLoader style={{ marginTop: 4 }} />
          <CourierCardLoader style={{ marginTop: 16 }} />
          <CourierCardLoader style={{ marginTop: 16 }} />
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
