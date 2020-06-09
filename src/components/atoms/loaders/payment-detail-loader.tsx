import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const PaymentDetailLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 220`}
            height={220}
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

            <Rect x="0" y="40" rx="8" ry="8" width={layout.width} height={40} />

            <Rect
              x="0"
              y="100"
              rx="8"
              ry="8"
              width={layout.width}
              height={100}
            />
          </ContentLoader>

          <ContentLoader
            viewBox={`0 0 ${layout.width} 250`}
            height={250}
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

            <Rect x="0" y="40" rx="8" ry="8" width={layout.width} height={20} />
            <Rect x="0" y="70" rx="8" ry="8" width={layout.width} height={20} />

            <Rect
              x="0"
              y="100"
              rx="8"
              ry="8"
              width={layout.width}
              height={20}
            />
            <Rect
              x="0"
              y="130"
              rx="8"
              ry="8"
              width={layout.width}
              height={20}
            />
            <Rect
              x="0"
              y="160"
              rx="8"
              ry="8"
              width={layout.width}
              height={20}
            />
            <Rect x="0" y="190" rx="8" ry="8" width={240} height={20} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default PaymentDetailLoader
