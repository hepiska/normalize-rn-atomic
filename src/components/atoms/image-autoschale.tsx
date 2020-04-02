import React, { useState, useEffect } from 'react'
import { Image, ViewStyle } from 'react-native'

interface ImageType {
  uri: any
}

interface ImageAutoSchaleType {
  source: any
  onError?: any
  width?: number
  height?: number
  style?: ViewStyle
}

const ImageAutoSchale = ({
  source,
  onError,
  width,
  height,
  style,
}: ImageAutoSchaleType) => {
  let [size, setSize] = useState(null)
  source = source.uri
    ? source
    : typeof source === 'string'
    ? { uri: source }
    : source

  const calculateSize = (newWidth, newHeight) => {
    if (width && height) {
      return setSize({ width, height })
    }
    if (!width && !height) {
      return setSize({ width: newWidth, height: newHeight })
    }
    if (!height) {
      const height = Number(newHeight)
        ? Math.floor(width * (newHeight / newWidth))
        : width
      return setSize({
        width,
        height,
      })
    }
    if (!width) {
      return setSize({ width: height * (newWidth / newHeight), height })
    }
  }

  useEffect(() => {
    if (source.uri) {
      Image.getSize(
        source.uri,
        (newWidth, newHeight) => {
          calculateSize(newWidth, newHeight)
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
      calculateSize(newWidth, newHeight)
    }
    return () => {}
  }, [width, source])
  return size ? <Image source={source} style={{ ...size, ...style }} /> : null
}

export default ImageAutoSchale
