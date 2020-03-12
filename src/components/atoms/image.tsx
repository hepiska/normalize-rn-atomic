import React, { useState, useEffect, useCallback } from 'react'
import { Image } from '@components/atoms/basic'
import { images } from '@utils/constants'

const Img = ({ source, ...props }) => {
  const [img, setImg] = useState(null)

  const errorHandler = useCallback(() => {
    setImg(images.product)
  }, [img])

  useEffect(() => {
    setImg(source)
  }, [source])

  return <Image source={img} {...props} onError={errorHandler} />
}

export default Img
