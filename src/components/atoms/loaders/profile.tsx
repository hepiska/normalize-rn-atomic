import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProfileLoader = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 560`}
            height={560}
            width={layout.width}>
            <Circle x="40" y="40" r="40" />

            <Rect x="96" y="8" rx="8" ry="8" width={240} height={`30`} />
            <Rect x="96" y="48" rx="8" ry="8" width={180} height={`24`} />
            <Rect
              x="0"
              y="128"
              rx="8"
              ry="8"
              width={layout.width}
              height={`20`}
            />
            <Rect
              x="0"
              y="160"
              rx="8"
              ry="8"
              width={layout.width}
              height={`20`}
            />
            <Rect x="0" y="196" rx="8" ry="8" width={132} height={`48`} />
            <Rect x="150" y="196" rx="8" ry="8" width={132} height={`48`} />
            <Rect
              x="0"
              y="260"
              rx="8"
              ry="8"
              width={layout.width}
              height={`140`}
            />
          </ContentLoader>
          {/* <ContentLoader
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 48`}
            height={48}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={layout.width} height={48} />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 16 }}
            viewBox={`0 0 ${layout.width} 220`}
            height={220}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height={220}
            />
            <Rect
              x={`${layout.width / 2}`}
              y="0"
              rx="8"
              ry="8"
              width={layout.width / 2 - 16}
              height={220}
            />
          </ContentLoader> */}
        </>
      )}
    </SafeAreaView>
  )
}
export default ProfileLoader
