import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

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
    <SafeAreaView
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <ContentLoader
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x="90" y="0" rx="8" ry="8" width={180} height={30} />
            <Rect x="90" y="40" rx="8" ry="8" width={180} height={10} />
            <Rect x="90" y="70" rx="8" ry="8" width={180} height={30} />
            <Rect x="90" y="110" rx="8" ry="8" width={180} height={10} />
            <Rect x="90" y="140" rx="8" ry="8" width={180} height={30} />
            <Rect x="90" y="180" rx="8" ry="8" width={180} height={10} />

            <Rect x="0" y="0" rx="8" ry="8" width={70} height={50} />
            <Rect x="0" y="70" rx="8" ry="8" width={70} height={50} />
            <Rect x="0" y="140" rx="8" ry="8" width={70} height={50} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
