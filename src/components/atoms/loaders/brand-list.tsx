import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import BrandItem from './brand-item'

interface LoaderPropsType {
  style?: ViewStyle
}

const BrandList = (props: LoaderPropsType) => {
  return (
    <View style={props.style}>
      <BrandItem />
      <BrandItem />
      <BrandItem />
      <BrandItem />
      <BrandItem />
      <BrandItem />
      <BrandItem />
    </View>
  )
}
export default BrandList
