import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LikeListPropsType {
  style?: ViewStyle
}

const LikeListLoader = (props: LikeListPropsType) => {
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
            viewBox={`0 0 ${layout.width} 50`}
            height={50}
            width={layout.width}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={layout.width - 16}
              height="40"
            />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default LikeListLoader
