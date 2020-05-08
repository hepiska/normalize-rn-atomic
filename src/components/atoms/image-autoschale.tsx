import React, { useState, useEffect } from 'react'
import { Image, ViewStyle, View, StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
})

interface ImageType {
  uri: any
}

interface ImageAutoSchaleType {
  source: any
  onError?: any
  thumbnailSource?: any
  containerStyle?: ViewStyle
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
        ? Math.floor((width as number) * (newHeight / newWidth))
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

  imageAnimated = new Animated.Value(0)
  thumbnailAnimated = new Animated.Value(0)

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start()
  }
  onImageLoad = () => {
    this.setState({ imageLoaded: true })
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start()
  }

  render() {
    const {
      source,
      style,
      width,
      thumbnailSource,
      containerStyle,
      height,
      ...props
    } = this.props
    const { size, imageLoaded } = this.state
    const imageStyles = thumbnailSource
      ? [styles.imageOverlay, style as any, { opacity: this.imageAnimated }]
      : { ...size, ...style }

    const aplliedContainerStyle = imageLoaded
      ? { ...style, ...containerStyle }
      : { ...styles.container, ...style, ...containerStyle }
    return (
      <View style={aplliedContainerStyle}>
        {thumbnailSource && (
          <Animated.Image
            onLoad={this.handleThumbnailLoad}
            source={thumbnailSource}
            blurRadius={2}
            style={[{ ...size, ...style }, { opacity: this.thumbnailAnimated }]}
            {...props}
          />
        )}
        <Animated.Image
          source={source}
          style={imageStyles}
          onLoad={this.onImageLoad}
          {...props}
        />
      </View>
    )
  }
}

export default ImageAutoSchale
