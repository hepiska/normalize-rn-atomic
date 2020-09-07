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
  darkMode?: boolean
}

class PostHorizontalList extends React.PureComponent<PostHorizontalListType> {
  _separator = () => {
    return <View style={{ width: 16 }} />
  }

  onPress = () => {}

  render() {
    const { data, style, renderItem, title, darkMode } = this.props
    return (
      <View
        style={{
          ...style,
          ...{
            marginBottom: 40,
            backgroundColor: darkMode ? colors.black100 : colors.white,
          },
        }}>
        {title && (
          <Text
            style={{
              ...fontStyle.playfairBold,
              fontSize: 24,
              paddingTop: 20,
              paddingBottom: 20,
              color: darkMode ? colors.white : colors.black100,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        )}
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
              color: darkMode ? colors.white : colors.black100,
              borderBottomColor: darkMode ? colors.white : colors.black60,
              textAlign: 'center',
              marginBottom: darkMode ? 20 : 0,
            }}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PostHorizontalList
