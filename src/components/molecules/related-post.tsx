import React, { Component } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import RelatedPostCard from '@src/components/molecules/related-post-card'
import { fontStyle } from '../commont-styles'

interface RelatedTyoe {
  data?: ReadonlyArray<any>
  style?: ViewStyle
}
export default class RelatedPost extends Component<RelatedTyoe, any> {
  render() {
    const { data, style } = this.props
    return (
      <View style={{ ...style }}>
        <Text
          style={{ ...fontStyle.playfairBold, fontSize: 24, marginBottom: 24 }}>
          {' '}
          Related Posts{' '}
        </Text>
        {data.map((item, x) => {
          return <RelatedPostCard />
        })}
      </View>
    )
  }
}
