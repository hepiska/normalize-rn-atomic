import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import { shimmerLoader } from '@utils/constants'

import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const PostCardLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  const width = layout?.width / 2 - 8 || 0
  const height = 1.5 * width
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
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x={0} width={width} height={height} y="0" rx="8" ry="8" />
            <Rect
              x="0"
              width={width}
              height={24}
              y={height + 8}
              rx="8"
              ry="8"
            />
            <Rect
              x="0"
              width={width * 0.7}
              height={24}
              y={height + 40}
              rx="8"
              ry="8"
            />
            <Circle r="12" cx="12" cy={height + 84} />
            <Circle r="12" cx="44" cy={height + 84} />
            <Circle r="12" cx="76" cy={height + 84} />
            <Rect
              x="0"
              width={width * 0.7}
              height={24}
              y={height + 108}
              rx="8"
              ry="8"
            />
            {/* right */}
            <Rect
              x={width + 16}
              width={width}
              height={height}
              y="0"
              rx="8"
              ry="8"
            />
            <Rect
              x={width + 16}
              width={width}
              height={24}
              y={height + 8}
              rx="8"
              ry="8"
            />
            <Rect
              x={width + 16}
              width={width * 0.7}
              height={24}
              y={height + 40}
              rx="8"
              ry="8"
            />
            <Circle r="12" cx={width + 16 + 12} cy={height + 84} />
            <Circle r="12" cx={width + 16 + 44} cy={height + 84} />
            <Circle r="12" cx={width + 16 + 76} cy={height + 84} />
            <Rect
              x={width + 16}
              width={width * 0.7}
              height={24}
              y={height + 108}
              rx="8"
              ry="8"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default PostCardLoader
