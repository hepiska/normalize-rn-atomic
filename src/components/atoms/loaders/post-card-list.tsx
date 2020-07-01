import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const PostCardListLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View
      onLayout={_setLayout}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}>
      {layout && (
        <>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 316`}
            height={316}
            width={layout.width}>
            <Circle cx="16" r="16" cy="16" />
            <Rect x={40} width={84} height="24" y="4" rx="8" ry="8" />

            <Rect
              x="0"
              y="40"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="180"
            />
            <Rect
              x="0"
              y="226"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Rect
              x="0"
              y="250"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Circle r="10" cx="10" cy="284" />
            <Circle r="10" cx={layout.width / 2 - 18} cy="284" />

            {/* right */}
            <Circle x={layout.width / 2 + 22} r="16" cy="16" />
            <Rect
              x={layout.width / 2 + 28 + 22}
              width={84}
              height="24"
              y="4"
              rx="8"
              ry="8"
            />

            <Rect
              x={layout.width / 2 + 8}
              y="40"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="180"
            />
            <Rect
              x={layout.width / 2 + 8}
              y="226"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Rect
              x={layout.width / 2 + 8}
              y="250"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Circle r="10" cx={layout.width / 2 + 8 + 10} cy="284" />
            <Circle r="10" cx={layout.width - 18} cy="284" />
          </ContentLoader>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 316`}
            height={316}
            width={layout.width}>
            <Circle cx="16" r="16" cy="16" />
            <Rect x={40} width={84} height="24" y="4" rx="8" ry="8" />

            <Rect
              x="0"
              y="40"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="180"
            />
            <Rect
              x="0"
              y="226"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Rect
              x="0"
              y="250"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Circle r="10" cx="10" cy="284" />
            <Circle r="10" cx={layout.width / 2 - 18} cy="284" />

            {/* right */}
            <Circle x={layout.width / 2 + 24} r="16" cy="16" />
            <Rect
              x={layout.width / 2 + 28 + 22}
              width={84}
              height="24"
              y="4"
              rx="8"
              ry="8"
            />

            <Rect
              x={layout.width / 2 + 8}
              y="40"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="180"
            />
            <Rect
              x={layout.width / 2 + 8}
              y="226"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Rect
              x={layout.width / 2 + 8}
              y="250"
              rx="8"
              ry="8"
              width={layout.width / 2 - 8}
              height="18"
            />
            <Circle r="10" cx={layout.width / 2 + 8 + 10} cy="284" />
            <Circle r="10" cx={layout.width - 18} cy="284" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default PostCardListLoader
