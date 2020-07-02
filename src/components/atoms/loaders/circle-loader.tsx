import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { shimmerLoader } from '@utils/constants'

import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
  r: number
}

const CircleLoader = (props: LoaderPropsType) => {
  return (
    <ContentLoader
      style={props.style}
      {...shimmerLoader}
      viewBox={`0 0 ${props.r * 2} ${props.r * 2}`}
      height={props.r * 2}
      width={props.r * 2}>
      <Circle cx={props.r} cy={props.r} r={props.r} />
    </ContentLoader>
  )
}
export default CircleLoader
