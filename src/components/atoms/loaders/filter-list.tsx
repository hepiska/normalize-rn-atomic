import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const FilterList = (props: LoaderPropsType) => {
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
            viewBox={`0 0 ${layout.width} 100`}
            height={100}
            width={layout.width}>
            <Rect x={0} width={186} height="32" y="0" rx="8" ry="8" />
            <Circle r={16} cx={layout.width - 20} cy="16" />
            <Rect x={0} width={186} height="32" y="48" rx="8" ry="8" />
            <Circle r={16} cx={layout.width - 20} cy="64" />
          </ContentLoader>
        </>
      )}
    </View>
  )
}
export default FilterList
