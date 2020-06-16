import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const ArticleLoader = (props: LoaderPropsType) => {
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
            <Rect x="0" y="0" rx="8" ry="8" width={180} height={30} />
            <Rect x="0" y="40" rx="8" ry="8" width={layout.width} height={10} />
            <Rect x="0" y="60" rx="8" ry="8" width={layout.width} height={10} />
            <Rect x="0" y="80" rx="8" ry="8" width={layout.width} height={10} />
            <Rect
              x="0"
              y="100"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="120"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="140"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="160"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="180"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="200"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="220"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="240"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="260"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="280"
              rx="8"
              ry="8"
              width={layout.width}
              height={10}
            />
            <Rect
              x="0"
              y="300"
              rx="8"
              ry="8"
              width={layout.width / 2}
              height={10}
            />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default ArticleLoader
