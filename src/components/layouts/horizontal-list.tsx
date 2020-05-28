import React from 'react'
import {
  View,
  Text,
  FlatList,
  FlatListProperties,
  ViewStyle,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import HorizontalListLoader from '@components/atoms/loaders/horizontal-list'
interface HorizontalListProps {
  flatlistprops?: any
  style?: ViewStyle
  title?: string
  data: any
  loading?: boolean
  key?: string
  renderItem: ({ item, index }) => React.ReactElement
}

class HorizontalListLayout extends React.Component<HorizontalListProps, any> {
  _renderItem = ({ item, index }) => {
    return this.props.renderItem({ item, index })
  }

  _keyExtractor = (item: any) => `${this.props.key}-${item.id || item}`

  render() {
    const { data, key, flatlistprops, style, title, loading } = this.props
    return (
      <View key={key} style={style}>
        {title && (
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ ...fontStyle.playfairBold, fontSize: 22 }}>
              {title}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: colors.black50,
                marginVertical: 16,
              }}
            />
          </View>
        )}

        {loading ? (
          <HorizontalListLoader />
        ) : (
          <FlatList
            key={key}
            {...flatlistprops}
            keyExtractor={this._keyExtractor}
            data={data}
            horizontal
            renderItem={this._renderItem}
          />
        )}
      </View>
    )
  }
}
export default HorizontalListLayout
