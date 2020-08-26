import React, { Component, useEffect, useState } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import RelatedPostCard from '@src/components/molecules/related-post-card'
import { useDispatch } from 'react-redux'
import { relatedPosts } from '@modules/post/action'
import { fontStyle } from '../commont-styles'
import { dispatch } from '@src/root-navigation'
import { postListData } from '@hocs/data/post'
import { post } from '@src/modules/normalize-schema'

const EnhancePost = postListData(RelatedPostCard)

interface RelatedTyoe {
  data?: ReadonlyArray<any>
  style?: ViewStyle
}

const RelatedPost = ({ postId, style }) => {
  const [data, setData] = useState({}) as any
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      relatedPosts(postId, data => {
        setData(data)
      }),
    )
  }, [])

  const posts = data?.data?.result || []
  if (!posts.length) {
    return null
  }
  return (
    <View style={{ ...style }}>
      <Text
        style={{ ...fontStyle.playfairBold, fontSize: 24, marginBottom: 24 }}>
        Related Posts
      </Text>
      {posts.map((item, x) => {
        return <EnhancePost key={'related-post' + item} postId={item} />
      })}
    </View>
  )
}

export default RelatedPost
