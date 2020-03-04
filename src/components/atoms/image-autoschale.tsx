import React, { useState, useEffect } from 'react'
import { Image, ViewStyle } from 'react-native'

interface ImageType {
  uri: any
}

interface ImageAutoSchaleType {
  source: any
  width?: number
  height?: number
  style?: ViewStyle
}

const ImageAutoSchale = ({
  source,
  width,
  height,
  style,
}: ImageAutoSchaleType) => {
  let [size, setSize] = useState(null)

  const calculateSize = (newWidth, newHeight) => {
    if (width && height) {
      return setSize({ width, height })
    }
    if (!width && !height) {
      return setSize({ width: newWidth, height: newHeight })
    }
    if (!height) {
      return setSize({ width, height: width * (newHeight / newWidth) })
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
        () => {},
      )
    } else {
      const { width: newWidth, height: newHeight } = Image.resolveAssetSource(
        source,
      )
      calculateSize(newWidth, newHeight)
    }
    return () => {}
  }, [width])
  return size ? <Image source={source} style={{ ...size, ...style }} /> : null
}

export default ImageAutoSchale