import React from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'

interface PostHorizontalListType {
  data: any
  onPressAll?: (post: any) => void
  style?: any
  renderItem: any
  title?: string
}

class PostHorizontalList extends React.PureComponent<PostHorizontalListType> {
  _separator = () => {
    return <View style={{ width: 16 }} />
  }

  onPress = () => {}

  render() {
    const { data, style, renderItem, title } = this.props
    return (
      <View style={style}>
        <FlatList
          data={data}
          ItemSeparatorComponent={this._separator}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 30 }}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: colors.black80,
              fontSize: 16,
              ...fontStyle.helveticaThin,
              color: colors.black100,
              textAlign: 'center',
              marginBottom: 40,
            }}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PostHorizontalList
