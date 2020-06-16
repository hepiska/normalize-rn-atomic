import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

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
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 200`}
            height={200}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={200} height={30} />
            <Rect x="0" y="50" rx="8" ry="8" width={140} height={20} />
            <Rect
              x={layout.width - 100}
              y="50"
              rx="8"
              ry="8"
              width={100}
              height={20}
            />
            <Circle x={50} y="110" r="20" />
            <Circle x={layout.width / 2 - 50} y="110" r="20" />
            <Circle x={layout.width / 2 + 50} y="110" r="20" />
            <Circle x={layout.width - 50} y="110" r="20" />

            <Rect x={25} y="140" rx="8" ry="8" width={50} height={10} />
            <Rect
              x={layout.width / 2 - 75}
              y="140"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
            <Rect
              x={layout.width / 2 + 25}
              y="140"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
            <Rect
              x={layout.width - 75}
              y="140"
              rx="8"
              ry="8"
              width={50}
              height={10}
            />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Circle x={20} y="20" r="20" />
            <Rect x="60" y="0" rx="8" ry="8" width={180} height={20} />
            <Rect x="60" y="30" rx="8" ry="8" width={140} height={10} />

            {/* <Rect x="0" y="55" rx="0" ry="0" width={layout.width} height={2} /> */}

            <Circle x={20} y="100" r="20" />
            <Rect x="60" y="80" rx="8" ry="8" width={180} height={20} />
            <Rect x="60" y="110" rx="8" ry="8" width={140} height={10} />

            {/* <Rect x="0" y="135" rx="0" ry="0" width={layout.width} height={2} /> */}

            <Circle x={20} y="180" r="20" />
            <Rect x="60" y="160" rx="8" ry="8" width={180} height={20} />
            <Rect x="60" y="190" rx="8" ry="8" width={140} height={10} />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
