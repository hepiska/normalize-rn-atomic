import React, { useState, useEffect } from 'react'
import { Image, ViewStyle, View, StyleSheet, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import isEqual from 'lodash/isEqual'

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4e8',
  },
})

interface ImageType {
  uri: any
}

interface ImageAutoSchaleType {
  source: any
  onError?: any
  showErrorIcon?: boolean
  thumbnailSource?: any
  errorStyle?: ViewStyle
  containerStyle?: ViewStyle
  width?: number | string
  height?: number
  style?: ViewStyle
}

let imageSize: any = null

class ImageAutoSchale extends React.Component<ImageAutoSchaleType, any> {
  state: any = {
    isError: false,
    isLoading: false,
  }
  mounted = true
  componentDidMount() {
    const { source, onError } = this.props
    const { width, height } = this.props

    if (width && height) {
      this.calculateSize(width, height)
      return
    }

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
          this.handleError()
        },
      )
    } else if (source) {
      const { width: newWidth, height: newHeight } = Image.resolveAssetSource(
        source,
      )
      this.calculateSize(newWidth, newHeight)
    } else {
      this.handleError()
    }
    return () => {
      imageSize = null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isError !== nextState.isError) {
      return true
    }
    if (this.state.isLoading !== nextState.isLoading) {
      return true
    }

    if (!isEqual(this.state.size, nextState.size)) {
      return true
    }
    return false
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
  thumbnailAnimated = new Animated.Value(1)

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 0,
    }).start()
  }
  onImageLoad = () => {
    this.setState({ imageLoaded: true, isLoading: false })
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start()
  }
  handleError = () => {
    if (this.props.onError) {
      this.props.onError
    }
    this.setState({ isError: true, imageLoaded: true })
  }
  _loadStart = () => {
    this.setState({ isLoading: true })
  }

  render() {
    const {
      source,
      errorStyle,
      style,
      width,
      showErrorIcon = true,
      thumbnailSource,
      containerStyle,
      height,
      onError,
      ...props
    } = this.props
    const { size, imageLoaded } = this.state
    const imageStyles = thumbnailSource
      ? [styles.imageOverlay, style as any, { opacity: this.imageAnimated }]
      : { ...size, ...style }

    let aplliedContainerStyle = imageLoaded
      ? { ...styles.container, ...style }
      : { ...styles.container, ...style, ...containerStyle }

    if (this.state.isError && imageLoaded) {
      aplliedContainerStyle = {
        ...style,
        ...styles.container,
        ...errorStyle,
      }
    }

    return (
      <View style={aplliedContainerStyle}>
        {!this.state.isError && thumbnailSource && (
          <Animated.Image
            onLoadEnd={this.handleThumbnailLoad}
            onError={this.handleError}
            source={thumbnailSource}
            blurRadius={2}
            style={[{ ...size, ...style }, { opacity: this.thumbnailAnimated }]}
            {...props}
          />
        )}
        {this.state.isError && showErrorIcon ? (
          <Icon name="image" size={48} color={colors.black60} />
        ) : (
          <Animated.Image
            source={source}
            style={[imageStyles, { opacity: this.imageAnimated }]}
            onError={this.handleError}
            onLoad={this._loadStart}
            onLoadEnd={this.onImageLoad}
            {...props}
          />
        )}
      </View>
    )
  }
}

export default ImageAutoSchale
