import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
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
            <Rect x="0" y="0" rx="8" ry="8" width={200} height={40} />
            <Circle x={50} y="90" r="20" />
            <Circle x={layout.width / 2 - 50} y="90" r="20" />
            <Circle x={layout.width / 2 + 50} y="90" r="20" />
            <Circle x={layout.width - 50} y="90" r="20" />
            <Rect x="0" y="150" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="190" rx="8" ry="8" width={260} height={10} />
            <Rect x="0" y="220" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="260" rx="8" ry="8" width={260} height={10} />
            <Rect x="0" y="300" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="340" rx="8" ry="8" width={260} height={10} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
