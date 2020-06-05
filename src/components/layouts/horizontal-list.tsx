import React from 'react'
import {
  View,
  Text,
  // FlatList,
  FlatListProperties,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import HorizontalListLoader from '@components/atoms/loaders/horizontal-list'
import { FlatList } from 'react-native-gesture-handler'
import Line from '@components/atoms/line'
interface HorizontalListProps {
  flatlistprops?: any
  style?: ViewStyle
  title?: string
  data: any
  loading?: boolean
  key?: string
  renderItem: ({ item, index }) => React.ReactElement
}

const styles = StyleSheet.create({
  title: {
    ...fontStyle.playfairBold,
    fontSize: 22,
    color: colors.black100,
  },
  line: {
    marginVertical: 16,
  },
})

class HorizontalListLayout extends React.Component<HorizontalListProps, any> {
  _renderItem = ({ item, index }) => {
    return this.props.renderItem({ item, index })
  }

  _keyExtractor = (item: any) => `${this.props.key}-${item.id || item}`

  render() {
    const { data, key, flatlistprops, style, title, loading } = this.props
    return (
      <View key={key} style={style} importantForAccessibility="yes">
        {title && (
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.title}>{title}</Text>
            <Line style={styles.line} />
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
