import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import FollowItem from './follow-item'

interface LoaderPropsType {
  style?: ViewStyle
}

const FollowList = (props: LoaderPropsType) => {
  return (
    <View style={props.style}>
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
    </View>
  )
}
export default FollowList
