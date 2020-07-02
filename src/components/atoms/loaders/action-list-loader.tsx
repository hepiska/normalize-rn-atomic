import React, { useState } from 'react'
import { ViewStyle, View } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
  hasLeftIcon?: boolean
}

const ActionListLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  const rectX = props.hasLeftIcon ? 46 : 0

  return (
    <View
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <ContentLoader
          {...shimmerLoader}
          viewBox={`0 0 ${layout.width} 400`}
          height={400}
          width={layout.width}>
          {props.hasLeftIcon && (
            <>
              <Circle x={10} y={25} r={10} />
              <Circle x={10} y={95} r={10} />
              <Circle x={10} y={170} r={10} />
            </>
          )}

          <Rect x={rectX} y="0" rx="8" ry="8" width={180} height={30} />
          <Rect x={rectX} y="40" rx="8" ry="8" width={180} height={10} />
          <Rect x={rectX} y="70" rx="8" ry="8" width={180} height={30} />
          <Rect x={rectX} y="110" rx="8" ry="8" width={180} height={10} />
          <Rect x={rectX} y="140" rx="8" ry="8" width={180} height={30} />
          <Rect x={rectX} y="180" rx="8" ry="8" width={180} height={10} />

          <Circle x={layout.width - 20} y={25} r={20} />
          <Circle x={layout.width - 20} y={95} r={20} />
          <Circle x={layout.width - 20} y={170} r={20} />
        </ContentLoader>
      )}
    </View>
  )
}
export default ActionListLoader
