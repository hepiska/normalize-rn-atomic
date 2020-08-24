import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  ViewStyle,
} from 'react-native'
import { setImage } from '@src/utils/helpers'
import { colors } from '@src/utils/constants'

const { width } = Dimensions.get('screen')

interface AvatarType {
  size?: number
  imgUrl?: string
  style?: ViewStyle
}
export default class AvatarImage extends Component<AvatarType, any> {
  render() {
    const { size, imgUrl, style } = this.props
    return (
      <View
        style={{
          ...style,
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
        }}>
        <ImageBackground
          style={{ width: size, height: size }}
          resizeMode="cover"
          source={
            imgUrl
              ? { uri: imgUrl, width: size * 2 }
              : require('@src/assets/placeholder/placeholder2.jpg')
          }
        />
      </View>
    )
  }
}
