import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const CheckoutLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 150`}
            height={150}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={180} height={20} />
            <Rect x="0" y="38" rx="8" ry="8" width={180} height={20} />
            <Rect
              x="0"
              y="64"
              rx="8"
              ry="8"
              width={layout.width * 0.8}
              height={14}
            />
            <Rect
              x="0"
              y="86"
              rx="8"
              ry="8"
              width={layout.width * 0.8}
              height={14}
            />
            <Rect x="0" y="112" rx="8" ry="8" width={180} height={14} />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 250`}
            height={250}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={120} height={150} />
            <Rect x="140" y="0" rx="8" ry="8" width={180} height={20} />
            <Rect x="140" y="40" rx="8" ry="8" width={180} height={10} />
            <Rect x="140" y="60" rx="8" ry="8" width={180} height={10} />
            <Rect x="140" y="100" rx="8" ry="8" width={100} height={10} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default CheckoutLoader
