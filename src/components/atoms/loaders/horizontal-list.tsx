import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import ContentLoader, { Facebook } from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

const { width } = Dimensions.get('screen')

const HorizontalListLoader = (props: any) => {
  return (
    <ContentLoader
      {...shimmerLoader}
      viewBox="0 0 380 220"
      height={220}
      width={width}>
      <Rect x="16" y="0" rx="8" ry="8" width="148" height="220" />
      <Rect x="146" y="0" rx="8" ry="8" width="148" height="220" />
      <Rect x="312" y="0" rx="8" ry="8" width="148" height="220" />
    </ContentLoader>
  )
}
export default HorizontalListLoader
