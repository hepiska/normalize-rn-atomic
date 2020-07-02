import React, { useState } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import CircleLoader from './cirle-loader'
import LineLoader from './line'
import FullImageLoader from './full-size-image'
import { Rect, Circle } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
}

const numberOFLoader = [0, 1]

const PostCardFullLoader = (props: LoaderPropsType) => {
  return (
    <View
      style={{
        ...props.style,
      }}>
      {numberOFLoader.map(num => (
        <View key={num} style={{ marginBottom: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              alignItems: 'center',
              marginVertical: 8,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CircleLoader r={14} />
              <LineLoader style={{ width: 89, height: 16, marginLeft: 8 }} />
            </View>
            <LineLoader style={{ width: 46, height: 16, marginLeft: 8 }} />
          </View>
          <FullImageLoader style={{ height: 235 }} />
          <LineLoader
            style={{ marginHorizontal: 16, height: 32, marginTop: 16 }}
          />
          <LineLoader
            style={{
              marginHorizontal: 16,
              width: 156,
              height: 32,
              marginTop: 16,
            }}
          />
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <CircleLoader r={14} />
              <CircleLoader r={14} style={{ marginLeft: 16 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CircleLoader r={14} />
              <CircleLoader r={14} style={{ marginLeft: 16 }} />
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
export default PostCardFullLoader
