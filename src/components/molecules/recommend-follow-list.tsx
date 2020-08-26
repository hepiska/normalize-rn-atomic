import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FollowCard from '@src/components/molecules/recommend-follow-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { userListData } from '@src/hocs/data/user'

interface RecommendUserListType {
  data?: number[]
}

const Card = userListData(FollowCard)

const _renderItem = ({ item }) => {
  return (
    <Card
      horizontal
      style={{ backgroundColor: colors.black10 }}
      userId={item}
    />
  )
}
const _separator = () => {
  return <View style={{ width: 16 }} />
}
export default class RecommendList extends Component<
  RecommendUserListType,
  any
> {
  render() {
    // const data = [{ title: '1' }, { title: '2' }, { title: '3' }]
    const { data } = this.props
    return (
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 32,
            ...fontStyle.playfair,
            fontWeight: '600',
            fontSize: 24,
          }}>
          {' '}
          Recommended to Follow{' '}
        </Text>
        <FlatList
          data={data}
          ItemSeparatorComponent={_separator}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={_renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 32 }}
        />
        <TouchableOpacity>
          <Text
            style={{ textDecorationLine: 'underline', color: colors.black80 }}>
            See All Profile
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
