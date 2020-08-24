import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { colors } from '@src/utils/constants'

const TagsPill = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('tags : ', item.title)
      }}
      style={{
        padding: 8,
        backgroundColor: colors.black10,
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 8,
      }}>
      <Text style={{ color: colors.black70 }}>{item.title.toLowerCase()}</Text>
    </TouchableOpacity>
  )
}

interface TagsPillType {
  data?: ReadonlyArray<any> | null
}

export default class Tags extends Component<TagsPillType, any> {
  render() {
    const { data } = this.props
    if (data.length != 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            flexWrap: 'wrap',
          }}>
          {data.map((item, idx) => {
            return <TagsPill item={item} />
          })}
        </View>
      )
    }
    return (
      <Text style={{ paddingVertical: 8, color: colors.black60 }}>No Tags</Text>
    )
  }
}
