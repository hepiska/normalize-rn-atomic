import React, { useState, useEffect } from 'react'
import { Image, ViewStyle } from 'react-native'

interface ImageType {
  uri: any
}

interface ImageAutoSchaleType {
  source: any
  onError?: any
  width?: number | string
  height?: number
  style?: ViewStyle
}

let imageSize: any = null

class ImageAutoSchale extends React.Component<ImageAutoSchaleType, any> {
  state: any = {}
  mounted = true
  componentDidMount() {
    const { source, onError } = this.props
    if (source.uri) {
      imageSize = Image.getSize(
        source.uri,
        (newWidth, newHeight) => {
          if (!this.mounted) {
            return
          }
          this.calculateSize(newWidth, newHeight)
        },
        err => {
          if (onError) {
            onError(err)
          }
        },
      )
    } else {
      const { width: newWidth, height: newHeight } = Image.resolveAssetSource(
        source,
      )
      this.calculateSize(newWidth, newHeight)
    }
    return () => {
      imageSize = null
    }
  }

  calculateSize = (newWidth, newHeight) => {
    const { width, height } = this.props
    if (width && height) {
      return this.setState({ size: { width, height } })
    }
    if (!width && !height) {
      return this.setState({ size: { width: newWidth, height: newHeight } })
    }
    if (!height) {
      const height = Number(newHeight)
        ? Math.floor(width * (newHeight / newWidth))
        : width
      return this.setState({
        size: {
          width,
          height,
        },
      })
    }
    if (!width) {
      return this.setState({
        size: { width: height * (newWidth / newHeight), height },
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { source, style } = this.props
    const { size } = this.state

    return this.state.size ? (
      <Image source={source} style={{ ...size, ...style }} />
    ) : null
  }
}

export default ImageAutoSchale
