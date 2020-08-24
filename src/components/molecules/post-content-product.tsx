import React, { memo, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { request } from '@utils/services'

const PostContentProduct = (props: any) => {
  const [product, setproduct] = useState(null)
  const [err, serErr] = useState(null)

  useEffect(() => {
    request({
      url: '/products/' + props.slug,
      params: { id_type: 'slug' },
    })
      .then(res => {
        console.log('data', res.data.data)
        setproduct(res.data.data)
      })
      .catch(err => {
        serErr(err)
      })
  }, [])

  if (err) {
    return null
  }

  console.log('====product', product)

  return (
    <View>
      <Text>sasas</Text>
    </View>
  )
}

export default memo(PostContentProduct)
