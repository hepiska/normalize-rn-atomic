import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const PaymentWaitingLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 200`}
            height={200}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={160} height={20} />
            <Rect
              x={layout.width - 80}
              y="0"
              rx="8"
              ry="8"
              width={80}
              height={20}
            />

            <Rect x="0" y="40" rx="8" ry="8" width={160} height={20} />
            <Rect
              x={layout.width - 80}
              y="40"
              rx="8"
              ry="8"
              width={80}
              height={20}
            />
            <Rect x="0" y="70" rx="8" ry="8" width={160} height={20} />
            <Rect
              x={layout.width - 80}
              y="70"
              rx="8"
              ry="8"
              width={80}
              height={20}
            />
            <Rect x="0" y="100" rx="8" ry="8" width={160} height={20} />
            <Rect
              x={layout.width - 80}
              y="100"
              rx="8"
              ry="8"
              width={80}
              height={20}
            />
            <Rect x="0" y="130" rx="8" ry="8" width={160} height={20} />
            <Rect
              x={layout.width - 80}
              y="130"
              rx="8"
              ry="8"
              width={80}
              height={20}
            />
          </ContentLoader>
          <ContentLoader
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={80} height={60} />
            <Rect
              x={layout.width - 80}
              y="0"
              rx="8"
              ry="8"
              width={80}
              height={60}
            />
            <Rect x="0" y="100" rx="8" ry="8" width={240} height={20} />
            <Rect x="0" y="130" rx="8" ry="8" width={180} height={20} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default PaymentWaitingLoader
