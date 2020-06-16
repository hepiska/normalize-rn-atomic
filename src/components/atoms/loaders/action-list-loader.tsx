import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

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
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="40" rx="8" ry="8" width={260} height={10} />
            <Rect x="0" y="70" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="110" rx="8" ry="8" width={260} height={10} />
            <Rect x="0" y="140" rx="8" ry="8" width={260} height={30} />
            <Rect x="0" y="180" rx="8" ry="8" width={260} height={10} />

            <Circle x={layout.width - 30} y={25} r={20} />
            <Circle x={layout.width - 30} y={95} r={20} />
            <Circle x={layout.width - 30} y={170} r={20} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
