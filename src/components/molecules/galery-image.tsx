import React from 'react'
import styled from 'styled-components/native'
import { Dimensions, TouchableOpacity, ViewStyle } from 'react-native'

const { width } = Dimensions.get('screen')

const Avatar = styled.Image`
  width: ${width / 3}px;
  height: ${width / 3}px;
`
interface GaleryType {
  image: any
  isSelected?: boolean
  onPress: any
  timestamp?: any
  location?: any
  style?: ViewStyle
}

class GaleryImageItem extends React.PureComponent<GaleryType> {
  onPress = () => {
    this.props.onPress({
      timestamp: this.props.timestamp,
      location: this.props.location,
      image: this.props.image,
    })
  }

  render() {
    const { image, style } = this.props

    return (
      <TouchableOpacity onPress={this.onPress} style={{ ...style }}>
        <Avatar source={image} />
      </TouchableOpacity>
    )
  }
}

export default GaleryImageItem
