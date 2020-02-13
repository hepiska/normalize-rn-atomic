
import React, { useState, useEffect, } from 'react';
import { Image, FlatList } from 'react-native'
import { Div, Font } from '@components/atoms/basic'


interface ImageType {
  uri: string
}

interface ImageAutoSchaleType {
  source: ImageType,
  width?: number,
  height?: number
}


const ImageAutoSchale = ({ source, width, height }: ImageAutoSchaleType) => {
  let [size, setSize] = useState(null)
  useEffect(() => {
    Image.getSize(source.uri, (newWidth, newHeight) => {
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
    }, () => { })

  }, [])
  return size ? <Image source={source} style={{ ...size }} /> : null
}


export default ImageAutoSchale